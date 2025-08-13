import { useGLTF } from '@react-three/drei';
import { useThree, type ObjectMap, type ThreeEvent } from '@react-three/fiber';
import type { message } from 'antd';
import { button, useControls } from 'leva';
import { useContext, useEffect, useRef } from 'react';
import {
	BoxGeometry,
	BufferGeometry,
	CatmullRomCurve3,
	Group,
	Line,
	LineBasicMaterial,
	Mesh,
	MeshBasicMaterial,
	Quaternion,
	Vector3,
} from 'three';
import type { GLTF } from 'three-stdlib';
import * as YUKA from 'yuka';
import { AppContext } from '../../app/contex';
import { createGraphHelper } from '../../utils/GraphHelper';
import MessageApi from '../MessageApi';

type GLTFResult = GLTF & {
	nodes: {
		Plane: Mesh;
	};
};

export default function NavigationMesh() {
	const { nodes } = useGLTF(
		'/assets/models/ros-car/navigation-mesh.glb',
		true
	) as GLTFResult & ObjectMap;

	const messageApi = useRef<typeof message>(null);

	const ref = useRef<YUKA.NavMesh>(null);

	const pointsRef = useRef<Vector3[]>([]);

	const pathHelperRef = useRef<Line>(null);

	const graphHelperRef = useRef<Group>(null);

	const meshLoader = useRef(new YUKA.NavMeshLoader());

	const context = useContext(AppContext);

	const { scene } = useThree();

	const { Navigation_Eable } = useControls('🛣️ Path', {
		Navigation_Visiable: {
			value: false,
			onChange: (val) => {
				if (graphHelperRef.current) {
					graphHelperRef.current.visible = val;
				}
			},
		},
		Navigation_Eable: true,
		Move: button(() => {
			if (!pointsRef.current?.length || !pointsRef.current) {
				messageApi.current?.error('Path Not Find');
				return;
			}
			let progress = 0;

			const car = context.state.current.car?.current;

			const box = new Mesh(
				new BoxGeometry(1, 1, 1),
				new MeshBasicMaterial({
					color: 'red',
					transparent: true,
					opacity: 0,
				})
			);
			scene.add(box);

			const curve = new CatmullRomCurve3(
				pointsRef.current.map((item) => new Vector3(item.x, item.y, item.z)),
				false,
				'centripetal'
			);

			const timer = setInterval(() => {
				const position = curve.getPointAt(progress);
				box.position.copy(position);

				const tangent = curve.getTangentAt(progress).normalize();
				const direction = position.clone().add(tangent);
				box.lookAt(direction);

				const q = new Quaternion().setFromEuler(box.rotation);
				const extraQ = new Quaternion().setFromAxisAngle(
					new Vector3(0, 1, 0),
					-Math.PI / 2
				);

				q.multiply(extraQ);

				progress += 0.003;

				car?.setTranslation(box.position.clone(), true);
				car?.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w }, true);

				if (progress >= 1.0) {
					clearInterval(timer);
					scene.remove(box);
				}
			}, 16);
		}),
	});

	function findPathTo(e: ThreeEvent<Mesh>) {
		if (!Navigation_Eable) return;

		const car = context.state.current.car!.current!;

		const from = new YUKA.Vector3(
			car.translation().x,
			car.translation().y,
			car.translation().z
		);

		const to = new YUKA.Vector3().copy(e.point as any);

		const points = ref.current?.findPath(from, to) as any[];
		pointsRef.current = points;

		pathHelperRef.current!.visible = true;
		pathHelperRef.current!.geometry = new BufferGeometry().setFromPoints(
			points
		);
		pathHelperRef.current!.position.y = 0.25;
	}

	useEffect(() => {
		meshLoader.current
			.load('/assets/models/ros-car/navigation-mesh.glb')
			.then((navigationMesh) => {
				const pathMaterial = new LineBasicMaterial({ color: 0xff0000 });
				const pathHelper = new Line(new BufferGeometry(), pathMaterial);
				pathHelperRef.current = pathHelper;

				scene.add(pathHelper);

				//

				const navMesh = navigationMesh;
				ref.current = navMesh;

				const graph = navMesh.graph;
				const graphHelper = createGraphHelper(graph, 0.2);

				graphHelper.visible = false;
				graphHelperRef.current = graphHelper;

				scene.add(graphHelper);
			});
	}, []);

	return (
		<group dispose={null}>
			<MessageApi ref={messageApi} />
			<mesh
				visible={false}
				position={[0, 0, 0]}
				geometry={nodes.Plane.geometry}
				onPointerDown={findPathTo}
			/>
		</group>
	);
}

useGLTF.preload('/assets/models/ros-car/navigation-mesh.glb');

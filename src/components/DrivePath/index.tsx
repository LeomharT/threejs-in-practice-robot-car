import { useFrame } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import { useControls } from 'leva';
import {
	forwardRef,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
	type JSX,
} from 'react';
import {
	BoxGeometry,
	BufferGeometry,
	CatmullRomCurve3,
	Color,
	Group,
	IcosahedronGeometry,
	Line,
	LineBasicMaterial,
	Mesh,
	MeshBasicMaterial,
	Quaternion,
	Vector3,
} from 'three';
import { AppContext } from '../../app/contex';
import type { DrivePathRef, DriveProps } from './type';

const initialPoints = [
	{ x: 7, y: 0, z: 2 },
	{ x: 6, y: 0, z: 8 },
	{ x: -6, y: 0, z: 8 },
	{ x: -6, y: 0, z: -8 },
	{ x: 6, y: 0, z: -8 },
	{ x: 7, y: 0, z: -1 },
	{ x: 0, y: 0, z: 0 },
	{ x: -2, y: 0, z: -2.5 },
	{ x: -2, y: 0, z: 4 },
];

const DrivePath = forwardRef<DrivePathRef>((props: DriveProps, _ref) => {
	const ref = useRef<JSX.IntrinsicElements['group']>(null);

	const { state } = useContext(AppContext);

	const curve = useRef<CatmullRomCurve3>(null);

	const box = useRef(
		new Mesh(new BoxGeometry(2, 2, 2), new MeshBasicMaterial({ color: 'red' }))
	);

	const [{ visible, progress }, set] = useControls('🛣️ Path', () => ({
		visible: false,
		progress: {
			value: 0,
			step: 0.0001,
			min: 0,
			max: 1,
		},
	}));

	const [begin, setBegin] = useState(false);

	useFrame(() => {
		if (begin !== state.current.begin) setBegin(state.current.begin);
	});

	useImperativeHandle(
		_ref,
		() => ({
			visible,
			curve: curve.current as CatmullRomCurve3,
		}),
		[visible]
	);

	useEffect(() => {
		if (!(ref.current instanceof Group)) return;
		if (!(curve.current instanceof CatmullRomCurve3)) return;

		ref.current.clear();

		const sphereGeometry = new IcosahedronGeometry(0.1, 5);
		const sphereMaterial = new MeshBasicMaterial();

		for (const handlePos of initialPoints) {
			const material = sphereMaterial.clone();
			material.color = new Color().setRGB(
				Math.random(),
				Math.random(),
				Math.random()
			);

			const handle = new Mesh(sphereGeometry, material);
			handle.scale.setScalar(2.0);
			handle.position.copy(handlePos);

			ref.current.add(handle);
		}

		const points = curve.current.getPoints(100) as Vector3[];

		const line = new Line(
			new BufferGeometry().setFromPoints(points),
			new LineBasicMaterial({ color: 0x00ff00 })
		);
		ref.current.add(line);
		ref.current.add(box.current);

		for (const node of ref.current.children) {
			node.visible = visible;
		}
	}, [visible]);

	function moveAlonePath(progress: number) {
		if (
			curve.current instanceof CatmullRomCurve3 &&
			box.current instanceof Mesh &&
			state.current.car?.current instanceof RapierRigidBody
		) {
			if (curve.current.getLength()) {
				const position = curve.current.getPointAt(progress);

				box.current.position.copy(position.clone() as Vector3);

				const tangent = curve.current
					.getTangentAt(progress)
					.normalize() as Vector3;

				const direction = position.clone().add(tangent) as Vector3;
				box.current.lookAt(direction);

				const q = new Quaternion().setFromEuler(box.current.rotation);

				let extraQ = new Quaternion().setFromAxisAngle(
					new Vector3(0, 1, 0),
					-Math.PI / 2
				);

				if (progress > 0.9) {
					extraQ = new Quaternion().setFromAxisAngle(
						new Vector3(0, 1, 0),
						Math.PI / 2
					);
				}

				q.multiply(extraQ);

				state.current.car.current.setTranslation(
					box.current.position.clone(),
					true
				);
				state.current.car.current.setRotation(
					{ x: q.x, y: q.y, z: q.z, w: q.w },
					true
				);
			}
		}
	}

	useEffect(() => {
		moveAlonePath(progress);
	}, [progress]);

	useEffect(() => {
		let progress = 0;
		let animation;

		async function move() {
			if (progress >= 0.17 && !state.current.lift) {
				progress += 0;
			} else {
				if (progress >= 0.9) progress += 0.0005;
				else progress += 0.001;
			}

			set({ progress });

			animation = requestAnimationFrame(move);

			if (progress >= 1.0) {
				cancelAnimationFrame(animation);
			}
		}

		function gogogo(e: KeyboardEvent) {
			if (e.code === 'Enter') {
				if (begin) {
					progress = 0;
					set({ progress });
					move();
				}

				window.removeEventListener('keypress', gogogo);
			}
		}

		window.addEventListener('keypress', gogogo);
	}, [begin, set, state]);

	return (
		<group {...props} ref={ref} dispose={null}>
			<catmullRomCurve3
				ref={curve}
				args={[
					initialPoints.map((v) => new Vector3(v.x, v.y, v.z)),
					false,
					'centripetal',
				]}
			/>
		</group>
	);
});

export default DrivePath;

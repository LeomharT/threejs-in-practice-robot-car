import { useGLTF } from '@react-three/drei';
import type { ObjectMap, ThreeEvent } from '@react-three/fiber';
import { button, useControls } from 'leva';
import { useEffect, useRef, type JSX } from 'react';
import type { Mesh } from 'three';
import type { GLTF } from 'three-stdlib';
import * as YUKA from 'yuka';
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

	const ref = useRef<JSX.IntrinsicElements['mesh']>(null);

	const entityManager = useRef(new YUKA.EntityManager());

	const isMarking = useRef(false);

	useControls('🛣️ Path', {
		Mark: button(() => {
			isMarking.current = !isMarking.current;
		}),
	});

	function handleOnPointerMove(e: ThreeEvent<PointerEvent>) {}

	useEffect(() => {
		if (!ref.current) return;

		console.log(entityManager);
	}, []);

	return (
		<group dispose={null}>
			<mesh
				ref={ref}
				visible={true}
				position={[0, 2.15, 0]}
				geometry={nodes.Plane.geometry}
				onPointerMove={handleOnPointerMove}
			/>
		</group>
	);
}

useGLTF.preload('/assets/models/ros-car/navigation-mesh.glb');

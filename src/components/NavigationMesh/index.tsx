import { useGLTF } from '@react-three/drei';
import type { ObjectMap } from '@react-three/fiber';
import { useEffect, useRef, type JSX } from 'react';
import type { Mesh } from 'three';

import type { GLTF } from 'three-stdlib';

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

	useEffect(() => {
		if (!ref.current) return;
	}, []);

	return (
		<mesh
			ref={ref}
			visible={false}
			position={[0, 0.15, 0]}
			geometry={nodes.Plane.geometry}
		/>
	);
}

useGLTF.preload('/assets/models/ros-car/navigation-mesh.glb');

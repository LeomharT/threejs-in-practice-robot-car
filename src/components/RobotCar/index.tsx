import { useGLTF } from '@react-three/drei';
import type { ObjectMap } from '@react-three/fiber';
import { type JSX } from 'react';
import type { Group, Mesh, Object3D } from 'three';
import type { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
	nodes: {
		Scene: Group;
		前轮1: Mesh;
		前轮2: Mesh;
		后轮1: Mesh;
		后轮2: Mesh;
		外壳: Group;
		外壳_1: Mesh;
		外壳_2: Mesh;
		外壳_3: Mesh;
		外壳_4: Mesh;
		外壳_5: Mesh;
		外壳_6: Mesh;
		外壳_7: Mesh;
		外壳_8: Mesh;
		底座: Group;
		'新大陆时代科技LOGO-02svg': Object3D;
		柱体001: Mesh;
		柱体001_1: Mesh;
		柱体003: Mesh;
		柱体003_1: Mesh;
		部件1: Mesh;
		部件2: Group;
		部件3: Mesh;
		部件4: Mesh;
		部件5: Mesh;
		部件6: Mesh;
	};
	materials: {
		发光: 'MeshPhysicalMaterial';
		塑料: 'MeshStandardMaterial';
		机械臂: 'MeshStandardMaterial';
		材质: 'MeshStandardMaterial';
		灰: 'MeshStandardMaterial';
		红: 'MeshStandardMaterial';
		轮胎: 'MeshStandardMaterial';
		金属灰: 'MeshStandardMaterial';
		金属白: 'MeshStandardMaterial';
		金属黑: 'MeshStandardMaterial';
	};
};

export default function RobotCars(props: JSX.IntrinsicElements['group']) {
	const { scene, nodes, materials } = useGLTF(
		'/src/assets/models/ros-car/robot-car.glb'
	) as GLTFResult & ObjectMap;

	return (
		<group {...props} dispose={null}>
			<primitive object={scene} />
		</group>
	);
}

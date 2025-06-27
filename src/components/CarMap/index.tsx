import { useGLTF } from '@react-three/drei';
import type { ObjectMap } from '@react-three/fiber';
import type { Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from 'three';
import type { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
	nodes: {
		'01': Mesh;
		'02': Mesh;
		'03': Mesh;
		'04': Mesh;
		A: Mesh;
		B: Mesh;
		C: Mesh;
		Circle001: Mesh;
		Circle001001: Mesh;
		Circle001002: Mesh;
		D: Mesh;
		P: Mesh;
		Scene: Mesh;
		p地面: Mesh;
		yellow: Mesh;
		人行道右边: Mesh;
		人行道左边: Mesh;
		信号灯: Mesh;
		减速: Mesh;
		向上: Mesh;
		向下: Mesh;
		外墙30: Mesh;
		大圈: Mesh;
		大圈黄线: Mesh;
		大地面: Mesh;
		建筑001: Mesh;
		建筑002: Mesh;
		建筑003: Mesh;
		杆: Mesh;
		杆_1: Mesh;
		杆_2: Mesh;
		杠: Mesh;
		柱体: Mesh;
		柱体001: Mesh;
		柱体001_1: Mesh;
		柱体001_2: Mesh;
		柱体002: Mesh;
		柱体002_1: Mesh;
		柱体002_2: Mesh;
		柱体_1: Mesh;
		柱体_2: Mesh;
		树苗: Mesh;
		树苗002: Mesh;
		树苗002_1: Mesh;
		玻璃: Mesh;
		玻璃002: Mesh;
		玻璃003: Mesh;
		白线: Mesh;
		红灯: Mesh;
		红灯亮: Mesh;
		红苹果1: Mesh;
		红苹果2: Mesh;
		红苹果3: Mesh;
		绿灯: Mesh;
		绿灯亮: Mesh;
		装饰: Mesh;
		闸: Mesh;
		青苹果1: Mesh;
		青苹果2: Mesh;
		顶001: Mesh;
		黄灯: Mesh;
		黄灯亮: Mesh;
	};
	material: {
		'': MeshStandardMaterial;
		交通灯黑柱: MeshStandardMaterial;
		停车: MeshStandardMaterial;
		右拐: MeshStandardMaterial;
		地板深色: MeshStandardMaterial;
		墨绿: MeshStandardMaterial;
		建筑物: MeshStandardMaterial;
		材质: MeshPhysicalMaterial;
		标志色: MeshStandardMaterial;
		棕色: MeshStandardMaterial;
		浅灰: MeshStandardMaterial;
		深色玻璃: MeshStandardMaterial;
		白漆: MeshStandardMaterial;
		直行: MeshStandardMaterial;
		红灯: MeshStandardMaterial;
		'红灯.001': MeshStandardMaterial;
		红色: MeshStandardMaterial;
		绿漆: MeshStandardMaterial;
		绿灯: MeshPhysicalMaterial;
		金属: MeshStandardMaterial;
		青色: MeshStandardMaterial;
		黄漆: MeshStandardMaterial;
		黄灯: MeshPhysicalMaterial;
	};
};

export default function CarMap() {
	const { scene, nodes, material } = useGLTF(
		'/src/assets/models/ros-car/ros-car-map.glb'
	) as GLTFResult & ObjectMap;

	return (
		<group dispose={null}>
			<primitive object={scene} />
		</group>
	);
}

useGLTF.preload('/src/assets/models/ros-car/ros-car-map.glb');

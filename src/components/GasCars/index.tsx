import { useGLTF } from '@react-three/drei';
import type { EventHandlers } from '@react-three/fiber';
import type { Group, Mesh } from 'three';

export default function GasCar(props: Partial<Group & EventHandlers>) {
	const { nodes: _nodes, materials } = useGLTF(
		'/src/assets/models/parking-lot/cars.glb',
		true
	);

	const nodes = _nodes as Record<string, Mesh>;

	return (
		<group {...props} dispose={null}>
			<group position={[7.495, 1.192, 3.411]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.轮胎001.geometry}
					material={materials['橡胶材质.001']}
					position={[0.003, -0.76, -0.112]}
					rotation={[0, -0.009, 0]}
				/>
				<group position={[-0.008, -0.185, -0.017]} rotation={[0, -0.009, 0]}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004.geometry}
						material={materials['3d66-VRayMtl-16054740-078.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_1.geometry}
						material={materials['3d66-VRayMtl-16054740-079.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_2.geometry}
						material={materials['3d66-VRayMtl-16054740-080.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_3.geometry}
						material={materials['3d66-VRayMtl-16054740-081.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_4.geometry}
						material={materials['3d66-VRayMtl-16054740-083.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_5.geometry}
						material={materials['3d66-VRayMtl-16054740-084.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_6.geometry}
						material={materials['3d66-VRayMtl-16054740-085.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_7.geometry}
						material={materials['3d66-VRayMtl-16054740-086.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_8.geometry}
						material={materials['3d66-VRayMtl-16054740-087.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_9.geometry}
						material={materials['3d66-VRayMtl-16054740-095.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_10.geometry}
						material={materials['3d66-VRayMtl-16054740-096.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_11.geometry}
						material={materials['3d66-VRayMtl-16054740-091.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_12.geometry}
						material={materials['3d66-VRayMtl-16054740-093.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_13.geometry}
						material={materials['3d66-VRayMtl-16054740-097.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_14.geometry}
						material={materials['3d66-VRayMtl-16054740-098.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_15.geometry}
						material={materials['3d66-VRayMtl-16054740-076.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_16.geometry}
						material={materials['3d66-VRayMtl-16054740-075.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_17.geometry}
						material={materials['3d66-VRayMtl-16054740-100.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_18.geometry}
						material={materials['3d66-VRayMtl-16054740-102.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_19.geometry}
						material={materials['3d66-VRayMtl-16054740-104.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_20.geometry}
						material={materials['3d66-VRayMtl-16054740-106.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_21.geometry}
						material={materials['3d66-VRayMtl-16054740-107.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_22.geometry}
						material={materials['3d66-VRayMtl-16054740-108.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_23.geometry}
						material={materials['3d66-VRayMtl-16054740-109.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_24.geometry}
						material={materials['3d66-VRayMtl-16054740-111.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_25.geometry}
						material={materials['3d66-VRayMtl-16054740-112.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格004_26.geometry}
						material={nodes.网格004_26.material}
					/>
				</group>
				<group position={[-0.425, 0.322, 0.68]} rotation={[0, -0.009, 0]}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格007.geometry}
						material={materials['3d66-VRayMtl-16054740-086.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格007_1.geometry}
						material={materials['3d66-VRayMtl-16054740-089.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格007_2.geometry}
						material={materials['3d66-VRayMtl-16054740-090.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格007_3.geometry}
						material={materials['3d66-VRayMtl-16054740-076.001']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.网格007_4.geometry}
						material={materials['3d66-VRayMtl-16054740-078.001']}
					/>
				</group>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.车封条003.geometry}
					material={materials['橡胶材质.001']}
					position={[0.433, 0.322, 0.659]}
					rotation={[0, -0.009, 0]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.天窗001.geometry}
					material={materials['3d66-VRayMtl-16054740-080.001']}
					position={[-0.009, 0.583, 0.669]}
					rotation={[0, -0.009, 0]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.总玻璃001.geometry}
					material={materials['材质.002']}
					position={[-0.001, 0.303, 0.635]}
					rotation={[0, -0.009, 0]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.车牌002.geometry}
					material={materials['材质.007']}
					position={[0.008, -0.586, -2.513]}
					rotation={[0, -0.009, 0]}
				/>
			</group>
		</group>
	);
}

useGLTF.preload('/src/assets/models/parking-lot/cars.glb');

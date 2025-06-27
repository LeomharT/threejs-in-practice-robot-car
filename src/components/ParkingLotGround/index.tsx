import { useGLTF } from '@react-three/drei';
import type { Mesh } from 'three';

export default function ParkingLotGround() {
	const { nodes: _nodes, materials } = useGLTF(
		'/src/assets/models/parking-lot/parking-lot-ground.glb'
	);

	const nodes = _nodes as Record<string, Mesh>;

	return (
		<group dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.公路.geometry}
				material={materials['马路.002']}
				position={[-18.141, 0.024, 0.402]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.公路牙子.geometry}
				material={materials['材质.016']}
				position={[-19.391, 0.061, -0.317]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.双线.geometry}
				material={materials['白漆.002']}
				position={[0, 0.036, -24.976]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.外场地面.geometry}
				material={materials['Mat3d66-4356407-42-6802.002']}
				position={[49.188, 0.026, -43.296]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.平面.geometry}
				material={materials['绿化带.002']}
				position={[0, 0, 24.431]}
				scale={110.565}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.路灯.geometry}
				material={materials['金属白钢.003']}
				position={[-73.992, 11.259, -32.831]}
				rotation={[Math.PI, -Math.PI / 2, 0]}
				scale={-0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.路灯001.geometry}
				material={materials['金属白钢.003']}
				position={[-107.602, 11.259, -32.263]}
				rotation={[Math.PI, -Math.PI / 2, 0]}
				scale={-0.001}
			/>
			<group
				position={[-80.868, 11.259, -17.083]}
				rotation={[-Math.PI, 1.483, -Math.PI]}
				scale={0.001}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格324.geometry}
					material={materials['金属白钢.003']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格324_1.geometry}
					material={nodes.网格324_1.material}
				/>
			</group>
			<group
				position={[-40.339, 11.259, -33.249]}
				rotation={[Math.PI, -Math.PI / 2, 0]}
				scale={-0.001}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格325.geometry}
					material={materials['金属白钢.003']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格325_1.geometry}
					material={nodes.网格325_1.material}
				/>
			</group>
			<group
				position={[-6.586, 11.259, -34.655]}
				rotation={[Math.PI, -Math.PI / 2, 0]}
				scale={-0.001}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格326.geometry}
					material={materials['金属白钢.003']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格326_1.geometry}
					material={nodes.网格326_1.material}
				/>
			</group>
			<group
				position={[54.575, 11.259, -18.381]}
				rotation={[0, 1.571, 0]}
				scale={0.001}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格328.geometry}
					material={materials['金属白钢.003']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格328_1.geometry}
					material={nodes.网格328_1.material}
				/>
			</group>
			<group
				position={[26.917, 11.259, -37.651]}
				rotation={[0, -1.484, -Math.PI]}
				scale={-0.001}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格329.geometry}
					material={materials['金属白钢.003']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格329_1.geometry}
					material={nodes.网格329_1.material}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.路灯008.geometry}
				material={materials['金属白钢.003']}
				position={[24.17, 11.259, -17.82]}
				rotation={[0, 1.571, 0]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.路灯009.geometry}
				material={materials['金属白钢.003']}
				position={[-32.102, 11.259, -17.82]}
				rotation={[0, 1.571, 0]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.路灯010.geometry}
				material={materials['金属白钢.003']}
				position={[-4.546, 11.259, -17.82]}
				rotation={[0, 1.571, 0]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.马路标志.geometry}
				material={materials['白漆.002']}
				position={[0, 0.048, 0]}
			/>
		</group>
	);
}

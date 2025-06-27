import { useGLTF } from '@react-three/drei';
import type { Group, Mesh } from 'three';

useGLTF.preload('/src/assets/models/parking-lot/parking-lot-main.glb');

export function ParkingLotMain(props: Partial<Group>) {
	const { nodes: _nodes, materials } = useGLTF(
		'/src/assets/models/parking-lot/parking-lot-main.glb',
		true
	);

	const nodes = _nodes as Record<string, Mesh>;

	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.停车牌子.geometry}
				material={materials['Mat3d66-4356407-66-1743.003']}
				position={[-41.993, 2.223, -13.524]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.停车牌子001.geometry}
				material={materials['材质.017']}
				position={[-42.916, 0.577, -13.3]}
				rotation={[Math.PI, -Math.PI / 2, 0]}
				scale={-0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.停车牌子002.geometry}
				material={materials['Mat3d66-4356407-68-2028.003']}
				position={[-42.064, 5.897, -13.204]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.停车牌子003.geometry}
				material={materials['金属黄.010']}
				position={[-41.604, 5.897, -13.504]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.停车牌子004.geometry}
				material={materials['Mat3d66-4356407-67-188.003']}
				position={[-42.046, 2.255, -13.524]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={-0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.充电地面.geometry}
				material={materials['Mat3d66-4356407-54-711.005']}
				position={[-8.751, 0.05, -6.76]}
			/>
			<group position={[-37.807, 0.049, -10.228]} scale={0}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格334.geometry}
					material={materials['3d66-VRayMtl-16054740-017.002']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格334_1.geometry}
					material={materials['3d66-VRayMtl-16054740-018.002']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格334_2.geometry}
					material={materials['3d66-VRayMtl-16054740-019.002']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格334_3.geometry}
					material={materials['3d66-VRayMtl-16054740-020.002']}
				/>
			</group>
			<group position={[-37.806, 0.117, -9.566]} scale={0.001}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格335.geometry}
					material={materials['3d66-VRayMtl-16054740-039.002']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.网格335_1.geometry}
					material={materials['3d66-VRayMtl-16054740-040.002']}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.右.geometry}
				material={materials['水泥墙体.012']}
				position={[-50.68, 1.429, 10.522]}
				scale={0.001}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes['Obj3d66-4356407-312-324'].geometry}
					material={materials['Mat3d66-4356407-63-3956.002']}
					position={[253.043, 776.729, -24.474]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes['Obj3d66-4356407-319-110'].geometry}
					material={materials['水泥墙体.012']}
					position={[308.574, 771.409, 0.001]}
				>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes['Obj3d66-4356407-320-352'].geometry}
						material={materials['Mat3d66-4356407-63-3956.002']}
						position={[-55.535, 5.32, -24.473]}
					>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-321-962'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[-9.484, 194.658, 24.474]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-322-873'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[-9.484, -205.342, 24.474]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-323-328'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[-9.484, -125.342, 24.474]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-324-324'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[-9.484, -45.342, 24.474]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-325-399'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[-9.484, 34.658, 24.474]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-326-121'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[-9.484, 114.658, 24.474]}
						/>
					</mesh>
				</mesh>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.右1.geometry}
				material={materials['Mat3d66-4356407-65-6177.002']}
				position={[-46.959, 0.032, -14.339]}
				rotation={[-0.001, 0.001, 0]}
				scale={[0.002, 0.001, 0.001]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.右2.geometry}
				material={materials['Mat3d66-4356407-65-6177.002']}
				position={[-54.735, 0.032, -14.414]}
				rotation={[-0.001, 0.001, 0]}
				scale={[0.002, 0.001, 0.001]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.围墙001.geometry}
				material={materials['水泥墙体.014']}
				position={[-22.057, 0, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.围墙002.geometry}
				material={materials['水泥墙体.015']}
				position={[-31.82, 2.324, 22.982]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.围墙003.geometry}
				material={materials['水泥墙体.016']}
				position={[-31.82, 2.324, 22.982]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.围墙004.geometry}
				material={materials['水泥墙体.017']}
				position={[45.64, 2.324, 23.627]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.地下地面.geometry}
				material={materials['水泥墙体.012']}
				position={[-110.221, 0, 77.478]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.场内路面牙子.geometry}
				material={materials['绿化带.002']}
				position={[-5.483, 0.181, 20.96]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.屋顶001.geometry}
				material={materials['Mat3d66-4356407-55-1217.004']}
				position={[-31.655, 3.084, 23.26]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.屋顶002.geometry}
				material={materials['Mat3d66-4356407-55-1217.004']}
				position={[45.833, 3.15, 24.017]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.屋顶003.geometry}
				material={materials['Mat3d66-4356407-55-1217.005']}
				position={[-53.737, 3.127, 23.26]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.左.geometry}
				material={materials['水泥墙体.012']}
				position={[41.677, 1.429, 10.622]}
				scale={0.001}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes['Obj3d66-4356407-296-692'].geometry}
					material={materials['Mat3d66-4356407-63-3956.002']}
					position={[-253.02, 776.729, -24.462]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes['Obj3d66-4356407-303-139'].geometry}
					material={materials['水泥墙体.012']}
					position={[-308.563, 771.409, 0.005]}
				>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes['Obj3d66-4356407-304-891'].geometry}
						material={materials['Mat3d66-4356407-63-3956.002']}
						position={[55.539, 5.32, -24.465]}
					>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-305-876'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[9.48, 194.658, 24.467]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-306-817'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[9.48, -205.342, 24.467]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-307-838'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[9.48, -125.342, 24.467]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-308-416'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[9.48, -45.342, 24.467]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-309-340'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[9.48, 34.658, 24.467]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes['Obj3d66-4356407-310-569'].geometry}
							material={materials['Mat3d66-4356407-63-3956.002']}
							position={[9.48, 114.658, 24.467]}
						/>
					</mesh>
				</mesh>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.左1.geometry}
				material={materials['Mat3d66-4356407-65-6177.002']}
				position={[46.02, 0.029, -14.635]}
				rotation={[-0.001, 0.001, 0]}
				scale={[0.002, 0.001, 0.001]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.左2.geometry}
				material={materials['Mat3d66-4356407-65-6177.002']}
				position={[38.244, 0.029, -14.711]}
				rotation={[-0.001, 0.001, 0]}
				scale={[0.002, 0.001, 0.001]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.底座.geometry}
				material={materials['水泥墙体.012']}
				position={[-50.801, 0.117, -12.672]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.底座001.geometry}
				material={materials['水泥墙体.013']}
				position={[42.138, 0.062, -12.672]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.文本.geometry}
				material={materials['材质.018']}
				position={[-25.897, 0.038, -1.164]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.文本001.geometry}
				material={nodes.文本001.material}
				position={[-6.277, 0.025, 16.763]}
				rotation={[Math.PI, 0, Math.PI]}
				scale={1.881}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.斜坡墙壁.geometry}
				material={materials['马路牙子.002']}
				position={[-110.221, 0, 77.478]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.斜坡面.geometry}
				material={materials['马路.002']}
				position={[-54.861, -1.834, 0.869]}
				rotation={[-0.017, 0, 0]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.斜路面.geometry}
				material={materials['马路.002']}
				position={[45.958, -1.774, 1.228]}
				rotation={[-0.029, 0, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.水泥墩.geometry}
				material={materials['水泥墙体.012']}
				position={[-55.004, 0.826, 1.838]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.水泥墩001.geometry}
				material={materials['水泥墙体.012']}
				position={[45.996, 0.908, 1.938]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.玻璃.geometry}
				material={materials['材质.015']}
				position={[-54.878, 2.157, 6.041]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.玻璃001.geometry}
				material={materials['材质.015']}
				position={[46.076, 2.255, 6.021]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.窗户玻璃.geometry}
				material={materials['材质.015']}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.窗户玻璃001.geometry}
				material={materials['材质.015']}
				position={[-54.308, 1.639, 21.958]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.窗户玻璃002.geometry}
				material={materials['材质.019']}
				position={[45.199, 1.639, 22.603]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.窗框.geometry}
				material={materials['Mat3d66-4356407-61-6122.006']}
				position={[-33.806, 1.776, 26.297]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.窗框001.geometry}
				material={materials['Mat3d66-4356407-61-6122.007']}
				position={[-54.476, 1.717, 22.072]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.窗框002.geometry}
				material={materials['Mat3d66-4356407-61-6122.008']}
				position={[45.03, 1.717, 22.766]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1.geometry}
				material={nodes.箭头1.material}
				position={[-46.876, 0.026, -11.273]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1001.geometry}
				material={materials['白漆.002']}
				position={[-46.876, 0.026, 0.507]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1002.geometry}
				material={materials['白漆.002']}
				position={[-46.876, 0.026, 13.318]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1003.geometry}
				material={materials['白漆.002']}
				position={[-55.219, 0.026, -11.273]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1004.geometry}
				material={materials['白漆.002']}
				position={[38.685, 0.026, 9.352]}
				rotation={[Math.PI, 0, Math.PI]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1005.geometry}
				material={materials['白漆.002']}
				position={[38.685, 0.026, -5.922]}
				rotation={[Math.PI, 0, Math.PI]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1006.geometry}
				material={materials['白漆.002']}
				position={[-36.654, 0.026, 16.814]}
				rotation={[0, 1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1007.geometry}
				material={materials['白漆.002']}
				position={[-15.078, 0.026, 16.814]}
				rotation={[0, 1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1008.geometry}
				material={materials['白漆.002']}
				position={[3.966, 0.026, 16.814]}
				rotation={[0, 1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1009.geometry}
				material={materials['白漆.002']}
				position={[22.053, 0.026, 16.814]}
				rotation={[0, 1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1010.geometry}
				material={materials['白漆.002']}
				position={[-36.654, 0.026, -1.616]}
				rotation={[0, 1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1011.geometry}
				material={materials['白漆.002']}
				position={[-15.078, 0.026, -1.616]}
				rotation={[0, 1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1012.geometry}
				material={materials['白漆.002']}
				position={[3.966, 0.026, -1.616]}
				rotation={[0, 1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.箭头1013.geometry}
				material={materials['白漆.002']}
				position={[22.053, 0.026, -1.616]}
				rotation={[0, 1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.绿化001.geometry}
				material={materials['绿化带.002']}
				position={[-4.505, 0.341, 7.867]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.绿化边.geometry}
				material={materials['马路牙子.002']}
				position={[-9.604, 0.358, 21.134]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.绿化边缘.geometry}
				material={materials['马路牙子.002']}
				position={[-4.767, 0.237, 7.666]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.草地砖.geometry}
				material={materials['Mat3d66-4356407-54-711.004']}
				position={[-5.853, 0.05, 8.719]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.草坪格纹.geometry}
				material={materials['白漆.002']}
				position={[-6.301, 0.05, 9.007]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.遮阳.geometry}
				material={nodes.遮阳.material}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.遮阳001.geometry}
				material={nodes.遮阳001.material}
				position={[-22.059, 0, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.钢架.geometry}
				material={materials['金属白钢.003']}
				position={[-39.333, 3.276, -9.722]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.钢架001.geometry}
				material={materials['金属黑钢.002']}
				position={[-4.033, 4.455, -7.132]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.钢架002.geometry}
				material={materials['金属白钢.004']}
				position={[30.449, 3.276, -9.722]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.钢筋.geometry}
				material={materials['金属黑钢.002']}
				position={[-54.799, 2.376, 1.488]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.钢筋001.geometry}
				material={materials['金属黑钢.002']}
				position={[45.996, 2.443, 1.486]}
				scale={0.001}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.顶.geometry}
				material={materials['金属黑钢.002']}
				position={[-4.533, 4.301, -9.022]}
				scale={[7.994, 1, 1]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.顶001.geometry}
				material={materials['金属黑钢.002']}
				position={[-4.533, 4.999, -5.043]}
				scale={[7.994, 1, 1]}
			/>
		</group>
	);
}

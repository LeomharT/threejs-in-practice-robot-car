import { useGLTF } from '@react-three/drei';
import type { ObjectMap } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import gsap from 'gsap';
import { button, folder, useControls } from 'leva';
import { forwardRef, useRef, useState, type JSX } from 'react';
import {
	BoxGeometry,
	Euler,
	Mesh,
	Vector3,
	type Group,
	type MeshPhysicalMaterial,
	type MeshStandardMaterial,
} from 'three';
import type { GLTF } from 'three-stdlib';
import BarrierBorder from '../BarrierBorder';

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
		Scene: Group;
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
		杠: Group;
		柱体: Group;
		柱体001: Group;
		柱体001_1: Mesh;
		柱体001_2: Mesh;
		柱体002: Group;
		柱体002_1: Mesh;
		柱体002_2: Mesh;
		柱体_1: Mesh;
		柱体_2: Mesh;
		树苗: Group;
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
	materials: {
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

const RosMap = forwardRef(() => {
	const { nodes, materials } = useGLTF(
		'/assets/models/ros-car/ros-car-map.glb'
	) as GLTFResult & ObjectMap;

	const barrierRrm = useRef<JSX.IntrinsicElements['group']>(null);
	const barrierRrmRigidBody = useRef<RapierRigidBody>(null);

	const [borderPosition, setBorderPosition] = useState(new Vector3(0, -0.2, 0));

	const [{ rotationX }, set] = useControls('🗺️ Map', () => ({
		'🚧 Barrier': folder({
			rotationX: {
				min: 0,
				max: Math.PI / 2,
				step: 0.001,
				value: 0,
				label: 'Rotation Y',
			},
			Lift: button(() => {
				rotateBarrierRrm(-Math.PI / 2);
				barrierRrmRigidBody.current?.setEnabled(false);
			}),
			Down: button(() => {
				rotateBarrierRrm(0);
				barrierRrmRigidBody.current?.setEnabled(true);
			}),
		}),
	}));

	function rotateBarrierRrm(deg: number = 0) {
		if (!barrierRrm.current) throw new Error();
		if (!(barrierRrm.current.rotation instanceof Euler)) return;

		const animate = gsap.to(barrierRrm.current.rotation, {
			x: deg,
			ease: 'back.inOut',
			duration: 1,
			onUpdate: () => {
				if (barrierRrm.current) {
					set({ rotationX: -(barrierRrm.current.rotation as Euler).x });
				}
			},
		});

		animate.play();
	}

	function handleOnPointerEnter() {
		document.body.style.cursor = 'pointer';
		gsap
			.to(borderPosition, {
				y: 1.2,
				ease: 'back.out(2)',
				duration: 0.4,
				onUpdate() {
					setBorderPosition(borderPosition.clone());
				},
			})
			.play();
	}

	function handleOnPointerOut() {
		document.body.style.cursor = 'default';
		gsap
			.to(borderPosition, {
				y: -0.2,
				ease: 'back.inOut(5)',
				duration: 0.8,
				onUpdate() {
					setBorderPosition(borderPosition.clone());
				},
			})
			.play();
	}

	function handleOnParkingClick() {
		const timeLine = gsap.timeline();
		timeLine.to(borderPosition, {
			y: -0.2,
			duration: 0.14,
			ease: 'power2.out',
			onUpdate() {
				setBorderPosition(borderPosition.clone());
			},
		});
		timeLine.to(borderPosition, {
			y: 1.2,
			duration: 0.14,
			ease: 'power2.out',
			onUpdate() {
				setBorderPosition(borderPosition.clone());
			},
		});

		timeLine.play();
	}

	return (
		<group dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.信号灯.geometry}
				material={materials.交通灯黑柱}
				position={[-8.057, 2.028, -9.649]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
				scale={0.01}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.绿灯.geometry}
				material={materials.绿灯}
				position={[-8.057, 1.627, -9.649]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
				scale={0.01}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.红灯.geometry}
				material={materials.红灯}
				position={[-8.057, 2.372, -9.649]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
				scale={0.01}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.黄灯.geometry}
				material={materials.材质}
				position={[-8.057, 2, -9.649]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
				scale={0.01}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.红灯亮.geometry}
				material={materials['红灯.001']}
				position={[-8.057, 2.372, -9.649]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
				scale={0.01}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.绿灯亮.geometry}
				material={materials.绿灯}
				position={[-8.057, 1.627, -9.649]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
				scale={0.01}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.黄灯亮.geometry}
				material={materials.黄灯}
				position={[-8.057, 2, -9.649]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
				scale={0.01}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.向下.geometry}
				material={materials.白漆}
				position={[6.769, 0.026, -4.744]}
				rotation={[0, -1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.减速.geometry}
				material={materials.白漆}
				position={[-0.051, 0.026, 9.011]}
				rotation={[0, -1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes['02'].geometry}
				material={materials.绿漆}
				position={[-0.092, 0.016, -5.231]}
				rotation={[0, -1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes['04'].geometry}
				material={materials.黄漆}
				position={[-0.264, 0.02, 4.042]}
				rotation={[0, -1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes['01'].geometry}
				material={materials.绿漆}
				position={[-0.267, 0.022, 4.03]}
				rotation={[0, -1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.大圈.geometry}
				material={materials.白漆}
				position={[0, 0, -2]}
				rotation={[0, -1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.yellow.geometry}
				material={materials.黄漆}
				position={[-3.125, 0.026, 4.485]}
				rotation={[0, -1.571, 0]}
				scale={[1, 0.5, 1]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.人行道右边.geometry}
				material={materials.白漆}
				position={[6.923, 0.026, 3.825]}
				rotation={[0, -1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.人行道左边.geometry}
				material={nodes.人行道左边.material}
				position={[-7.101, 0.026, -4.378]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
				scale={0.01}
			/>
			<mesh
				name='P地面'
				castShadow
				receiveShadow
				material={materials.地板深色}
				position={[-2.055, 0.026, 3.694]}
				rotation={[0, -1.571, 0]}
				onPointerEnter={handleOnPointerEnter}
				onPointerOut={handleOnPointerOut}
				onPointerDown={handleOnParkingClick}
			>
				<boxGeometry args={[4.72, 0.01, 3.66]} />
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.P.geometry}
				material={nodes.P.material}
				position={[-2.094, 0.035, 3.559]}
				rotation={[-Math.PI, 0, -Math.PI]}
				scale={3.02}
			/>
			<BarrierBorder
				position={[-2.07, borderPosition.y, 1.11]}
				width={4}
				height={5.05}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes['03'].geometry}
				material={materials.黄漆}
				position={[-0.062, 0.025, -5.242]}
				rotation={[0, -1.571, 0]}
			/>
			<group position={[-2.449, 5.63, -4.173]} rotation={[0, 0.329, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.树苗002.geometry}
					material={materials.墨绿}
				/>
				<RigidBody type='fixed' colliders='hull'>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.树苗002_1.geometry}
						material={materials.棕色}
					/>
				</RigidBody>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.B.geometry}
				material={materials.标志色}
				position={[9.754, 1.522, -9.343]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
				scale={3.02}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.A.geometry}
				material={materials.标志色}
				position={[7.456, 1.522, 11.998]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={3.02}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.D.geometry}
				material={materials.标志色}
				position={[-9.774, 1.522, 8.845]}
				rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				scale={3.02}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.C.geometry}
				material={materials.标志色}
				position={[-7.412, 1.522, -11.765]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={3.02}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.向上.geometry}
				material={materials.白漆}
				position={[-7.209, 0.026, 3.896]}
				rotation={[0, 1.571, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.大圈黄线.geometry}
				material={materials.黄漆}
				position={[0, 0, -2]}
			/>
			<RigidBody type='fixed' colliders='trimesh'>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.外墙30.geometry}
					material={materials.浅灰}
					scale={[10, 1, 12]}
				/>
			</RigidBody>
			<RigidBody type='fixed' colliders='cuboid'>
				<mesh
					geometry={new BoxGeometry(20, 0.1, 24, 6, 6, 6)}
					position-y={-0.05}
					receiveShadow
					material={materials.地板深色}
					name='大地面'
				/>
			</RigidBody>
			{/* <mesh
				castShadow
				receiveShadow
				geometry={nodes.大地面.geometry}
				material={materials.地板深色}
				scale={[10, 1, 12]}
			/> */}
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.白线.geometry}
				material={nodes.白线.material}
				position={[-2.07, 0.025, 3.651]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.红苹果1.geometry}
				material={materials.红色}
				position={[0, 5.7, -4.1]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.红苹果2.geometry}
				material={materials.红色}
				position={[-2.564, 6.3, -3]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.红苹果3.geometry}
				material={materials.红色}
				position={[-4.4, 5.56, -3.78]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.青苹果1.geometry}
				material={materials.青色}
				position={[-1.017, 5.7, -3.739]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.青苹果2.geometry}
				material={materials.青色}
				position={[-2.161, 7.424, -2.908]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.装饰.geometry}
				material={materials.浅灰}
				position={[-2.06, 1.103, 6.555]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
			<RigidBody type='fixed' colliders='cuboid'>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.闸.geometry}
					material={materials.交通灯黑柱}
					position={[-1.905, 0.587, 6.547]}
					rotation={[-Math.PI, 0, -Math.PI]}
				/>
			</RigidBody>
			<RigidBody ref={barrierRrmRigidBody} type='fixed' colliders='trimesh'>
				<group
					ref={barrierRrm}
					position={[-1.879, 1.034, 6.553]}
					rotation={[-rotationX, 0, Math.PI]}
				>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.杆.geometry}
						material={materials.交通灯黑柱}
						rotation-x={-Math.PI / 4 - Math.PI}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.杆_1.geometry}
						material={materials.红色}
						rotation-x={-Math.PI / 4 - Math.PI}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.杆_2.geometry}
						material={materials.浅灰}
						rotation-x={-Math.PI / 4 - Math.PI}
					/>
				</group>
			</RigidBody>
			<RigidBody type='fixed' colliders='cuboid'>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.建筑001.geometry}
					material={materials.建筑物}
					position={[1.561, 1.538, 2.997]}
					rotation={[0, -1.571, 0]}
					scale={[0.5, 1.4, 1.25]}
				/>
			</RigidBody>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.玻璃.geometry}
				material={materials.深色玻璃}
				position={[1.574, 1.337, 3.002]}
				rotation={[0, -1.571, 0]}
				scale={[0.447, 1.318, 1.168]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.建筑002.geometry}
				material={materials.建筑物}
				position={[3.001, 1.333, -5.232]}
				rotation={[0, -1.571, 0]}
				scale={[0.275, 1.5, 0.6]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.顶001.geometry}
				material={materials.建筑物}
				position={[3.013, 2.962, -5.012]}
				rotation={[0, -1.571, 0]}
				scale={1.2}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.玻璃002.geometry}
				material={materials.深色玻璃}
				position={[3.016, 1.522, -5.249]}
				rotation={[0, -1.571, 0]}
				scale={[0.265, 1.318, 0.593]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.建筑003.geometry}
				material={materials.建筑物}
				position={[1, 0, -5]}
				scale={[0.5, 1.05, 0.5]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.玻璃003.geometry}
				material={materials.深色玻璃}
				position={[1, 0, -5]}
				scale={[0.5, 1.05, 0.5]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Circle001.geometry}
				material={materials.金属}
				position={[-4.245, 0.003, -5.347]}
				rotation={[Math.PI / 2, 0, -Math.PI / 4]}
			/>
			<group
				position={[-4.241, 1.241, -5.234]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.7, 0.015, 0.7]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.柱体_1.geometry}
					material={materials.金属}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.柱体_2.geometry}
					material={materials.直行}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Circle001002.geometry}
				material={materials.金属}
				position={[7.757, 0.003, 10.041]}
				rotation={[Math.PI / 2, 0, 2.356]}
			/>
			<group
				position={[7.753, 1.241, 9.929]}
				rotation={[Math.PI / 2, 0, Math.PI]}
				scale={[0.7, 0.015, 0.7]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.柱体002_1.geometry}
					material={materials.金属}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.柱体002_2.geometry}
					material={materials.右拐}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Circle001001.geometry}
				material={materials.金属}
				position={[3.573, 0.003, 3.861]}
				rotation={[Math.PI / 2, 0, 2.356]}
			/>
			<group
				position={[3.569, 1.241, 3.749]}
				rotation={[Math.PI / 2, 0, Math.PI]}
				scale={[0.7, 0.015, 0.7]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.柱体001_1.geometry}
					material={materials.金属}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.柱体001_2.geometry}
					material={materials.停车}
				/>
			</group>
		</group>
	);
});

export default RosMap;

useGLTF.preload('/assets/models/ros-car/ros-car-map.glb');

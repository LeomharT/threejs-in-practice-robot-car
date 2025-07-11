import { useGLTF, useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree, type ObjectMap } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { button, useControls } from 'leva';
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
	type JSX,
	type RefObject,
} from 'react';
import {
	BoxGeometry,
	Group,
	Mesh,
	MeshBasicMaterial,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	Quaternion,
	Raycaster,
	Vector3,
} from 'three';
import type { GLTF } from 'three-stdlib';
import { _Controls } from '../../app/keyboard';
import { useRosMapStore } from '../../hooks/useRosMapStore';
import type { RobotCarProps } from './type';

type GLTFResult = GLTF & {
	nodes: {
		'1___5': Mesh;
		'1___5_1': Mesh;
		'2': Mesh;
		'2_1': Mesh;
		'?D3y__17': Mesh;
		'?D3y__17_1': Mesh;
		'?D3y__17_2': Mesh;
		'?D3y__17_3': Mesh;
		'?D3y__17_4': Mesh;
		Scene: Group;
		侧面按钮: Group;
		侧面选项: Mesh;
		前轮1: Mesh;
		前轮2: Mesh;
		右灯: Mesh;
		后轮1: Mesh;
		后轮2: Mesh;
		外壳: Group;
		左灯: Mesh;
		底座: Group;
		柱体001: Mesh;
		柱体001_1: Mesh;
		柱体003: Mesh;
		柱体003_1: Mesh;
		红色: Mesh;
		部件1: Mesh;
		部件2: Group;
		部件3: Mesh;
		部件4: Mesh;
		部件5: Mesh;
		部件6: Mesh;
		顶部: Group;
	};
	materials: {
		发光: MeshPhysicalMaterial;
		塑料: MeshStandardMaterial;
		材质: MeshStandardMaterial;
		灰: MeshStandardMaterial;
		红: MeshStandardMaterial;
		轮胎: MeshStandardMaterial;
		'轮胎.003': MeshStandardMaterial;
		金属灰: MeshStandardMaterial;
		金属白: MeshStandardMaterial;
		金属黑: MeshStandardMaterial;
	};
};

const RobotCars = forwardRef<RefObject<RapierRigidBody | null>>(
	(props: RobotCarProps, ref) => {
		const { nodes, materials } = useGLTF(
			'/assets/models/ros-car/robot-car.glb'
		) as GLTFResult & ObjectMap;

		const { scene } = useThree();

		const { parking, pick, begin, dispatch } = useRosMapStore((state) => state);

		const raycaster = useRef(new Raycaster());

		const carRigidBody = useRef<RapierRigidBody>(null);

		const wheels = useRef<JSX.IntrinsicElements['group']>(null);

		const box = useRef(
			new Mesh(
				new BoxGeometry(1, 1, 1),
				new MeshBasicMaterial({ color: 'red' })
			)
		);

		const [linearDamping, setLinearDamping] = useState(5.0);

		const forwardPressed = useKeyboardControls(
			(state) => state[_Controls.forward]
		);
		const backPressed = useKeyboardControls((state) => state[_Controls.back]);
		const leftPressed = useKeyboardControls((state) => state[_Controls.left]);
		const rightPressed = useKeyboardControls((state) => state[_Controls.right]);

		useImperativeHandle(
			ref,
			() => {
				return carRigidBody;
			},
			[]
		);

		function getForward() {
			if (carRigidBody.current) {
				const q = carRigidBody.current.rotation();
				const quat = new Quaternion(q.x, q.y, q.z, q.w);
				return new Vector3(1, 0, 0).applyQuaternion(quat).normalize();
			}

			return new Vector3();
		}

		function intersectRobotCar() {
			const boxPosition = box.current.position.clone();

			raycaster.current.set(boxPosition, new Vector3(0, -1, 0));

			const intersect = raycaster.current.intersectObject(scene);

			const isParking = !!intersect.filter((obj) => obj.object.name === 'P地面')
				.length;

			const isBegin = !!intersect.filter((obj) => obj.object.name === 'Begin_G')
				.length;

			const isPick = !!intersect.filter((obj) => obj.object.name === 'Pick_G')
				.length;

			if (isParking !== parking) dispatch('parking', isParking);

			if (isBegin !== begin) dispatch('begin', isBegin);

			if (isPick !== pick) dispatch('pick', isPick);
		}

		const { angvel, speed } = useControls('🚘 Robot Car', {
			angvel: {
				min: 0,
				max: Math.PI,
				step: 0.001,
				value: Math.PI / 4,
			},
			speed: {
				min: 0,
				max: 10,
				step: 0.001,
				value: 2.5,
			},
			Reset: button(() => {
				setLinearDamping(0.0);

				if (carRigidBody.current) {
					carRigidBody.current.setTranslation({ x: 0, y: 3.5, z: 0 }, true);
					carRigidBody.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
					carRigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
					carRigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
				}

				setTimeout(() => {
					setLinearDamping(5.0);
				}, 1000);
			}),
		});

		useFrame(() => {
			if (!carRigidBody.current) return;

			if (!(wheels.current instanceof Group)) return;

			const forward = getForward();
			const backward = forward.clone().multiplyScalar(-1);

			// Angvel Impulse
			const impulse = { x: 0, y: 0, z: 0 };

			if (forwardPressed) {
				carRigidBody.current.setLinvel(
					{ x: forward.x * speed, y: 0, z: forward.z * speed },
					true
				);
				carRigidBody.current.applyImpulse(
					{ x: forward.x, y: 0, z: forward.z },
					true
				);

				if (leftPressed) {
					impulse.y += angvel * (Math.PI / 4);
					carRigidBody.current.setAngvel({ ...impulse }, true);
				}
				if (rightPressed) {
					impulse.y -= angvel * (Math.PI / 4);
					carRigidBody.current.setAngvel({ ...impulse }, true);
				}
			}

			if (backPressed) {
				carRigidBody.current.setLinvel(
					{ x: backward.x * speed, y: 0, z: backward.z * speed },
					true
				);
				carRigidBody.current.applyImpulse(
					{ x: backward.x, y: 0, z: backward.z },
					true
				);

				if (leftPressed) {
					impulse.y -= angvel * (Math.PI / 4);
					carRigidBody.current.setAngvel({ ...impulse }, true);
				}
				if (rightPressed) {
					impulse.y += angvel * (Math.PI / 4);
					carRigidBody.current.setAngvel({ ...impulse }, true);
				}
			}

			wheels.current.children[0].rotation.y = 0;
			wheels.current.children[1].rotation.y = 0;

			if (leftPressed) {
				wheels.current.children[0].rotation.y = angvel * 0.5;
				wheels.current.children[1].rotation.y = angvel * 0.5;
			}
			if (rightPressed) {
				wheels.current.children[0].rotation.y = -angvel * 0.5;
				wheels.current.children[1].rotation.y = -angvel * 0.5;
			}

			const velocity = carRigidBody.current.linvel();
			const v = new Vector3(velocity.x, velocity.y, velocity.z);

			const forwardAmount = v.dot(forward) / 25.0;

			wheels.current.children[0].rotation.z -= forwardAmount;
			wheels.current.children[1].rotation.z -= forwardAmount;
			wheels.current.children[2].rotation.z -= forwardAmount;
			wheels.current.children[3].rotation.z -= forwardAmount;

			box.current.position.copy(carRigidBody.current.translation());
			box.current.position.y = 2.0;

			intersectRobotCar();
		});

		useEffect(() => {
			box.current.visible = false;
			scene.add(box.current);
		}, [scene]);

		return (
			<RigidBody
				ref={carRigidBody}
				gravityScale={2.5}
				type='dynamic'
				restitution={0.25}
				angularDamping={25}
				linearDamping={linearDamping}
			>
				<group {...props} dispose={null}>
					<mesh
						name='红色'
						castShadow
						receiveShadow
						geometry={nodes.红色.geometry}
						material={materials.红}
						scale={0.096}
					/>
					<group name='外壳' scale={0.096}>
						<mesh
							name='?D3y__17'
							castShadow
							receiveShadow
							geometry={nodes['?D3y__17'].geometry}
							material={materials.塑料}
						/>
						<mesh
							name='?D3y__17_1'
							castShadow
							receiveShadow
							geometry={nodes['?D3y__17_1'].geometry}
							material={materials.金属灰}
						/>
						<mesh
							name='?D3y__17_2'
							castShadow
							receiveShadow
							geometry={nodes['?D3y__17_2'].geometry}
							material={materials.金属黑}
						/>
						<mesh
							name='?D3y__17_3'
							castShadow
							receiveShadow
							geometry={nodes['?D3y__17_3'].geometry}
							material={materials.灰}
						/>
						<mesh
							name='?D3y__17_4'
							castShadow
							receiveShadow
							geometry={nodes['?D3y__17_4'].geometry}
							material={materials.金属白}
						/>
					</group>
					<mesh
						name='左灯'
						castShadow
						receiveShadow
						geometry={nodes.左灯.geometry}
						scale={0.096}
					/>
					<mesh
						name='右灯'
						castShadow
						receiveShadow
						geometry={nodes.右灯.geometry}
						scale={0.096}
					/>
					<group ref={wheels} dispose={null}>
						<mesh
							name='前轮左'
							castShadow
							receiveShadow
							geometry={nodes.前轮1.geometry}
							material={materials.轮胎}
							position={[0.935, 0.452, -0.821]}
							scale={0.094}
						/>
						<mesh
							name='前轮右'
							castShadow
							receiveShadow
							geometry={nodes.前轮1.geometry.clone().rotateX(Math.PI)}
							material={materials.轮胎}
							position={[0.935, 0.452, 0.865]}
							scale={0.094}
						/>
						<mesh
							name='后轮左'
							castShadow
							receiveShadow
							geometry={nodes.前轮1.geometry}
							material={materials.轮胎}
							position={[-0.935, 0.452, -0.821]}
							scale={0.094}
						/>
						<mesh
							name='后轮右'
							castShadow
							receiveShadow
							geometry={nodes.前轮1.geometry.clone().rotateX(Math.PI)}
							material={materials.轮胎}
							position={[-0.935, 0.452, 0.865]}
							scale={0.094}
						/>
					</group>
					<mesh
						name='侧面选项'
						castShadow
						receiveShadow
						geometry={nodes.侧面选项.geometry}
						material={materials.灰}
						scale={0.096}
					/>
					<group name='侧面按钮' scale={0.096}>
						<mesh
							name='1___5'
							castShadow
							receiveShadow
							geometry={nodes['1___5'].geometry}
							material={materials.金属黑}
						/>
						<mesh
							name='1___5_1'
							castShadow
							receiveShadow
							geometry={nodes['1___5_1'].geometry}
							material={materials.材质}
						/>
					</group>
					<group name='顶部' scale={0.096}>
						<mesh
							name='2'
							castShadow
							receiveShadow
							geometry={nodes['2'].geometry}
							material={materials.金属白}
						/>
						<mesh
							name='2_1'
							castShadow
							receiveShadow
							geometry={nodes['2_1'].geometry}
							material={materials.金属黑}
						/>
					</group>
					<group name='底座' position={[-0.187, 1.966, 0]}>
						<mesh
							name='柱体001'
							castShadow
							receiveShadow
							geometry={nodes.柱体001.geometry}
							material={materials.灰}
						/>
						<mesh
							name='柱体001_1'
							castShadow
							receiveShadow
							geometry={nodes.柱体001_1.geometry}
							material={materials.金属黑}
						/>
					</group>
					<mesh
						name='部件6'
						castShadow
						receiveShadow
						geometry={nodes.部件6.geometry}
						material={materials.金属白}
						position={[-0.187, 2.121, 0.007]}
					>
						<mesh
							name='部件5'
							castShadow
							receiveShadow
							geometry={nodes.部件5.geometry}
							material={materials.金属白}
							position={[0.342, 0.586, 0]}
						>
							<mesh
								name='部件4'
								castShadow
								receiveShadow
								geometry={nodes.部件4.geometry}
								material={materials.金属白}
								position={[-0.461, 0.811, 0]}
							>
								<mesh
									name='部件3'
									castShadow
									receiveShadow
									geometry={nodes.部件3.geometry}
									material={materials.金属白}
									position={[0.009, 0.667, -0.008]}
								>
									<group
										name='部件2'
										position={[0.802, 0.335, 0.008]}
										rotation={[Math.PI / 2, 0, 0]}
									>
										<mesh
											name='柱体003'
											castShadow
											receiveShadow
											geometry={nodes.柱体003.geometry}
											material={materials.金属白}
										/>
										<mesh
											name='柱体003_1'
											castShadow
											receiveShadow
											geometry={nodes.柱体003_1.geometry}
											material={materials.金属黑}
										/>
										<mesh
											name='部件1'
											castShadow
											receiveShadow
											geometry={nodes.部件1.geometry}
											material={materials.金属灰}
											position={[0.004, 0.378, -0.238]}
										/>
									</group>
								</mesh>
							</mesh>
						</mesh>
					</mesh>
				</group>
			</RigidBody>
		);
	}
);

export default RobotCars;

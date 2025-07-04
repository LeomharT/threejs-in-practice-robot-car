import { useGLTF, useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree, type ObjectMap } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { button, useControls } from 'leva';
import {
	forwardRef,
	useContext,
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
	Quaternion,
	Raycaster,
	Vector3,
	type MeshPhysicalMaterial,
	type MeshStandardMaterial,
	type Object3D,
} from 'three';
import type { GLTF } from 'three-stdlib';
import { AppContext } from '../../app/contex';
import { _Controls } from '../../app/keyboard';
import type { RobotCarProps } from './type';

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
		发光: MeshPhysicalMaterial;
		塑料: MeshStandardMaterial;
		机械臂: MeshStandardMaterial;
		材质: MeshStandardMaterial;
		灰: MeshStandardMaterial;
		红: MeshStandardMaterial;
		轮胎: MeshStandardMaterial;
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

		const { state, dispatch } = useContext(AppContext);

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

			const parking = !!intersect.filter((item) => item.object.name === 'P地面')
				.length;

			const begin = !!intersect.filter((item) => item.object.name === 'Begin_G')
				.length;

			const pick = !!intersect.filter((item) => item.object.name === 'Pick_G')
				.length;

			if (parking !== state.current.parking) {
				dispatch({ type: 'parking', payload: parking });
			}
			if (begin !== state.current.begin) {
				dispatch({ type: 'begin', payload: begin });
			}
			if (pick !== state.current.pick) {
				dispatch({ type: 'pick', payload: pick });
			}
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
				{/* <RobotCarScreen /> */}
				<group {...props} dispose={null}>
					<group scale={0.096}>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.外壳_1.geometry}
							material={materials.塑料}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.外壳_2.geometry}
							material={materials.金属灰}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.外壳_3.geometry}
							material={materials.金属黑}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.外壳_4.geometry}
							material={materials.灰}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.外壳_5.geometry}
							material={materials.金属白}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.外壳_6.geometry}
							material={materials.发光}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.外壳_7.geometry}
							material={materials.材质}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.外壳_8.geometry}
							material={materials.红}
						/>
					</group>
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
					<group position={[-0.187, 1.966, 0]}>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.柱体001.geometry}
							material={materials.灰}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.柱体001_1.geometry}
							material={materials.金属黑}
						/>
					</group>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.部件6.geometry}
						material={materials.机械臂}
						position={[-0.187, 2.121, 0.007]}
					/>
					<group
						position={[0.504, 4.519, 0.007]}
						rotation={[Math.PI / 2, 0, 0]}
					>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.柱体003.geometry}
							material={materials.机械臂}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.柱体003_1.geometry}
							material={materials.金属黑}
						/>
					</group>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.部件3.geometry}
						material={materials.机械臂}
						position={[0.165, 4.174, 0.007]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.部件5.geometry}
						material={materials.机械臂}
						position={[0.155, 2.706, 0.007]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.部件4.geometry}
						material={materials.机械臂}
						position={[0.152, 3.508, 0.007]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.部件1.geometry}
						material={materials.金属灰}
						position={[0.509, 4.758, 0.385]}
						rotation={[Math.PI / 2, 0, 0]}
					/>
				</group>
			</RigidBody>
		);
	}
);

export default RobotCars;

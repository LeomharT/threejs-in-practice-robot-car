import { useGLTF } from '@react-three/drei';
import { useFrame, type ObjectMap } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { button, useControls } from 'leva';
import { useEffect, useRef, useState, type JSX } from 'react';
import {
	Group,
	Quaternion,
	Vector3,
	type Mesh,
	type MeshPhysicalMaterial,
	type MeshStandardMaterial,
	type Object3D,
} from 'three';
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

const SPEED = 5.0;

export default function RobotCars(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF(
		'/src/assets/models/ros-car/robot-car.glb'
	) as GLTFResult & ObjectMap;

	const carRigidBody = useRef<RapierRigidBody>(null);

	const wheels = useRef<JSX.IntrinsicElements['group']>(null);

	const [currentPressKeys, setCurrentPressKeys] = useState(new Set());

	function getForward() {
		if (carRigidBody.current) {
			const q = carRigidBody.current.rotation();
			const quat = new Quaternion(q.x, q.y, q.z, q.w);

			return new Vector3(1, 0, 0).applyQuaternion(quat).normalize();
		}

		return new Vector3();
	}

	useControls('🚘 Robot Car', {
		Reset: button(() => {
			if (carRigidBody.current) {
				carRigidBody.current.setTranslation({ x: 0, y: 3.5, z: 0 }, true);
				carRigidBody.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
				carRigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
				carRigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
			}
		}),
	});

	useFrame((_, delta) => {
		const forward = getForward();

		if (currentPressKeys.has('w')) {
			carRigidBody.current?.setLinvel(
				{ x: forward.x * SPEED, y: 0, z: forward.z * SPEED },
				true
			);
			carRigidBody.current?.applyImpulse(
				{ x: forward.x, y: 0, z: forward.z },
				true
			);
		}

		if (currentPressKeys.has('s')) {
			carRigidBody.current?.setLinvel(
				{ x: -forward.x * SPEED, y: 0, z: forward.z * SPEED },
				true
			);
			carRigidBody.current?.applyImpulse(
				{ x: -forward.x, y: 0, z: forward.z },
				true
			);
		}

		if (wheels.current instanceof Group) {
			wheels.current.children[0].rotation.z -= delta;
			wheels.current.children[1].rotation.z -= delta;
			wheels.current.children[2].rotation.z -= delta;
			wheels.current.children[3].rotation.z -= delta;
		}
	});

	useEffect(() => {
		window.addEventListener('keypress', (e: KeyboardEvent) => {
			let direction = 0;

			if (
				wheels.current instanceof Group &&
				carRigidBody.current instanceof RapierRigidBody
			) {
				setCurrentPressKeys((prev) => {
					return prev.add(e.key);
				});

				if (currentPressKeys.has('a')) {
					direction = Math.PI / 8;
				}

				if (currentPressKeys.has('d')) {
					direction = -Math.PI / 8;
				}

				wheels.current.children[0].rotation.y = direction;
				wheels.current.children[1].rotation.y = direction;
			}
		});

		window.addEventListener('keyup', (e: KeyboardEvent) => {
			setCurrentPressKeys((prev) => {
				prev.delete(e.key);
				return prev;
			});

			if (currentPressKeys.has('d') || currentPressKeys.has('a')) return;

			if (wheels.current instanceof Group) {
				wheels.current.children[0].rotation.y = 0;
				wheels.current.children[1].rotation.y = 0;
				wheels.current.children[2].rotation.y = 0;
				wheels.current.children[3].rotation.y = 0;
			}
		});
	}, []);

	return (
		<RigidBody ref={carRigidBody} gravityScale={2.5} type='dynamic'>
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
				<group position={[0.504, 4.519, 0.007]} rotation={[Math.PI / 2, 0, 0]}>
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

import { Box, Cylinder, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
	RapierRigidBody,
	RigidBody,
	useRevoluteJoint,
	type Vector3Tuple,
} from '@react-three/rapier';
import { useControls } from 'leva';
import { createRef, type RefObject, useRef } from 'react';
import { _Controls } from '../../app/keyboard';

const WheelJoint = ({
	body,
	wheel,
	bodyAnchor,
	wheelAnchor,
	rotationAxis,
}: {
	body: RefObject<RapierRigidBody>;
	wheel: RefObject<RapierRigidBody>;
	bodyAnchor: Vector3Tuple;
	wheelAnchor: Vector3Tuple;
	rotationAxis: Vector3Tuple;
}) => {
	const joint = useRevoluteJoint(body, wheel, [
		bodyAnchor,
		wheelAnchor,
		rotationAxis,
	]);

	const forwardPress = useKeyboardControls((state) => state[_Controls.forward]);
	const backPress = useKeyboardControls((state) => state[_Controls.back]);

	useFrame(() => {
		if (joint.current) {
			if (forwardPress) {
				joint.current.configureMotorVelocity(20, 1);
			} else if (backPress) {
				joint.current.configureMotorVelocity(-20, 1);
			} else {
				joint.current.configureMotorVelocity(0, 0);
			}
		}
	});

	return null;
};

export const Car = () => {
	const bodyRef = useRef<RapierRigidBody>(null!);
	const wheelPositions: [number, number, number][] = [
		[-3, 0, 2],
		[-3, 0, -2],
		[3, 0, 2],
		[3, 0, -2],
	];
	const wheelRefs = useRef(
		wheelPositions.map(() =>
			createRef<RapierRigidBody>()
		) as RefObject<RapierRigidBody>[]
	);

	const { x, y, z } = useControls({
		x: Math.PI / 2,
		y: 0,
		z: 0.5,
	});

	return (
		<group>
			<RigidBody
				colliders='cuboid'
				ref={bodyRef}
				type='dynamic'
				gravityScale={1.25}
			>
				<Box scale={[6, 1, 1.9]} castShadow receiveShadow name='chassis'>
					<meshStandardMaterial color={'red'} />
				</Box>
			</RigidBody>
			{wheelPositions.map((wheelPosition, index) => (
				<RigidBody
					position={wheelPosition}
					colliders='hull'
					type='dynamic'
					key={index}
					ref={wheelRefs.current[index]}
				>
					<Cylinder
						rotation={[x, y, z]}
						args={[1, 1, 1, 32]}
						castShadow
						receiveShadow
					>
						<meshStandardMaterial color={'grey'} />
					</Cylinder>
				</RigidBody>
			))}
			{wheelPositions.map((wheelPosition, index) => (
				<WheelJoint
					key={index}
					body={bodyRef}
					wheel={wheelRefs.current[index]}
					bodyAnchor={wheelPosition}
					wheelAnchor={[0, 0, 0]}
					rotationAxis={[0, 0, 1]}
				/>
			))}
		</group>
	);
};

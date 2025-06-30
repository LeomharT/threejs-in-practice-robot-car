import { RigidBody } from '@react-three/rapier';

export default function TestModel() {
	return (
		<RigidBody>
			<mesh castShadow position={[-2, 5, 0]}>
				<sphereGeometry />
				<meshBasicMaterial color='orange' />
			</mesh>
		</RigidBody>
	);
}

import { Box, Html } from '@react-three/drei';

export default function RobotCarScreen() {
	return (
		<group
			dispose={null}
			position={[-1.29, 1.32, 0]}
			rotation={[0, 0, Math.PI / 3]}
			scale={0.45}
		>
			<mesh>
				<Box args={[2.0, 0.03, 3.0]}>
					<meshStandardMaterial transparent opacity={0.0} />
				</Box>
			</mesh>
			<Html
				scale={0.08}
				occlude
				transform
				position={[0, 0.1, 0]}
				rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
			>
				<iframe
					src='https://win11.blueedge.me/'
					style={{ width: '1450px', height: '960px' }}
				></iframe>
			</Html>
		</group>
	);
}

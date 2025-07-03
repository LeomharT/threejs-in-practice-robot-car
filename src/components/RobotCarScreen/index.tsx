import { Box, Html } from '@react-three/drei';

export default function RobotCarScreen() {
	return (
		<group dispose={null} position={[0, 3, 0]}>
			<mesh>
				<Box args={[2.0, 0.2, 3.0]}>
					<meshStandardMaterial />
				</Box>
			</mesh>
			<Html
				scale={0.08}
				transform
				position={[0, 0.1, 0]}
				rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
			>
				<iframe
					src='https://win11.blueedge.me/'
					style={{ width: '1200px', height: '800px' }}
				></iframe>
			</Html>
		</group>
	);
}

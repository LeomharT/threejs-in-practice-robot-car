import medium from '@pmndrs/assets/fonts/inter_medium.woff';
import type { RoundedBoxGeometryProps } from '@react-three/drei';
import { Text, useGLTF } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { geometry } from 'maath';
import { useState, type JSX } from 'react';
import { Color } from 'three';

declare module '@react-three/fiber' {
	interface ThreeElements {
		roundedPlaneGeometry: RoundedBoxGeometryProps;
	}
}
extend(geometry as unknown as any);

const BLUE_6 = '#1890ff';
const BLUE_5 = '#40a9ff';
const BLUE_4 = '#69c0ff';

export default function ParkingSpaces() {
	return (
		<>
			<group
				dispose={null}
				position={[0.55, 0.06, 4.15]}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<ParkingSpace text='1' />
				<ParkingSpace text='2' position-x={-2.6} />
				<ParkingSpace text='3' position-x={-10.2} />
				<ParkingSpace
					text='4'
					position-x={-53.9}
					position-y={-10.7}
					rotation-z={-Math.PI / 2}
				/>
				<ParkingSpace
					text='5'
					position-x={-53.9}
					position-y={-13.3}
					rotation-z={-Math.PI / 2}
				/>
			</group>
		</>
	);
}

function ParkingSpace(
	props: JSX.IntrinsicElements['group'] & { text?: string }
) {
	const [color, setColor] = useState(new Color(BLUE_4));

	return (
		<mesh
			onPointerEnter={() => {
				setColor(new Color(BLUE_5));
				document.body.style.cursor = 'pointer';
			}}
			onPointerLeave={() => {
				setColor(new Color(BLUE_4));
				document.body.style.cursor = 'default';
			}}
			{...props}
		>
			<roundedPlaneGeometry args={[2.5, 5.3, 0.1]} />
			<meshBasicMaterial color={BLUE_6} />
			<mesh position-z={0.01}>
				<roundedPlaneGeometry args={[2.3, 5.1, 0.1]} />
				<meshBasicMaterial color={color} />
			</mesh>
			<Text
				font={medium}
				color={BLUE_6}
				fontSize={1.0}
				letterSpacing={-0.025}
				anchorY='middle'
				anchorX='center'
				lineHeight={0.8}
				position={[0, 0, 0.1]}
			>
				{props.text}
			</Text>
		</mesh>
	);
}

useGLTF.preload('/src/assets/models/parking-lot/cars.glb');

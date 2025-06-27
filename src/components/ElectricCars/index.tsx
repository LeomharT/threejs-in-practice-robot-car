import { TransformControls, useGLTF } from '@react-three/drei';
import type { EventHandlers } from '@react-three/fiber';
import { useControls } from 'leva';
import { useState } from 'react';
import type { Group } from 'three';

export default function ElectricCars(props: Partial<Group & EventHandlers>) {
	const { scene } = useGLTF('/src/assets/models/parking-lot/cars.glb', true);

	const [enabled, setEnabled] = useState(false);

	const { x, y, z } = useControls('🚗 Car', {
		x: {
			value: -47,
			step: 0.001,
			min: -100,
			max: 100,
			label: 'Position X',
		},
		y: {
			value: 0,
			step: 0.001,
			min: -100,
			max: 100,
			label: 'Position X',
		},
		z: {
			value: -20,
			step: 0.001,
			min: -100,
			max: 100,
			label: 'Position X',
		},
	});

	return (
		<TransformControls
			showX={enabled}
			showY={enabled}
			showZ={enabled}
			enabled={enabled}
			position={[x, y, z]}
		>
			<group
				{...props}
				dispose={null}
				onPointerMissed={() => {
					setEnabled(false);
				}}
				onContextMenu={() => {
					setEnabled(true);
				}}
			>
				<primitive
					position={[0.0, 0.7, 1.0]}
					object={scene.children[0].clone()}
				/>
			</group>
		</TransformControls>
	);
}

useGLTF.preload('/src/assets/models/parking-lot/cars.glb');

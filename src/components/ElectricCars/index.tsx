import { TransformControls, useGLTF } from '@react-three/drei';
import type { EventHandlers } from '@react-three/fiber';
import { useState } from 'react';
import type { Group } from 'three';

export default function ElectricCars(props: Partial<Group & EventHandlers>) {
	const { scene } = useGLTF('/src/assets/models/parking-lot/cars.glb', true);

	const [enabled, setEnabled] = useState(false);

	return (
		<TransformControls
			showX={enabled}
			showY={enabled}
			showZ={enabled}
			enabled={enabled}
			position={[-47, 0, -20]}
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

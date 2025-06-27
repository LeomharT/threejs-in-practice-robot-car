import { useGLTF } from '@react-three/drei';
import { type JSX } from 'react';

export function ParkingLotMain(props: JSX.IntrinsicElements['group']) {
	const { scene } = useGLTF(
		'/src/assets/models/parking-lot/parking-lot-main.glb'
	);

	return (
		<group {...props} dispose={null}>
			<primitive object={scene} />
		</group>
	);
}

useGLTF.preload('/src/assets/models/parking-lot/parking-lot-main.glb');

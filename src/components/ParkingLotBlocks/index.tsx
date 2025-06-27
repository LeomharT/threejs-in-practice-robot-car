import { useGLTF } from '@react-three/drei';

export default function ParkingLotBlocks() {
	const { scene } = useGLTF(
		'/src/assets/models/parking-lot/parking-lot-blocks.glb'
	);

	const { scene: scene2 } = useGLTF(
		'/src/assets/models/parking-lot/parking-lot-blocks2.glb'
	);

	return (
		<group>
			<primitive object={scene} />
			<primitive object={scene2} />;
		</group>
	);
}

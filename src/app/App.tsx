import { CameraControls, useCubeTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';
import ParkingLot from '../components/ParkingLot';
import Scenes from '../components/Scenes';

export default function App() {
	const environment = useCubeTexture(
		['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
		{ path: '/src/assets/texture/env/' }
	);

	return (
		<Canvas
			frameloop='always'
			shadows={{ type: PCFSoftShadowMap, enabled: true }}
			gl={{
				alpha: true,
				antialias: true,
				toneMapping: ACESFilmicToneMapping,
			}}
			camera={{ fov: 75, position: [0, 40, -40] }}
			scene={{
				background: environment,
				environment: environment,
			}}
		>
			<Perf position='top-left' />
			<CameraControls
				makeDefault
				maxZoom={5.0}
				minPolarAngle={0}
				maxPolarAngle={Math.PI / 2.25}
			/>
			<axesHelper args={[30]} />
			<Scenes>
				<ParkingLot />
			</Scenes>
		</Canvas>
	);
}

import { CameraControls, useCubeTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { ACESFilmicToneMapping } from 'three';
import Scenes from '../components/Scenes';

export default function App() {
	const environment = useCubeTexture(
		['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
		{ path: '/src/assets/texture/env/' }
	);

	return (
		<Canvas
			frameloop='always'
			gl={{
				alpha: true,
				antialias: true,
				toneMapping: ACESFilmicToneMapping,
			}}
			camera={{ fov: 75 }}
			scene={{
				background: environment,
				environment: environment,
			}}
		>
			<Perf position='top-left' />
			<CameraControls />
			<Scenes>
				<mesh>
					<sphereGeometry args={[1, 32, 32]} />
					<meshStandardMaterial roughness={0} metalness={1} />
				</mesh>
			</Scenes>
		</Canvas>
	);
}

import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';
import CarMap from '../components/CarMap';
import RobotCars from '../components/RobotCar';
import Scenes from '../components/Scenes';

export default function App() {
	return (
		<Canvas
			frameloop='always'
			shadows={{
				type: PCFSoftShadowMap,
				enabled: true,
			}}
			gl={{
				alpha: true,
				antialias: true,
				toneMapping: ACESFilmicToneMapping,
			}}
			camera={{ fov: 75, position: [0, 20, 20] }}
		>
			<Perf position='top-left' />
			<CameraControls
				makeDefault
				minDistance={6.35}
				maxDistance={55.0}
				minPolarAngle={0}
				maxPolarAngle={Math.PI / 2.25}
			/>
			<axesHelper args={[20]} />
			<Scenes>
				<CarMap />
				<RobotCars />
			</Scenes>
		</Canvas>
	);
}

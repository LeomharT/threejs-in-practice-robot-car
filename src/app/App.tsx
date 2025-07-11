import {
	CameraControls,
	KeyboardControls,
	type KeyboardControlsEntry,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { useMemo, useRef } from 'react';
import { ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';
import DrivePath from '../components/DrivePath';
import Lights from '../components/Lights';
import NavigationMesh from '../components/NavigationMesh';
import PathBeginSpot from '../components/PathBeginSpot';
import PickAppleSpot from '../components/PickAppleSpot';
import RobotCars from '../components/RobotCar';
import RosMap from '../components/RosMap';
import Scenes from '../components/Scenes';
import { AppContext, type State } from './contex';
import { _Controls, type Controls } from './keyboard';

export default function App() {
	const map = useMemo<KeyboardControlsEntry<Controls>[]>(
		() => [
			{ name: _Controls.forward, keys: ['ArrowUp', 'KeyW'] },
			{ name: _Controls.back, keys: ['ArrowDown', 'KeyS'] },
			{ name: _Controls.left, keys: ['ArrowLeft', 'KeyA'] },
			{ name: _Controls.right, keys: ['ArrowRight', 'KeyD'] },
			{ name: _Controls.jump, keys: ['Space'] },
			{ name: _Controls.enter, keys: ['Enter'] },
		],
		[]
	);

	const ref = useRef<State>({
		path: null,
		car: null,
		lift: false,
	});

	return (
		<AppContext value={{ state: ref }}>
			<KeyboardControls map={map}>
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
					<Lights />
					<Scenes>
						<DrivePath
							ref={(_ref) => {
								ref.current.path = _ref;
							}}
						/>
						<PathBeginSpot />
						<PickAppleSpot />
						<NavigationMesh />
						<RosMap />
						<RobotCars
							ref={(_ref) => {
								ref.current.car = _ref;
							}}
						/>
					</Scenes>
				</Canvas>
			</KeyboardControls>
		</AppContext>
	);
}

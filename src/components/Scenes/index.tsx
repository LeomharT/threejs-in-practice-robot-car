import { Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useControls } from 'leva';
import React, { useEffect } from 'react';
import {
	ACESFilmicToneMapping,
	AgXToneMapping,
	CineonToneMapping,
	CustomToneMapping,
	LinearToneMapping,
	NeutralToneMapping,
	NoToneMapping,
	PerspectiveCamera,
	ReinhardToneMapping,
} from 'three';

type ScenesProps = {
	children?: React.ReactNode;
};

export default function Scenes(props: ScenesProps) {
	const { camera, gl } = useThree();

	const { toneMapping } = useControls('🎨 Renderer', {
		toneMapping: {
			options: {
				NoToneMapping: NoToneMapping,
				LinearToneMapping: LinearToneMapping,
				ReinhardToneMapping: ReinhardToneMapping,
				CineonToneMapping: CineonToneMapping,
				ACESFilmicToneMapping: ACESFilmicToneMapping,
				CustomToneMapping: CustomToneMapping,
				AgXToneMapping: AgXToneMapping,
				NeutralToneMapping: NeutralToneMapping,
			},
			value: ACESFilmicToneMapping,
		},
	});

	const { environmentIntensity, backgroundBlurriness } = useControls(
		'🏞️ Scene',
		{
			environment: {
				options: [
					'apartment',
					'city',
					'dawn',
					'forest',
					'lobby',
					'night',
					'park',
					'studio',
					'sunset',
					'warehouse',
				],
				value: 'sunset',
			},
			environmentIntensity: {
				min: 0.0,
				max: 5.0,
				step: 0.01,
				value: 1.0,
				label: 'Scene Environment Intensity',
			},
			backgroundBlurriness: {
				min: 0.0,
				max: 1.0,
				step: 0.01,
				value: 1.0,
				label: 'Background Blurriness',
			},
		}
	);

	const { fov } = useControls('🎥 Camera', {
		fov: {
			min: 20,
			max: 90,
			step: 1,
			value: 50,
		},
	});

	const { debug } = useControls('⚛️ Physics', {
		debug: true,
	});

	useEffect(() => {
		gl.toneMapping = toneMapping;
	}, [gl, toneMapping]);

	useEffect(() => {
		if (camera instanceof PerspectiveCamera) {
			camera.fov = fov;
			camera.updateProjectionMatrix();
		}
	}, [camera, fov]);

	return (
		<Physics debug={debug} gravity={[0, -9.81, 0]}>
			<Environment
				background
				files='/src/assets/env/venice_sunset_1k.hdr'
				backgroundBlurriness={backgroundBlurriness}
				environmentIntensity={environmentIntensity}
				// preset={environment as keyof typeof presetsObj}
			/>
			{props.children}
		</Physics>
	);
}

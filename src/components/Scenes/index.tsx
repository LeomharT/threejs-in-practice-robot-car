import { Environment } from '@react-three/drei';
import { presetsObj } from '@react-three/drei/helpers/environment-assets';
import { useThree } from '@react-three/fiber';
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
	ReinhardToneMapping,
} from 'three';

type ScenesProps = {
	children?: React.ReactNode;
};

export default function Scenes(props: ScenesProps) {
	const { scene, gl } = useThree();

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

	const { environment, environmentIntensity, backgroundBlurriness } =
		useControls('🏞️ Scene', {
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
		});

	useEffect(() => {
		scene.environmentIntensity = environmentIntensity;
		gl.toneMapping = toneMapping;
	}, [scene, environmentIntensity, gl, toneMapping]);

	return (
		<>
			<Environment
				background
				backgroundBlurriness={backgroundBlurriness}
				preset={environment as keyof typeof presetsObj}
			/>
			{props.children}
		</>
	);
}

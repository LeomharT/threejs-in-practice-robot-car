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
	children: React.ReactNode;
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

	const { environmentIntensity } = useControls('🏞️ Scene', {
		environmentIntensity: {
			min: 0.0,
			max: 5.0,
			step: 0.01,
			value: 1.0,
			label: 'Scene Environment Intensity',
		},
	});

	useEffect(() => {
		scene.environmentIntensity = environmentIntensity;
		gl.toneMapping = toneMapping;
	}, [scene, environmentIntensity, gl, toneMapping]);

	return <>{props.children}</>;
}

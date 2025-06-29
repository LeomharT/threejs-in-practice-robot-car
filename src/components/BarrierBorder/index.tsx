import { useFrame } from '@react-three/fiber';
import { folder, useControls } from 'leva';
import { useEffect, useRef, type JSX } from 'react';
import { Color, DoubleSide, Uniform } from 'three';
import fragmentShader from './shader/fragment.glsl?raw';
import vertexShader from './shader/vertex.glsl?raw';

type BarrierBorderProps = JSX.IntrinsicElements['group'] & {
	width?: number;
	height?: number;
};

export default function BarrierBorder({
	width = 5,
	height = 10,
	...props
}: BarrierBorderProps) {
	const { uvRotation, color } = useControls('🗺️ Map', {
		'🅿️ Parking Spot': folder({
			uvRotation: {
				value: Math.PI / 8,
				max: Math.PI,
				min: 0,
				step: 0.001,
				label: 'UV Rotation',
			},
			color: {
				value: '#91d5ff',
			},
		}),
	});

	const uniforms = useRef({
		uTime: new Uniform(0.0),
		uRotation: new Uniform(uvRotation),
		uColor: new Uniform(new Color(color)),
	});

	useFrame((_, delta) => {
		uniforms.current.uTime.value += delta;
	});

	useEffect(() => {
		uniforms.current.uRotation.value = uvRotation;
		uniforms.current.uColor.value.set(color);
	}, [uvRotation, color]);

	return (
		<group {...props} dispose={null}>
			<mesh rotation={[0, 0, 0]}>
				<shaderMaterial
					transparent
					side={DoubleSide}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={{
						...uniforms.current,
						uRepeat: new Uniform(width),
					}}
				/>
				<planeGeometry args={[width, 0.5, 16, 16]} />
			</mesh>
			<mesh position={[0, 0, height]} rotation={[0, 0, 0]}>
				<shaderMaterial
					transparent
					side={DoubleSide}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={{
						...uniforms.current,
						uRepeat: new Uniform(width),
					}}
				/>
				<planeGeometry args={[width, 0.5, 16, 16]} />
			</mesh>
			<mesh
				position={[width / 2, 0, height / 2]}
				rotation={[0, Math.PI / 2, 0]}
			>
				<shaderMaterial
					transparent
					side={DoubleSide}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={{
						...uniforms.current,
						uRepeat: new Uniform(height),
					}}
				/>
				<planeGeometry args={[height, 0.5, 16, 16]} />
			</mesh>
			<mesh
				position={[-width / 2, 0, height / 2]}
				rotation={[0, Math.PI / 2, 0]}
			>
				<shaderMaterial
					transparent
					side={DoubleSide}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={{
						...uniforms.current,
						uRepeat: new Uniform(height),
					}}
				/>
				<planeGeometry args={[height, 0.5, 16, 16]} />
			</mesh>
		</group>
	);
}

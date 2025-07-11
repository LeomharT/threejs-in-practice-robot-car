import { Text } from '@react-three/drei';
import { gsap } from 'gsap';
import { useEffect, useState, type JSX } from 'react';
import { suspend } from 'suspend-react';
import { DoubleSide, MeshStandardMaterial, Vector3 } from 'three';
import { useRosMapStore } from '../../hooks/useRosMapStore';
import BarrierBorder from '../BarrierBorder';

const medium = import('@pmndrs/assets/fonts/inter_medium.woff');
const WIDTH = 3.5;
const HEIGHT = 5.5;
const LINE_WIDTH = 0.2;

export default function PathBeginSpot(props: JSX.IntrinsicElements['group']) {
	const [borderPosition, setBorderPosition] = useState(new Vector3(0, 0, -0.3));

	const begin = useRosMapStore((state) => state.begin);

	function beginSpotBarrierUp() {
		gsap
			.to(borderPosition, {
				z: 1.2,
				ease: 'back.out(2)',
				duration: 0.4,
				onUpdate() {
					setBorderPosition(borderPosition.clone());
				},
			})
			.play();
	}

	function beginSpotBarrierDown() {
		gsap
			.to(borderPosition, {
				z: -0.2,
				ease: 'back.in(2)',
				duration: 0.4,
				onUpdate() {
					setBorderPosition(borderPosition.clone());
				},
			})
			.play();
	}

	useEffect(() => {
		if (begin) {
			beginSpotBarrierUp();
		} else {
			beginSpotBarrierDown();
		}
	}, [begin]);

	return (
		<group
			{...props}
			dispose={null}
			position={[7.0, 0.01, 5.1]}
			rotation-x={-Math.PI / 2}
		>
			<BarrierBorder
				position={[0, 0, borderPosition.z]}
				rotation-x={-Math.PI / 2}
				width={WIDTH}
				height={HEIGHT}
			/>
			<Text
				font={(suspend(medium) as any).default}
				fontSize={2.0}
				anchorY='top'
				anchorX='left'
				lineHeight={0.8}
				position={[0.7, 1.9, 0.01]}
				rotation={[0, 0, Math.PI]}
				material-toneMapped={false}
				material={new MeshStandardMaterial()}
			>
				S
			</Text>
			<mesh name='Begin_G' position-y={HEIGHT / 2}>
				<planeGeometry args={[WIDTH, HEIGHT]} />
				<meshStandardMaterial color={0xffffff} transparent opacity={0.0} />
			</mesh>
			<mesh>
				<planeGeometry args={[WIDTH, LINE_WIDTH]} />
				<meshStandardMaterial side={DoubleSide} color={0xffffff} />
			</mesh>
			<mesh
				position={[WIDTH / 2 - LINE_WIDTH / 2, HEIGHT / 2 - LINE_WIDTH / 2, 0]}
				rotation-z={Math.PI / 2}
			>
				<planeGeometry args={[HEIGHT, LINE_WIDTH]} />
				<meshStandardMaterial side={DoubleSide} color={0xffffff} />
			</mesh>
			<mesh position={[0, HEIGHT, 0]}>
				<planeGeometry args={[WIDTH, LINE_WIDTH]} />
				<meshStandardMaterial side={DoubleSide} color={0xffffff} />
			</mesh>
			<mesh
				position={[-WIDTH / 2 + LINE_WIDTH / 2, HEIGHT / 2 + LINE_WIDTH / 2, 0]}
				rotation-z={Math.PI / 2}
			>
				<planeGeometry args={[HEIGHT, LINE_WIDTH]} />
				<meshStandardMaterial side={DoubleSide} color={0xffffff} />
			</mesh>
		</group>
	);
}

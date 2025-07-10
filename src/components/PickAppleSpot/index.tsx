import { Html, Text, useKeyboardControls } from '@react-three/drei';
import type { message } from 'antd';
import { gsap } from 'gsap';
import { useEffect, useRef, useState, type JSX } from 'react';
import { suspend } from 'suspend-react';
import { DoubleSide, MeshStandardMaterial, Vector3 } from 'three';
import { _Controls } from '../../app/keyboard';
import useRosMapStore from '../../hooks/useRosMapStore';
import BarrierBorder from '../BarrierBorder';
import MessageApi from '../MessageApi';
const medium = import('@pmndrs/assets/fonts/inter_medium.woff');
const WIDTH = 2.5;
const HEIGHT = 3.5;
const LINE_WIDTH = 0.2;

export default function PickAppleSpot(props: JSX.IntrinsicElements['group']) {
	const [borderPosition, setBorderPosition] = useState(new Vector3(0, 0, -0.3));

	const messageApi = useRef<typeof message>(null);

	const enterKeyPress = useKeyboardControls((state) => state[_Controls.enter]);

	const [sub, set, get] = useRosMapStore();

	function pickAppleBarrierUp() {
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

	function pickAppleBarrierDown() {
		gsap
			.to(borderPosition, {
				z: -0.3,
				ease: 'back.in(2)',
				duration: 0.4,
				onUpdate() {
					setBorderPosition(borderPosition.clone());
				},
			})
			.play();
	}

	useEffect(() => {
		const KEY = 'APPLE_APCKET';
		const pick = get('pick');

		if (pick && enterKeyPress) {
			messageApi.current?.loading({
				key: KEY,
				content: 'Robot Arm Working...',
				duration: 2000,
			});

			setTimeout(() => {
				messageApi.current?.success({
					key: KEY,
					content: '🎉🎉🎉Success🎉🎉🎉',
				});

				set('fall', true);
			}, 2000);
		}

		const off = sub('pick', (val) => {
			if (val) pickAppleBarrierUp();
			else pickAppleBarrierDown();
		});

		return off;
	}, [enterKeyPress]);

	return (
		<group
			{...props}
			dispose={null}
			position={[-4.4, 0.01, -2.3]}
			rotation-x={-Math.PI / 2}
			rotation-z={-Math.PI / 2}
		>
			<Html center>
				<MessageApi ref={messageApi} />
			</Html>
			<BarrierBorder
				position={[0, 0, borderPosition.z]}
				rotation-x={-Math.PI / 2}
				width={WIDTH}
				height={HEIGHT}
			/>
			<Text
				font={(suspend(medium) as any).default}
				fontSize={0.9}
				anchorY='top'
				anchorX='left'
				lineHeight={0.8}
				position={[-0.45, 1.2, 0.01]}
				rotation={[0, 0, Math.PI / 2]}
				material-toneMapped={false}
				material={new MeshStandardMaterial()}
			>
				🍎
			</Text>
			<mesh name='Pick_G' position-y={HEIGHT / 2}>
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

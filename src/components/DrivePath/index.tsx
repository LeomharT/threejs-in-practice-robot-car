import { useRef, type JSX } from 'react';
const initialPoints = [
	{ x: 1, y: 0, z: -1 },
	{ x: 1, y: 0, z: 1 },
	{ x: -1, y: 0, z: 1 },
	{ x: -1, y: 0, z: -1 },
];
export default function DrivePath(props: JSX.IntrinsicElements['group']) {
	const ref = useRef<typeof props>(null);

	return <group {...props} ref={ref} dispose={null}></group>;
}

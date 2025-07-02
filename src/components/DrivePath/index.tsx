import { useControls } from 'leva';
import { useEffect, useRef, type JSX } from 'react';
import {
	BoxGeometry,
	BufferGeometry,
	CatmullRomCurve3,
	Group,
	LineBasicMaterial,
	LineLoop,
	Mesh,
	MeshBasicMaterial,
	Vector3,
} from 'three';
const initialPoints = [
	{ x: 6, y: 0, z: -8 },
	{ x: 6, y: 0, z: 8 },
	{ x: -6, y: 0, z: 8 },
	{ x: -6, y: 0, z: -8 },
];
export default function DrivePath(props: JSX.IntrinsicElements['group']) {
	const ref = useRef<JSX.IntrinsicElements['group']>(null);

	const { visible } = useControls('🛣️ Path', {
		visible: false,
	});

	useEffect(() => {
		if (!(ref.current instanceof Group)) return;

		const boxGeometry = new BoxGeometry(0.1, 0.1, 0.1);
		const boxMaterial = new MeshBasicMaterial();

		for (const handlePos of initialPoints) {
			const handle = new Mesh(boxGeometry, boxMaterial);
			handle.scale.setScalar(10.0);
			handle.position.copy(handlePos);
			ref.current.add(handle);
		}

		const curve = new CatmullRomCurve3(
			initialPoints.map((item) => new Vector3(item.x, item.y, item.z))
		);
		curve.curveType = 'centripetal';
		curve.closed = true;

		const points = curve.getPoints(50);

		const line = new LineLoop(
			new BufferGeometry().setFromPoints(points),
			new LineBasicMaterial({ color: 0x00ff00 })
		);

		ref.current.add(line);
	}, [visible]);

	return <group {...props} ref={ref} dispose={null} position-y={1.0}></group>;
}

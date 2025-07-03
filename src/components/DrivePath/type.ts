import type { JSX } from 'react';
import type { CatmullRomCurve3 } from 'three';

export type DriveProps = Omit<JSX.IntrinsicElements['group'], 'ref'>;

export type DrivePathRef = {
	visible: boolean;
	curve: CatmullRomCurve3;
};

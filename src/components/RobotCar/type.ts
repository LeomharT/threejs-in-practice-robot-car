import type { RapierRigidBody } from '@react-three/rapier';
import type { JSX, RefObject } from 'react';

export type RobotCarRef = RefObject<RapierRigidBody | null>;

export type RobotCarProps = Omit<JSX.IntrinsicElements['group'], 'ref'>;

import type { RapierRigidBody } from '@react-three/rapier';
import { createContext, type RefObject } from 'react';
import type { DrivePathRef } from '../components/DrivePath/type';

export const actionTypes = ['lift'] as const;

export type State = {
	path: DrivePathRef | null;
	car: RefObject<RapierRigidBody | null> | null;
	lift: boolean;
};

export type AppContextValue = {
	state: RefObject<State>;
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

import type { RapierRigidBody } from '@react-three/rapier';
import { createContext, type ActionDispatch, type RefObject } from 'react';
import type { DrivePathRef } from '../components/DrivePath/type';

export const actionTypes = [
	'parking',
	'begin',
	'lift',
	'pick',
	'fall',
] as const;

export type Action = {
	type: (typeof actionTypes)[number];
	payload?: any;
};

export type State = {
	parking: boolean;
	begin: boolean;
	lift: boolean;
	pick: boolean;
	fall: boolean;
	path: DrivePathRef | null;
	car: RefObject<RapierRigidBody | null> | null;
};

export type AppContextValue = {
	state: RefObject<State>;
	dispatch: ActionDispatch<[action: Action]>;
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

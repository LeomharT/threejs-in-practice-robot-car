import type { RapierRigidBody } from '@react-three/rapier';
import { createContext, type ActionDispatch, type RefObject } from 'react';
import type { DrivePathRef } from '../components/DrivePath/type';
import { createStore } from '../utils/signalStore';

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
	path: DrivePathRef | null;
	car: RefObject<RapierRigidBody | null> | null;
};

export type RosMapStore = {
	parking: boolean;
	begin: boolean;
	lift: boolean;
	pick: boolean;
	fall: boolean;
};

export const rosMapStore = createStore<RosMapStore>({
	parking: false,
	begin: false,
	pick: false,
	lift: false,
	fall: false,
});

export type AppContextValue = {
	state: RefObject<State>;
	dispatch: ActionDispatch<[action: Action]>;
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

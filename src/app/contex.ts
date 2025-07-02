import { createContext, type ActionDispatch, type RefObject } from 'react';

export const actionTypes = ['parking'] as const;

export type Action = {
	type: (typeof actionTypes)[number];
	payload?: any;
};

export type State = {
	parking: boolean;
};

export type AppContextValue = {
	state: RefObject<State>;
	dispatch: ActionDispatch<[action: Action]>;
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

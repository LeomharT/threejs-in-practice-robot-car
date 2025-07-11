import { create } from 'zustand';

type RosMapStore = {
	parking: boolean;
	begin: boolean;
	pick: boolean;
	lift: boolean;
	fall: boolean;
	dispatch: (key: keyof RosMapStore, payload: boolean) => void;
};

export const useRosMapStore = create<RosMapStore>((set) => ({
	parking: false,
	begin: false,
	pick: false,
	lift: false,
	fall: false,
	dispatch: (key: keyof RosMapStore, payload: boolean) => {
		set((state: RosMapStore) => ({ ...state, [key]: payload }));
	},
}));

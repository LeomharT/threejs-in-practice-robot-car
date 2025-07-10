import { rosMapStore, type RosMapStore } from '../app/contex';
import type { Listener } from '../utils/signalStore';

export default function useRosMapStore<K extends keyof RosMapStore>(
	sel: (state: RosMapStore) => RosMapStore[K]
): RosMapStore[K];

export default function useRosMapStore(): [
	<K extends keyof RosMapStore>(
		key: K,
		cb: Listener<RosMapStore[K]>
	) => () => void,
	<K extends keyof RosMapStore>(key: K, val: RosMapStore[K]) => void,
	<K extends keyof RosMapStore>(key: K) => RosMapStore[K]
];

export default function useRosMapStore<K extends keyof RosMapStore>(
	sel?: (state: RosMapStore) => RosMapStore[K]
) {
	const { state, subscribe, set, get } = rosMapStore;

	if (sel) return sel(state);

	return [subscribe, set, get] as const;
}

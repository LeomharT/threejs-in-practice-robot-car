export type Listener<T> = (val: T) => void;

export function createStore<T extends Record<string, any>>(initial: T) {
	const state = { ...initial };

	const listeners: {
		[K in keyof T]?: Set<Listener<T[K]>>;
	} = {};

	const subscribe = <K extends keyof T>(key: K, cb: Listener<T[K]>) => {
		if (!listeners[key]) listeners[key] = new Set();
		listeners[key].add(cb);
		return () => listeners[key]!.delete(cb);
	};

	const set = <K extends keyof T>(key: K, val: T[K]) => {
		if (state[key] !== val) {
			state[key] = val;
			listeners[key]?.forEach((cb) => cb(val));
		}
	};

	const get = <K extends keyof T>(key: K) => state[key];

	return { subscribe, get, set, state };
}

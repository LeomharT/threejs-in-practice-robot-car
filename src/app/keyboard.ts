export const _Controls = {
	forward: 'forward',
	back: 'back',
	left: 'left',
	right: 'right',
	jump: 'jump',
	enter: 'enter',
} as const;

export type Controls = keyof typeof _Controls;

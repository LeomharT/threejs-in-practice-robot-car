declare module '*.glsl' {
	const content: string;
	export default content;
}

declare module 'three-pathfinding' {
	const content: {
		Pathfinding: any;
		PathfindingHelper: any;
	};

	export default content;
}

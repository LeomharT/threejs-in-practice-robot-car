import { useContext } from 'react';
import { AppContext } from '../app/contex';

export default function useScene() {
	const { state } = useContext(AppContext);

	return {
		car: state.current.car,
		path: state.current.path,
	};
}

import { Leva } from 'leva';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './index.css';

const root = createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
	<StrictMode>
		<Leva
			theme={{
				sizes: {
					rootWidth: '380px',
				},
			}}
			titleBar={{ title: 'Debug Params' }}
			hidden={location.hash !== '#debug'}
		/>
		<App />
	</StrictMode>
);

import '@ant-design/v5-patch-for-react-19';
import { App as AntApp, ConfigProvider } from 'antd';
import { Leva } from 'leva';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './index.css';

const root = createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
	<AntApp>
		<ConfigProvider>
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
		</ConfigProvider>
	</AntApp>
);

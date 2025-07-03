import { message } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';

const MessageApi = forwardRef<typeof message>((_: any, ref) => {
	useImperativeHandle(ref, () => message, []);

	return null;
});

export default MessageApi;

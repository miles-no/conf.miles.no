<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import { setContext } from 'svelte';
	import type { IToastContextProps } from './toast-context';
	import type { ToastType } from 'svelte-toasts/types/common';
	import darkTheme from '../../stores/theme-store';

	let type: ToastType = 'success';
	let title: string;
	let description: string;

	const showToast = () => {
		toasts.add({
			title: title,
			description: description,
			duration: 5000, // 0 or negative to avoid auto-remove
			placement: 'bottom-right',
			theme: $darkTheme ? 'dark' : 'light',
			type: type
		});
	};

	const setTitle = (text: string) => {
		title = text;
	};

	const setDescription = (text: string) => {
		description = text;
	};
	const setType = (toastType: ToastType) => {
		type = toastType;
	};

	const createToastBody = (toastType: ToastType, titleText: string, descriptionText: string) => {
		type = toastType;
		title = titleText;
		description = descriptionText;
	};

	const toastContext = {
		showToast,
		setTitle,
		setDescription,
		setType,
		createToastBody
	};

	setContext<IToastContextProps>('toastContext', toastContext);
</script>

<div>
	<slot />
	<ToastContainer let:data>
		<FlatToast {data} />
	</ToastContainer>
</div>

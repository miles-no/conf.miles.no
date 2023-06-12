<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import { setContext } from 'svelte';
	import type { IToastContextProps } from './toast-context';
	import type { ToastType } from 'svelte-toasts/types/common';
	import darkTheme from '../../stores/theme-store';

	let type: ToastType = 'success';
	let title: string;
	let description: string;
    let duration: number = 5000;

	const showToast = () => {
		toasts.add({
			title: title,
			description: description,
			duration: duration,
			placement: 'bottom-right',
			theme: $darkTheme ? 'dark' : 'light',
			type: type
		});
	};

	const setTitle = (text: string) => {
		title = text;
	};

    // 0 or negative to avoid auto-remove
    const setDuration = (ms: number) => {
        duration = ms;
    }

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
        setDuration,
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

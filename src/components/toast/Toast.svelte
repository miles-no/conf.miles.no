<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import { setContext } from 'svelte';
	import type { IToastContextProps } from './toast-context';

	let title: string;
	let description: string;

	const showToast = () => {
		toasts.add({
			title: title,
			description: description,
			duration: 5000, // 0 or negative to avoid auto-remove
			placement: 'bottom-right',
			theme: 'light',
			type: 'success'
		});
	};

	const setTitle = (text: string) => {
		title = text;
	};

	const setDescription = (text: string) => {
		description = text;
	};

	const toastContext = {
		showToast,
		setTitle,
		setDescription
	};

	setContext<IToastContextProps>('toastContext', toastContext);
</script>

<div>
	<slot />
	<ToastContainer let:data>
		<FlatToast {data} />
	</ToastContainer>
</div>

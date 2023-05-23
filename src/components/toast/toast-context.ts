import type { ToastType } from 'svelte-toasts/types/common';

export interface IToastContextProps {
	showToast: () => void;
	setTitle: (text: string) => void;
	setDescription: (text: string) => void;
	setType: (toastType: ToastType) => void;
}

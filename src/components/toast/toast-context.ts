import type { ToastType } from 'svelte-toasts/types/common';

export interface IToastContextProps {
	showToast: () => void;
	setTitle: (text: string) => void;
	setDescription: (text: string) => void;
    setDuration: (ms: number) => void;
	setType: (toastType: ToastType) => void;
	createToastBody: (toastType: ToastType, titleText: string, descriptionText: string) => void;
}

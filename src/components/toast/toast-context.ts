export interface IToastContextProps {
	showToast: () => void;
	setTitle: (text: string) => void;
	setDescription: (text: string) => void;
}

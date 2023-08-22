interface IMenuItems {
	href: string;
	label: string;
}

const menuItems: IMenuItems[] = [
	// Re-add this when event part is finished
	// {
	// 	href: '/',
	// 	label: 'Hva skjer i Miles'
	// },
	{
		href: '/konferanser',
		label: 'Konferanser'
	},
	{
		href: '/logout',
		label: 'Logg ut'
	}
];

export default menuItems;

import { env } from '$env/dynamic/private';

export const prerender = true;
export const ssr = false;
export const csr = true;

export async function load() {
	const officesUrl = 'http://127.0.0.1:3000/api/cvpartner/offices';
	const usersUrl = 'http://conf.miles.no/api/cvpartner/users';
	const responseOffices = await fetch(officesUrl, {
		mode: 'same-origin',
		headers: {
			Authorization: `${env.CONF_API_KEY}`
		}
	});

	const responseUsers = await fetch(usersUrl, {
		mode: 'same-origin',
		headers: {
			Authorization: `${env.CONF_API_KEY}`
		}
	});

	const offices = await responseOffices.json();
	const users = await responseUsers.json();

	const data = {
		offices: offices
		users: users
	};
	return {
		offices: data.offices.offices,
		users: data.users.users,
		text: 'dette er tekst på ansatt side'
	};
}

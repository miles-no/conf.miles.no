// @ts-ignore
import { env } from '$env/dynamic/private';
import { Cv } from '../types/cv';
import { Office } from '../types/office';
import { User } from '../types/user';

export async function fetchUser(email: string): Promise<User> {
	const response: Response = await fetch(`${env.CVPARTNER_BASE}/api/v1/users/find?email=${email}`, {
		method: 'GET',
		mode: 'same-origin',
		headers: {
			Authorization: `Token token=${env.CVPARTNER_API_KEY}`
		}
	});
	const data = await response.json();
	const user: User = {
		id: data.id,
		cvid: '',
		email: data.email,
		name: data.name,
		office: data.office_id,
		profileImage: data.image.url
	};
	return user;
}

export async function fetchUserById(userid: string): Promise<User> {
	const response = await fetch(`${env.CVPARTNER_BASE}/api/v1/users/${userid}`, {
		method: 'GET',
		mode: 'same-origin',
		headers: {
			Authorization: `Token token=${env.CVPARTNER_API_KEY}`
		}
	});
	const data = await response.json();
	const user: User = {
		id: userid,
		name: data.name,
		profileImage: data.image.url,
		cvid: data.default_cv_id,
		email: data.email,
		office: data.office_id
	};
	return user;
}

export async function fetchCv(userid: string, cvid: string): Promise<Cv> {
	const response: Response = await fetch(`${env.CVPARTNER_BASE}/api/v3/cvs/${userid}/${cvid}`, {
		method: 'GET',
		mode: 'same-origin',
		headers: {
			Authorization: `Token token=${env.CVPARTNER_API_KEY}`
		}
	});
	const data = await response.json();
	const ret: Cv = {
		userid: userid,
		cvid: cvid,
		bio: data.key_qualifications[0].long_description.no
	};
	return ret;
}

export async function fetchOffices(): Promise<Office[]> {
	const url = `${env.CVPARTNER_BASE}/api/v1/countries`;
	const response = await fetch(url, {
		mode: 'same-origin',
		headers: {
			Authorization: `Token token=${env.CVPARTNER_API_KEY}`
		}
	});
	const data = await response.json();
	let officesTotal: Office[] = [];
	// @ts-ignore
	data.forEach((element) => {
		// @ts-ignore
		const offices: Office[] = element.offices
			.filter(
				(c) =>
					c.name == 'Bergen' ||
					c.Name == 'Oslo' ||
					c.name == 'Stavanger' ||
					c.name == 'Trondheim' ||
					c.name == 'Ålesund'
			)
			.map((data: any) => {
				return {
					id: data._id,
					name: data.name,
					num_users: data.num_users
				};
			});
		officesTotal = [...officesTotal, ...offices];
	});
	return officesTotal;
}

export async function fetchUsers(officeids: string[]): Promise<User[]> {
	let url: string = `${env.CVPARTNER_BASE}/api/v2/users/search?&office_ids[]=${officeids[0].id}&office_ids[]=${officeids[1].id}&office_ids[]=${officeids[2].id}&office_ids[]=${officeids[3].id}&from=0&size=200`;
	const response: Response = await fetch(url, {
		headers: {
			Authorization: `Token token=${env.CVPARTNER_API_KEY}`
		}
	});
	const data = await response.json();
	console.log(data[0].image);
	const users: User[] = data.map((user: any) => {
		return {
			id: user.user_id,
			email: user.email,
			name: user.name,
			profileImage: user.image.fit_thumb.url,
			office: user.office_name
		};
	});
	return users;
}

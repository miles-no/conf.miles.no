import { env } from '$env/dynamic/private';
import type { CvPartnerSearchParams } from '$lib/types/cvPartnerSearchParams';
import type { Cv } from '../types/cv';
import type { Office } from '../types/office';
import type { User } from '../types/user';

// CV Partner API Docs: https://docs.cvpartner.com/

export async function fetchUser(email: string): Promise<User> {
	try {
		const response: Response = await fetch(
			`${env.CVPARTNER_BASE}/api/v1/users/find?email=${email}`,
			{
				method: 'GET',
				mode: 'same-origin',
				headers: {
					Authorization: `Token token=${env.CVPARTNER_API_KEY}`
				}
			}
		);

		if (response.status === 404) {
			console.error(`GET User from CVPARTNER. User with email ${email} does not exist`);
			return Promise.reject();
		}

		const data = await response.json();
		const user: User = {
			id: data.id,
			cvId: data.default_cv_id,
			email: data.email,
			name: data.name,
			office: data.office_name,
			officeId: data.office_id,
			profileImage: data.image.url,
			isAuthenticated: true,
			title: data.title.no
		};
		return user;
	} catch (error: any) {
		console.error(`GET User from CVPARTNER failed for ${email}. ${error}`);
		throw new Error(`GET User from CVPARTNER failed for ${email}`);
	}
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
		id: data.id,
		cvId: data.default_cv_id,
		email: data.email,
		name: data.name,
		office: data.office_name,
		officeId: data.office_id,
		profileImage: data.image.url,
		isAuthenticated: true,
		title: data.title.no
	};
	return user;
}

export async function fetchCvByEmail(email: string) {
	const user = await fetchUser(email);
	return await fetchCv(user.id, user.cvId);
}

export async function fetchCv(userId: string, cvId: string): Promise<Cv> {
	const response: Response = await fetch(`${env.CVPARTNER_BASE}/api/v3/cvs/${userId}/${cvId}`, {
		method: 'GET',
		mode: 'same-origin',
		headers: {
			Authorization: `Token token=${env.CVPARTNER_API_KEY}`
		}
	});
	const data = await response.json();
	const ret: Cv = {
		userid: userId,
		cvid: cvId,
		bio: data.key_qualifications[0].long_description.no,
		title: data.title.no,
		name: data.name,
		profileImage: data.image.url
	};
	return ret;
}

export async function search(searchParams: CvPartnerSearchParams) {
	const url = `${env.CVPARTNER_BASE}/api/v2/users/search?${getQueryString(searchParams)}`;
	const response = await fetch(url, {
		mode: 'same-origin',
		headers: {
			Authorization: `Token token=${env.CVPARTNER_API_KEY}`
		},
	});
	return response.json();
}

function getQueryString(searchParams: CvPartnerSearchParams): string {
  if (!searchParams) return '';

  const queryString = Object.entries(searchParams)
    .filter(([_, value]) => value !== undefined && value !== null && value.toString().trim() !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`)
    .join('&');

  return queryString || '';
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
				(c:{name?:string}) =>
					c.name == 'Bergen' ||
					c.name == 'Oslo' ||
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

export async function fetchUsers(officeids: {id:string}[]): Promise<User[]> {
	let url: string = `${env.CVPARTNER_BASE}/api/v2/users/search?&office_ids[]=${officeids[0].id}&office_ids[]=${officeids[1].id}&office_ids[]=${officeids[2].id}&office_ids[]=${officeids[3].id}&office_ids[]=${officeids[4].id}&from=0&size=200`;
	const response: Response = await fetch(url, {
		headers: {
			Authorization: `Token token=${env.CVPARTNER_API_KEY}`
		}
	});
	const data = await response.json();
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





export type BasicUser = {
    id: number|string,
    name: string,
    email: string|undefined
};
type UserWithOffice = BasicUser & {
    office: string
}
export type UsersByOffice = {
    [officeName:string]: BasicUser[]
}
type CrudeUsersByOfficeCache = {
    timestamp:number,
    usersByOffice: UsersByOffice
}

// See issue #39
let crudeUsersByOfficeCache:CrudeUsersByOfficeCache = {
    timestamp: 0,
    usersByOffice: {}
}

const ONE_DAY = 1000 * 3600 * 24;

export async function fetchAllUsersCached(): Promise<UsersByOffice> {
    const now = Date.now();
    if (now - crudeUsersByOfficeCache.timestamp > ONE_DAY) {
        console.log("Fetching all users from all offices...");
        const offices = await fetchOffices();
        const officeIds = offices.map(office => ({id: office.id + ""}));
        const users: UserWithOffice[] = await fetchUsers(officeIds);
        const usersByOffice:UsersByOffice = {};
        users.forEach(user => {
            if (!usersByOffice[user.office]) {
                usersByOffice[user.office] = [];
            }
            usersByOffice[user.office].push({
                id: user.id,
                name: user.name,
                email: user.email
            });
        });
        crudeUsersByOfficeCache.usersByOffice = usersByOffice;
        crudeUsersByOfficeCache.timestamp = now;
        console.log("...ok, cached for 24 hours:", users.length, "users.");
    }
    return crudeUsersByOfficeCache.usersByOffice;
}

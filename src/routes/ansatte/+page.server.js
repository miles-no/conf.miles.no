import { CONF_API_KEY } from '$env/static/private';

export const prerender = true;
export const ssr = false;
export const csr = true;

export async function load() {
    const officesUrl = 'http://127.0.0.1:3000/api/cvpartner/offices';
    const usersUrl = 'http://127.0.0.1:3000/api/cvpartner/users';
    const responseOffices = await fetch(officesUrl,{
        mode: 'same-origin',
        headers: {
            'Authorization': `${CONF_API_KEY}`
        }
        });
    const responseUsers = await fetch(usersUrl, {
        mode: 'same-origin',
        headers: {
            'Authorization': `${CONF_API_KEY}`
        }
        });
    const data = {
        offices: await responseOffices.json(),
        users: await responseUsers.json()
    }
    return {
        offices: data.offices.offices,
        users: data.users.users
    };
}
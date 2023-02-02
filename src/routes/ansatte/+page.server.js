export async function load() {
    const officesUrl = 'http://127.0.0.1:3000/api/cvpartner/offices';
    const usersUrl = 'http://127.0.0.1:3000/api/cvpartner/users';
    const responseOffices = await fetch(officesUrl);
    const responseUsers = await fetch(usersUrl);
    const data = {
        offices: await responseOffices.json(),
        users: await responseUsers.json()
    }
    return {
        offices: data.offices.offices,
        users: data.users.users
    };
}
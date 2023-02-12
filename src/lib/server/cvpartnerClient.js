import { env } from '$env/dynamic/private';

export async function fetchUser(email) {
    const response = await fetch(`${env.CVPARTNER_BASE}/api/v1/users/find?email=${email}`, {
        method: 'GET',
        mode: 'same-origin',
        headers: {
            'Authorization': `Token token=${env.CVPARTNER_API_KEY}`
        }
    });
    const data = await response.json();
    return {
        userid: data.id,
        officeid: data.office_id,
        image: data.image.url
    }
}

export async function fetchUserById(userid) {
  const response = await fetch(`${env.CVPARTNER_BASE}/api/v1/users/${userid}`, {
      method: 'GET',
      mode: 'same-origin',
      headers: {
          'Authorization': `Token token=${env.CVPARTNER_API_KEY}`
      }
  });
  const data = await response.json();
  return {
    userid: userid,
    name: data.name,
    image: data.image.url,
    cvid: data.default_cv_id
  }
}

export async function fetchCv(userid, cvid) {
  const response = await fetch(`${env.CVPARTNER_BASE}/api/v3/cvs/${userid}/${cvid}`, {
    method: 'GET',
      mode: 'same-origin',
      headers: {
          'Authorization': `Token token=${env.CVPARTNER_API_KEY}`
      }
  });
  const data = await response.json();
  return {
    bio: data.key_qualifications[0].long_description.no
  }
}

export async function fetchOffices() {
  const url = `${env.CVPARTNER_BASE}/api/v1/countries`;
  const response = await fetch(url, {
  mode: 'same-origin',
  headers: {
      'Authorization': `Token token=${env.CVPARTNER_API_KEY}`
  }
  });
  const data = await response.json();
  let officesTotal = [];
  data.forEach(element => {
      const offices = element.offices.filter(c => c.name == 'Bergen' || c.Name == 'Oslo' || c.name == 'Stavanger' || c.name == 'Trondheim' || c.name == 'Ålesund').map((data) => {
          return {
              id: data._id,
              name: data.name,
              num_users: data.num_users
          }
      });
      officesTotal = [...officesTotal,...offices];
  });
  return officesTotal;
}

export async function fetchUsers(officeid) {
  let url = `${env.CVPARTNER_BASE}/api/v3/search?&office_ids[]=${officeid}&from=0&size=200`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Token token=${env.CVPARTNER_API_KEY}`
    }
  });
  const data = await response.json();
  const users = data.cvs.map((cvusers) => {
    return {
      id: cvusers.cv.user_id,
      email: cvusers.cv.email,
      name: cvusers.cv.name,
      profileImage: cvusers.cv.image.url,
      office: cvusers.cv.office_name
    }
  });
  return users;
}
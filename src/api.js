let ACCESS_TOKEN = null;

export const setTokenToApi = token => {
  console.log('setTokenToApi', token);
  ACCESS_TOKEN = token;
};

function request(url) {
  console.log('request', url);
  if (ACCESS_TOKEN === null) return Promise.reject('Отсутствует access_token src/api.js');

  return fetch(`${url}?access_token=${ACCESS_TOKEN}`, {
    method: 'GET',
    mode: 'cors',
  }).then(response => response.json());
}

export const getUserInformation = login => request(`https://api.github.com/users/${login}`);

export const getUserFollowers = login =>
  request(`https://api.github.com/users/${login}/followers?pages=1&per_page=100`);

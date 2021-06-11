import axios from 'axios';

const LOGIN_API_URL = 'http://localhost:8080/api/login';
//const USERS_API_URL = 'http://localhost:8080/api/users';

window.token = '';

export const login = async (id, pw) => {
  let info = { username: id, password: pw };
  window.token = (await axios.post(LOGIN_API_URL, info)).data;
  console.log('LOGIN TOKEN:', window.token);
  getUsers(window.token);
  return window.token;
};

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 1000,
  headers: { Authorization: 'Bearer ' + window.token }
});

export const getUsers = async () => {
  console.log('getUsers token:', window.token);

  let userInfo = await instance.get('/users/metehan.danaci').then(response => {
    console.log('response', response);
  });
  console.log('User info: ', userInfo);
  console.log('get users is done!');
  return userInfo;
};

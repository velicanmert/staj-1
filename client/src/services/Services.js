import axios from 'axios';

const LOGIN_API_URL = 'http://localhost:8080/api/login';
//const USERS_API_URL = 'http://localhost:8080/api/users';

export const login = async (id, pw) => {
  let info = { username: id, password: pw };
  let token = (await axios.post(LOGIN_API_URL, info)).data;
  localStorage.setItem('token', token);
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
};

export const getUsers = async () => {
  let userInfo = (
    await axios.get('http://localhost:8080/api/users/metehan.danaci')
  ).data;
  return userInfo;
};

export const editUser = async () => {
  await axios.put('http://localhost:8080/api/users/metehan.danaci/edit', {
    birth_date: '01 - 01 - 0101',
    identification_no: '111111111'
  });
};

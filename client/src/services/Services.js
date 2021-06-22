import axios from 'axios';

const LOGIN_API_URL = 'http://localhost:8080/api/login';
const REGISTER_API_URL = 'http://localhost:8080/api/register';
const LEAVE_FORM_API_URL = 'http://localhost:8080/api/leaveform';
//const USERS_API_URL = 'http://localhost:8080/api/users';

export const login = async (id, pw) => {
  let info = { username: id, password: pw };
  let token = (await axios.post(LOGIN_API_URL, info)).data;
  localStorage.setItem('token', token);
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  return token;
};

export const register = async (id, pw, bdate, idno) => {
  let info = {
    username: id,
    password: pw,
    birth_date: bdate,
    identification_no: idno
  };
  await axios.post(REGISTER_API_URL, info);
};

export const leave = async (id, date, count, type, reason) => {
  let info = {
    username: id,
    date: date,
    type: type,
    reason: reason,
    count: count
  };
  await axios.post(LEAVE_FORM_API_URL, info);
};

export const getUsers = async () => {
  let userInfo = (
    await axios.get(
      `http://localhost:8080/api/users/${localStorage.getItem('username')}`
    )
  ).data;
  return userInfo;
};

export const editUser = async (bd, idno) => {
  await axios.put(
    `http://localhost:8080/api/users/${localStorage.getItem('username')}/edit`,
    {
      birth_date: bd,
      identification_no: idno
    }
  );
};

// Admin login and related functions will be added

// To be used for displaying user's forms
export const showForms = async username => {
  let forms = (await axios.get(`${LEAVE_FORM_API_URL}/${username}/forms`)).data;
  return forms;
};

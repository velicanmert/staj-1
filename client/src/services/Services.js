import axios from 'axios';

const LOGIN_API_URL = 'http://localhost:8080/api/login';
const USERS_API_URL = 'http://localhost:8080/api/users';

class Services {
  async login(id, pw) {
    console.log('login');
    let info = { username: id, password: pw };
    let token = await axios.post(LOGIN_API_URL, info);
    console.log(token.data);
    console.log('login 2');
  }

  getUsers() {
    console.log('getUsers');
    let a = JSON.stringify(
      axios.get('http://localhost:8080/api/users/metehan.danaci')
    );
    console.log(a);
  }
}

export default new Services();

import axios from 'axios';
import authHeader from './auth-header';

class AuthService {
  async login(email, password, remember) {
    this.setToLocalStorage('user', { 
      email: 'ghaninf@gmail.com'
     })
    // return axios
    //   .post(`${process.env.API}/account/login`, {
    //     email,
    //     password
    //   })
    //   .then(response => {
    //     if (response.data) {
    //       this.setToLocalStorage('user', response.data);
    //       if (remember) {
    //         this.setToLocalStorage('email', { 'email': email });
    //       } else {
    //         this.removeLocalStorage('email');
    //       }
    //     }
    //     return response.data;
    //   })
    //   .catch(error => {
    //     throw error;
    //   })
  }
  
  async logout() {
    return this.removeLocalStorage('user');
    // return axios
    //   .post(`${process.env.API}/account/logout`, {
    //     headers: authHeader()
    //   })
    //   .then(response => {
    //     if (response.status >= 200 && response.status < 300) {
    //       return this.removeLocalStorage('user')
    //     }
    //   })
    //   .catch(error => {
    //     throw error
    //   })
  }

  setToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeLocalStorage(key) {
    localStorage.removeItem(key);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getLoginEmail() {
    return JSON.parse(localStorage.getItem('email'));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
class AuthService {
  async login(email, password) {
    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (data.token) {
          this.setToLocalStorage('user', data)
        }
      })
      .catch(error => {
        throw error
      })
  }
  
  logout() {
    this.removeLocalStorage('user')
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
import authHeader from "./auth-header";

class ProductService {
  async getList() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/list`, requestOptions)
      .then(res => {
        return res.data
      })
      .catch(error => {
        throw error
      })
  }

  

  async getDetail(id) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/detail/${id}`, requestOptions)
      .then(res => {
        return res.data
      })
      .catch(error => {
        throw error
      })
  }

  async create(data) {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': authHeader()
      },
      body: JSON.stringify(data),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/create`, requestOptions)
      .then(res => {
        this.setToLocalStorage('user', res)
      })
      .catch(error => {
        throw error
      })
  }

  async update(id, data) {
    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': authHeader()
      },
      body: JSON.stringify(data),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/update/${id}`, requestOptions)
      .then(res => {
        return res.data
      })
      .catch(error => {
        throw error
      })
  }

  async delete(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': authHeader()
      },
      body: JSON.stringify(data),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/delete${id}`, requestOptions)
      .then(res => {
        return res.data
      })
      .catch(error => {
        throw error
      })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();
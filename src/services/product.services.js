import axios from "axios";
import authHeader from "./auth-header";

class ProductService {
  async getList() {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/product/list`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error
      })
  }

  async getDetail(id) {
    const URL = `${process.env.REACT_APP_API_URL}/product/:id`.replace(':id', id)
    return axios
      .get(URL)
      .then(response => {
        return response.data
      })
      .catch(error => {
        throw error
      })
  }

  async create(data) {
    console.log(data)
    return axios
      .post(
        `${process.env.REACT_APP_API_URL}/product/create`,
        data,
        {
          headers: authHeader(),
        }
      )
      .then(response => {
        return response
      })
      .catch(error => {
        throw error
      })
  }

  async delete(id) {
    return axios
      .delete(
        `${process.env.REACT_APP_API_URL}/product/delete/${id}`,
        { 
          headers: authHeader(),
        }
      )
      .then(response => {
        return response
      })
      .catch(error => {
        throw error
      })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();
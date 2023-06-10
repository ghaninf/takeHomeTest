import axios from "axios";
import authHeader from "./auth-header";

class ProductService {
  async getList() {
    return axios
      .get(`${process.env.API}/product/list`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error
      })
  }

  async getDetail(id) {
    const URL = `${process.env.API}/product/:id`.replace(':id', id)
    return axios
      .get(URL)
      .then(response => {
        return response
      })
      .catch(error => {
        throw error
      })
  }

  async create(data) {
    return axios
      .post(
        `${process.env.API}/create`,
        {
          headers: authHeader(),
          data: data
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
        `${process.env.API}/product/:id`,
        { 
          headers: authHeader(),
          data: id
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
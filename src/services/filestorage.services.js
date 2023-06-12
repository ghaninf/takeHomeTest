import axios from 'axios'
import authHeader from './auth-header'

class FileService {
  async uploadSingle(formData) {
    return axios
      .post(
        `${process.env.API}/file/uploadSingle`,
        formData,
        { headers: authHeader() },
      )
      .then(response => {
        return response.data
      })
      .catch(error => {
        throw error
      })
  }

  async get(filename) {
    const url = `${process.env.API}/load/${filename}`
    return axios
      .get(url, {
        header: authHeader()
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        throw error
      })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new FileService()
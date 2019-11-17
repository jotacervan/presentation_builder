import axios from 'axios';

const csrfToken = document.querySelector("meta[name=csrf-token]").content;
const instance = axios.create({
  baseUrl: 'http://localhost:3000/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  }
})

export default instance;

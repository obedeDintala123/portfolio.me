import axios from 'axios'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
  baseURL: import.meta.env.VITE_API_URL!,
})

export { api }

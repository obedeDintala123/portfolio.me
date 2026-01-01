import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { api } from './api'

export const useRepos = () => {
  return useQuery<Array<any>>({
    queryKey: ['repos'],
    queryFn: async () => {
      const { data } = await api.get('/repos')
      return data
    },
  })
}

export async function getReadme(owner: string, repo: string) {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
    {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    },
  )

  return response.data
}

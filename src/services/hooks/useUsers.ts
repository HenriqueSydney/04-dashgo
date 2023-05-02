import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { api } from '../api'

type Users = {
  id: string
  name: string
  email: string
  created_at: string
}

type GetUsersResponse = {
  totalCount: number
  users: Users[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map((user: Users) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return { users, totalCount }
}

export function useUsers(page: number, options?: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,
    ...options,
  }) as UseQueryResult<GetUsersResponse, unknown>
}

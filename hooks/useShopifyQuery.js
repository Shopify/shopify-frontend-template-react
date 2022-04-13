import { getSessionToken } from '@shopify/app-bridge-utils'
import { useAppBridge } from '@shopify/app-bridge-react'
import { useQuery } from 'react-query'
import { request } from 'graphql-request'

export const useShopifyQuery = (key, query) => {
  const app = useAppBridge()

  return useQuery(key, async (variables) => {
    const sessionToken = await getSessionToken(app)
    const headers = new Headers({})

    headers.append('Authorization', `Bearer ${sessionToken}`)
    headers.append('X-Requested-With', 'XMLHttpRequest')
    const response = await request('/api/graphql', query, variables, headers)
    return response
  })
}

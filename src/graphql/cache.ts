import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = { edges: [], pageInfo: {} }, incoming) {
            const mergedEdges = [...existing.edges, ...incoming.edges]
            return {
              ...incoming,
              edges: mergedEdges
            }
          }
        }
      }
    }
  }
})

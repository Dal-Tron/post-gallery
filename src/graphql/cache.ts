import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = {}, incoming) {
            const { edges: existingEdges = [] } = existing
            const {
              edges: incomingEdges = [],
              pageInfo: incomingPageInfo = {}
            } = incoming

            return {
              ...incoming,
              edges: [...existingEdges, ...incomingEdges],
              pageInfo: incomingPageInfo
            }
          }
        }
      }
    }
  }
})

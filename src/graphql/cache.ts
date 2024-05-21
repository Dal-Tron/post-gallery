import { InMemoryCache } from '@apollo/client'

export const graphqlCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(
            existing = { nodes: [] },
            incoming = { nodes: [] },
            // @ts-expect-error args offset is not set on Record<string, any>
            { args: { offset = 0 } }
          ) {
            const merged = existing.nodes ? existing.nodes.slice(0) : []
            for (let i = 0; i < incoming.nodes.length; ++i) {
              merged[offset + i] = incoming.nodes[i]
            }
            return {
              ...incoming,
              nodes: merged
            }
          }
        }
      }
    }
  }
})

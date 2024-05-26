import { InMemoryCache, Reference, StoreObject } from '@apollo/client'

interface PostNode extends StoreObject {
  __ref: string
}

interface PostEdge {
  __typename: string
  node: PostNode | Reference
}

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = { edges: [], pageInfo: {} }, incoming) {
            const existingEdges = existing.edges || []
            const incomingEdges = incoming.edges || []

            const edgeMap = new Map<string, PostEdge>()

            existingEdges.forEach((edge: PostEdge) => {
              edgeMap.set(edge.node.__ref, edge)
            })

            incomingEdges.forEach((edge: PostEdge) => {
              edgeMap.set(edge.node.__ref, edge)
            })

            const mergedEdges = Array.from(edgeMap.values())

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

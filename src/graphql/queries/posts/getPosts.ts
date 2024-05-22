import * as pkg from '@apollo/client'
const { gql } = pkg

export const GET_POSTS = gql`
  query GetPosts(
    $after: String
    $filterBy: [PostListFilterByInput!]
    $limit: Int!
    $offset: Int
    $orderByString: String
    $reverse: Boolean
    $spaceIds: [ID!]
  ) {
    posts(
      after: $after
      filterBy: $filterBy
      limit: $limit
      offset: $offset
      orderByString: $orderByString
      reverse: $reverse
      spaceIds: $spaceIds
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          reactionsCount
          fields {
            key
            value
            relationEntities {
              medias {
                ... on Image {
                  urls {
                    medium
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

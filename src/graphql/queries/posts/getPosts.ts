import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts(
    $filterBy: [PostListFilterByInput!]
    $limit: Int!
    $offset: Int
    $orderByString: String
    $reverse: Boolean
    $spaceIds: [ID!]
  ) {
    posts(
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
      }
      nodes {
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
`

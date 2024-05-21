import { gql } from '@apollo/client'

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      textContent
      reactionsCount
      thumbnail {
        ... on Image {
          url
          urls {
            large
            medium
            small
          }
        }
      }
    }
  }
`

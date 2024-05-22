import * as pkg from '@apollo/client'
const { gql } = pkg

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      textContent
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
`

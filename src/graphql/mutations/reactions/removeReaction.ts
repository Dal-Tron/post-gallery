import { gql } from '@apollo/client'

export const REMOVE_REACTION = gql`
  mutation RemoveReaction($postId: ID!, $reaction: String!) {
    removeReaction(postId: $postId, reaction: $reaction) {
      status
    }
  }
`

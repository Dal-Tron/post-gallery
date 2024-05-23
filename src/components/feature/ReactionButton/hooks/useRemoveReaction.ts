import { useMutation } from '@apollo/client'
import {
  RemoveReactionMutation,
  RemoveReactionMutationVariables
} from '@/graphql/generated/types'
import { REMOVE_REACTION } from '../mutations/removeReaction'

const useRemoveReaction = () => {
  const [mutation] = useMutation<
    RemoveReactionMutation,
    RemoveReactionMutationVariables
  >(REMOVE_REACTION)

  const removeReaction = (postId: string, reaction: string) => {
    mutation({
      variables: { postId, reaction }
    })
  }

  return { removeReaction }
}

export default useRemoveReaction

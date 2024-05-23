import { useMutation } from '@apollo/client'
import { ADD_REACTION } from '@/graphql/mutations/reactions/addReaction'
import {
  AddReactionMutation,
  AddReactionMutationVariables
} from '@/graphql/generated/types'

const useAddReaction = () => {
  const [mutation] = useMutation<
    AddReactionMutation,
    AddReactionMutationVariables
  >(ADD_REACTION)

  const addReaction = (postId: string, reaction: string) => {
    mutation({
      variables: { input: { reaction }, postId }
    })
  }

  return { addReaction }
}

export default useAddReaction

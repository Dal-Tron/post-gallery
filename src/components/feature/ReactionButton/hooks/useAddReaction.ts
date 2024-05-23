import { useMutation } from '@apollo/client'
import { ADD_REACTION } from '@/components/feature/ReactionButton/mutations/addReaction'
import {
  ActionStatus,
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
      variables: { input: { reaction }, postId },
      optimisticResponse: {
        addReaction: {
          status: ActionStatus.Succeeded
        }
      }
    })
  }

  return { addReaction }
}

export default useAddReaction

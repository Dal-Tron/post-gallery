import { useMutation } from '@apollo/client'
import {
  RemoveReactionMutation,
  RemoveReactionMutationVariables
} from '@/graphql/generated/types'
import { REMOVE_REACTION } from '@/graphql/mutations/reactions/removeReaction'
import { POST_FRAGMENT } from '@/graphql/queries/posts'

const useRemoveReaction = () => {
  const [mutation] = useMutation<
    RemoveReactionMutation,
    RemoveReactionMutationVariables
  >(REMOVE_REACTION)

  const removeReaction = (postId: string, reaction: string) => {
    mutation({
      variables: { postId, reaction },
      update: (cache, { data }) => {
        if (!data) return

        const postIdCache = `Post:${postId}`
        const existingPost = cache.readFragment<{
          id: string
          reactionsCount: number
        }>({
          id: postIdCache,
          fragment: POST_FRAGMENT
        })

        if (!existingPost) return

        const updatedReactionsCount =
          existingPost.reactionsCount > 0 ? existingPost.reactionsCount - 1 : 0

        cache.writeFragment({
          id: postIdCache,
          fragment: POST_FRAGMENT,
          data: {
            id: postId,
            reactionsCount: updatedReactionsCount
          }
        })
      }
    })
  }

  return { removeReaction }
}

export default useRemoveReaction

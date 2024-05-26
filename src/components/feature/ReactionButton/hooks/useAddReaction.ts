import { useMutation } from '@apollo/client'
import { ADD_REACTION } from '@/graphql/mutations/reactions/addReaction'
import {
  AddReactionMutation,
  AddReactionMutationVariables
} from '@/graphql/generated/types'
import { POST_FRAGMENT } from '@/graphql/queries/posts'

const useAddReaction = () => {
  const [mutation] = useMutation<
    AddReactionMutation,
    AddReactionMutationVariables
  >(ADD_REACTION)

  const addReaction = (postId: string, reaction: string) => {
    mutation({
      variables: { input: { reaction }, postId },
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

        const updatedReactionsCount = existingPost.reactionsCount + 1

        cache.writeFragment({
          id: postIdCache,
          fragment: POST_FRAGMENT,
          data: {
            id: postId,
            reactionsCount: updatedReactionsCount
          }
        })
      },
      onError: (error) => {
        if (
          error.graphQLErrors.some(
            (e) => e.message === 'You already reacted to this post.'
          )
        ) {
          // TODO: Notify the user
          console.error('You have already reacted to this post.')
        }
      }
    })
  }

  return { addReaction }
}

export default useAddReaction

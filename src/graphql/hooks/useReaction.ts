import { useMutation } from '@apollo/client'
import { GET_POSTS } from '@/graphql/queries/posts/getPosts'
import { ADD_REACTION } from '@/graphql/mutations/reactions/addReaction'
import {
  GetPostsQuery,
  AddReactionMutation,
  AddReactionMutationVariables,
  ActionStatus
} from '@/graphql/generated/types'

const useReaction = () => {
  const [mutation] = useMutation<
    AddReactionMutation,
    AddReactionMutationVariables
  >(ADD_REACTION)

  const addReaction = (postId: string, reaction: string) => {
    mutation({
      variables: { input: { reaction }, postId },
      optimisticResponse: {
        addReaction: {
          __typename: 'Action',
          status: ActionStatus.Succeeded
        }
      },
      update: (cache, { data }) => {
        const existingPostsData = cache.readQuery<GetPostsQuery>({
          query: GET_POSTS
        })

        if (existingPostsData && data) {
          const updatedPostsEdges = existingPostsData.posts?.edges?.map(
            ({ node }) =>
              node.id === postId
                ? {
                    node: {
                      ...node,
                      reactionsCount: (node.reactionsCount || 0) + 1
                    }
                  }
                : { node }
          )

          cache.writeQuery<GetPostsQuery>({
            query: GET_POSTS,
            data: {
              ...existingPostsData,
              posts: {
                ...existingPostsData.posts,
                edges: [...(updatedPostsEdges || [])]
              }
            }
          })
        }
      }
    })
  }

  return { addReaction }
}

export default useReaction

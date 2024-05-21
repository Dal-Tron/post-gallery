import { useMutation } from '@apollo/client'
import { GET_POSTS } from '@/graphql/queries/posts/getPosts'
import { ADD_REACTION } from '@/graphql/mutations/reactions/addReaction'
import { graphQLVariables } from '@/constants/graphql'
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
        const existingPosts = cache.readQuery<GetPostsQuery>({
          query: GET_POSTS,
          variables: {
            ...graphQLVariables,
            offset: 0
          }
        })

        if (existingPosts && data) {
          const updatedPosts = existingPosts.posts.nodes?.map((post) =>
            post.id === postId
              ? { ...post, reactionsCount: (post.reactionsCount || 0) + 1 }
              : post
          )

          cache.writeQuery<GetPostsQuery>({
            query: GET_POSTS,
            variables: {
              ...graphQLVariables,
              offset: 0
            },
            data: {
              ...existingPosts,
              posts: {
                ...existingPosts.posts,
                nodes: updatedPosts
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

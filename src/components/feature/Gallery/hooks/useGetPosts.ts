import { useQuery } from '@apollo/client'
import {
  CustomField,
  GetPostsQuery,
  GetPostsQueryVariables
} from '@/graphql/generated/types'
import { GRAPHQL_VARIABLES } from '@/constants/graphql'
import { GET_POSTS } from '@/graphql/queries/posts/getPosts'
import { getImageUrls } from '../utils/getImageUrls'

export interface IPost {
  id: string
  title: string
  description: string
  reactionsCount: number
  urls: {
    medium?: string
  }
}

export const useGetPosts = () => {
  const { data, loading, error, fetchMore } = useQuery<
    GetPostsQuery,
    GetPostsQueryVariables
  >(GET_POSTS, {
    variables: {
      ...GRAPHQL_VARIABLES,
      after: ''
    }
  })

  const posts: IPost[] =
    data?.posts?.edges?.map(({ node }) => {
      return {
        id: node.id || '',
        title: node.title || '',
        description: node.description || '',
        reactionsCount: node.reactionsCount,
        urls: getImageUrls(node.fields as CustomField[])
      }
    }) || []

  const hasNextPage = data?.posts?.pageInfo?.hasNextPage

  const endCursor = data?.posts?.pageInfo?.endCursor

  return { posts, loading, error, fetchMore, hasNextPage, endCursor }
}

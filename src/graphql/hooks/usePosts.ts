import { useQuery } from '@apollo/client'
import {
  GetPostsQuery,
  GetPostsQueryVariables,
  Image
} from '@/graphql/generated/types'
import { GET_POSTS } from '@/graphql/queries/posts/getPosts'
import { graphQLVariables } from '@/constants/graphql'

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
      ...graphQLVariables
    }
  })

  const posts: IPost[] =
    data?.posts?.nodes?.map((node) => {
      let urls = {}
      if (node.fields) {
        for (const field of node.fields) {
          if (field.key === 'cover_image' && field.relationEntities?.medias) {
            const image = field.relationEntities.medias.find(
              (media) => media.__typename === 'Image'
            ) as Image
            if (image) {
              urls = image.urls || {}
            }
          }
        }
      }

      return {
        id: node.id || '',
        title: node.title || '',
        description: node.description || '',
        reactionsCount: node.reactionsCount,
        urls
      }
    }) || []

  const hasNextPage = data?.posts?.pageInfo?.hasNextPage

  return { posts, loading, error, fetchMore, hasNextPage }
}

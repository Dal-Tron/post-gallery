import {
  CustomField,
  GetPostQuery,
  GetPostQueryVariables
} from '@/graphql/generated/types'
import { useQuery } from '@apollo/client'
import { getImageUrls } from '@/components/feature/Gallery/utils/getImageUrls'
import { GET_POST } from '@/graphql/queries/posts/getPost'

export const useGetPost = (id: string) => {
  const { data, loading, error } = useQuery<
    GetPostQuery,
    GetPostQueryVariables
  >(GET_POST, {
    variables: { id }
  })

  const post = {
    description: data?.post?.description || '',
    id: data?.post?.id || '',
    reactionsCount: data?.post?.reactionsCount || 0,
    textContent: data?.post?.textContent || '',
    title: data?.post?.title || '',
    urls: getImageUrls(data?.post?.fields as CustomField[])
  }

  return {
    post,
    loading,
    error
  }
}

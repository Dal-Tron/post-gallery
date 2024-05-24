import React from 'react'
import { useParams } from 'react-router-dom'
import ReactionButton from '@/components/feature/ReactionButton'

import { useGetPost } from './hooks/useGetPost'
import { BounceLoading } from '@/components/base/BounceLoading'

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { post, loading, error } = useGetPost(id!)

  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="mx-auto h-full max-w-[900px] p-4">
      {loading && (
        <div className="flex h-full items-center justify-center">
          <BounceLoading />
        </div>
      )}
      {!loading && !error && post && (
        <>
          {post.urls && (
            <img
              src={post.urls.medium}
              alt={post.title}
              className="mb-4 h-96 w-full rounded object-cover"
            />
          )}
          <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
          <p className="mb-4">{post.textContent}</p>
          <ReactionButton reactionsCount={post.reactionsCount} id={id} />
        </>
      )}
    </div>
  )
}

export default PostDetails

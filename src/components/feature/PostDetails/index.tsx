import React from 'react'
import { useParams } from 'react-router-dom'
import ReactionButton from '@/components/feature/ReactionButton'

import { useGetPost } from './hooks/useGetPost'

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { post, loading, error } = useGetPost(id!)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { title, description, textContent, reactionsCount, urls } = post

  return (
    <div className="mx-auto max-w-[900px] p-4">
      {urls && (
        <img
          src={urls.medium}
          alt={title}
          className="mb-4 h-96 w-full rounded object-cover"
        />
      )}
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <p className="mb-4">{description}</p>
      <p className="mb-4">{textContent}</p>
      <ReactionButton reactionsCount={reactionsCount} id={id} />
    </div>
  )
}

export default PostDetails

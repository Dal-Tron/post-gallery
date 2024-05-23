import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import ReactionButton from '@/components/feature/ReactionButton'

import { GET_POST } from './queries/getPost'

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { title, description, textContent, reactionsCount, thumbnail } =
    data.post

  return (
    <div className="container mx-auto p-4">
      {thumbnail && thumbnail.urls && (
        <img
          src={thumbnail.urls.large}
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

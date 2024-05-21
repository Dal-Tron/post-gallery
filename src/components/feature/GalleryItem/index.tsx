import { Button } from '@/components/base/Button'
import { IPost } from '@/graphql/hooks/usePosts'
import useReaction from '@/graphql/hooks/useReaction'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface PostCardProps {
  post: IPost
}

const GalleryItem: FC<PostCardProps> = ({ post }) => {
  const { addReaction } = useReaction()

  const { urls, title, description, reactionsCount, id } = post || {}

  const handleAddReaction = () => {
    if (id) addReaction(id, 'heart')
  }

  return (
    <div className="rounded bg-white p-4 shadow">
      {urls && (
        <img
          src={urls.medium}
          alt={title || ''}
          className="mb-4 h-48 w-full rounded object-cover"
        />
      )}
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <p className="mb-2">{description}</p>
      <p className="mb-2">{reactionsCount} likes</p>
      <Button onClick={handleAddReaction}>Like</Button>
      <Link to={`/post/${id}`} className="text-blue-500">
        View Details
      </Link>
    </div>
  )
}

export default GalleryItem

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

  const reactionText = reactionsCount === 1 ? 'Like' : 'Likes'

  return (
    <div className="flex h-full flex-col rounded bg-white shadow">
      {urls && (
        <img
          src={urls.medium}
          alt={title || ''}
          className="mb-4 h-64 w-full rounded rounded-b-none object-cover"
        />
      )}
      <div className="flex grow flex-col p-4">
        <h2 className="mb-2 text-xl font-bold">{title}</h2>
        <p className="mb-4 grow">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          <Button
            className="space-x-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={handleAddReaction}
          >
            <div className="flex flex-row">
              {reactionsCount}
              <div className="mx-1">{reactionText}</div>
            </div>
          </Button>
          <Link to={`/post/${id}`} className="text-blue-500">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GalleryItem

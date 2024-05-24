import { IPost } from '@/components/feature/Gallery/hooks/useGetPosts'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import ReactionButton from '@/components/feature/ReactionButton'

interface PostCardProps {
  post: IPost
}

const GalleryItem: FC<PostCardProps> = ({ post }) => {
  const { urls, title, description, reactionsCount, id } = post || {}

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
          <ReactionButton id={id} reactionsCount={reactionsCount} />
          <Link to={`/post/${id}`} className="text-blue-500">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GalleryItem

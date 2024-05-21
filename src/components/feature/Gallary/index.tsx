import { useGetPosts } from '@/graphql/hooks/usePosts'
import GalleryItem from '../GalleryItem'
import { Button } from '@/components/base/Button'

const Gallery: React.FC = () => {
  const { posts, fetchMore, hasNextPage } = useGetPosts()

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: posts.length || 0
      }
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <GalleryItem key={post?.id} post={post} />
        ))}
      </div>
      {hasNextPage && <Button onClick={loadMore}>Show More</Button>}
    </div>
  )
}

export default Gallery

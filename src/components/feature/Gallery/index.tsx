import GalleryItem from '@/components/feature/GalleryItem'
import { Button } from '@/components/base/Button'

import { useGetPosts } from './hooks/useGetPosts'
import { FC } from 'react'

const Gallery: FC = () => {
  const { posts, fetchMore, hasNextPage, endCursor } = useGetPosts()

  const loadMore = () => {
    fetchMore({
      variables: {
        after: endCursor
      }
    })
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="m-8 grid max-w-[1100px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <GalleryItem key={post?.id} post={post} />
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        {hasNextPage && (
          <Button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={loadMore}
          >
            Show More
          </Button>
        )}
      </div>
    </>
  )
}

export default Gallery

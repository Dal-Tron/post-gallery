import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, test } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import GalleryItem from '@/components/feature/GalleryItem'
import { IPost } from '@/components/feature/Gallery/hooks/useGetPosts'

vi.mock('@/components/feature/ReactionButton', () => ({
  default: () => <div>ReactionButton</div>
}))

describe('GalleryItem', () => {
  const mockPost: IPost = {
    id: '1',
    title: 'Post Title',
    description: 'Post Description',
    urls: { medium: 'https://example.com/image.jpg' },
    reactionsCount: 5
  }

  test('renders the image when urls are provided', () => {
    render(
      <Router>
        <GalleryItem post={mockPost} />
      </Router>
    )

    const imageElement = screen.getByAltText('Post Title')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  test('renders the title and description', () => {
    render(
      <Router>
        <GalleryItem post={mockPost} />
      </Router>
    )

    expect(screen.getByText('Post Title')).toBeInTheDocument()
    expect(screen.getByText('Post Description')).toBeInTheDocument()
  })

  test('renders the ReactionButton with the correct props', () => {
    render(
      <Router>
        <GalleryItem post={mockPost} />
      </Router>
    )

    expect(screen.getByText('ReactionButton')).toBeInTheDocument()
  })

  test('renders the "View Details" link with the correct href', () => {
    render(
      <Router>
        <GalleryItem post={mockPost} />
      </Router>
    )

    const linkElement = screen.getByText('View Details')
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/post/1')
  })

  test('does not render the image when urls are not provided', () => {
    const postWithoutUrls: IPost = { ...mockPost, urls: undefined }
    render(
      <Router>
        <GalleryItem post={postWithoutUrls} />
      </Router>
    )

    const imageElement = screen.queryByAltText('Post Title')
    expect(imageElement).not.toBeInTheDocument()
  })
})

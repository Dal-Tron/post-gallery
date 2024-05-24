import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, beforeEach, test, expect, vi, Mock } from 'vitest'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter as Router } from 'react-router-dom'
import Gallery from '@/components/feature/Gallery'
import { useGetPosts } from './hooks/useGetPosts'

vi.mock('./hooks/useGetPosts', () => ({
  useGetPosts: vi.fn()
}))

interface MockUseGetPostsReturnType {
  posts: { id: string; title: string }[]
  fetchMore: (args: { variables: { after: string | null } }) => void
  hasNextPage: boolean
  endCursor: string | null
}

describe('Gallery', () => {
  const mockPosts = [
    { id: '1', title: 'Post 1' },
    { id: '2', title: 'Post 2' },
    { id: '3', title: 'Post 3' }
  ]

  const setup = (mockReturnValue: MockUseGetPostsReturnType) => {
    ;(useGetPosts as Mock).mockReturnValue(mockReturnValue)

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Router>
          <Gallery />
        </Router>
      </MockedProvider>
    )
  }

  beforeEach(() => {
    ;(useGetPosts as Mock).mockClear()
  })

  test('renders GalleryItem components for each post', () => {
    setup({
      posts: mockPosts,
      fetchMore: vi.fn(),
      hasNextPage: false,
      endCursor: null
    })

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    })
  })

  test('renders "Show More" button when hasNextPage is true', () => {
    setup({
      posts: [],
      fetchMore: vi.fn(),
      hasNextPage: true,
      endCursor: 'endCursor'
    })

    expect(screen.getByText('Show More')).toBeInTheDocument()
  })

  test('does not render "Show More" button when hasNextPage is false', () => {
    setup({
      posts: [],
      fetchMore: vi.fn(),
      hasNextPage: false,
      endCursor: null
    })

    expect(screen.queryByText('Show More')).not.toBeInTheDocument()
  })

  test('calls fetchMore with the correct variables when "Show More" button is clicked', () => {
    const mockFetchMore = vi.fn()
    setup({
      posts: [],
      fetchMore: mockFetchMore,
      hasNextPage: true,
      endCursor: 'endCursor'
    })

    fireEvent.click(screen.getByText('Show More'))
    expect(mockFetchMore).toHaveBeenCalledWith({
      variables: { after: 'endCursor' }
    })
  })
})

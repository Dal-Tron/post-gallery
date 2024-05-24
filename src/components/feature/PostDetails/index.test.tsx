import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, beforeEach, test, vi, Mock } from 'vitest'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom'
import PostDetails from '@/components/feature/PostDetails'
import { useGetPost } from './hooks/useGetPost'

vi.mock('./hooks/useGetPost', () => ({
  useGetPost: vi.fn()
}))

interface MockUsePostReturnType {
  post: {
    id: string
    title: string
    description: string
    textContent: string
    reactionsCount: number
    urls: {
      medium?: string
    }
  } | null
  loading: boolean
  error: Error | null
}

describe('PostDetails', () => {
  const mockPost = {
    id: '1',
    title: 'Post Title',
    description: 'Post Description',
    textContent: 'Post Text Content',
    reactionsCount: 5,
    urls: {
      medium: 'https://example.com/medium-image.jpg'
    }
  }

  const setup = (mockReturnValue: MockUsePostReturnType) => {
    ;(useGetPost as Mock).mockReturnValue(mockReturnValue)

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Router initialEntries={['/post/1']}>
          <Routes>
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </Router>
      </MockedProvider>
    )
  }

  beforeEach(() => {
    ;(useGetPost as Mock).mockClear()
  })

  test('renders loading state', () => {
    setup({ post: null, loading: true, error: null })

    expect(screen.getByTestId('bounce-loading')).toBeInTheDocument()
  })

  test('renders error state', async () => {
    setup({ post: null, loading: false, error: new Error('An error occurred') })

    await waitFor(() => {
      expect(screen.getByText(/Error: An error occurred/)).toBeInTheDocument()
    })
  })

  test('renders post details with data', async () => {
    setup({ post: mockPost, loading: false, error: null })

    expect(await screen.findByText('Post Title')).toBeInTheDocument()
    expect(screen.getByText('Post Text Content')).toBeInTheDocument()
  })

  test('renders thumbnail image if available', async () => {
    setup({ post: mockPost, loading: false, error: null })

    const imageElement = await screen.findByAltText('Post Title')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute(
      'src',
      'https://example.com/medium-image.jpg'
    )
  })

  test('renders ReactionButton with correct props', async () => {
    setup({ post: mockPost, loading: false, error: null })

    const reactionButton = await screen.findByTestId('reaction-button')
    expect(reactionButton).toBeInTheDocument()
    expect(reactionButton).toHaveTextContent(`${mockPost.reactionsCount}`)
  })
})

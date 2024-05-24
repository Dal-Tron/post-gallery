import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, test } from 'vitest'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter } from 'react-router-dom'
import Router from '@/router'

vi.mock('@/router', () => ({
  __esModule: true,
  default: () => <div>Mocked Router</div>
}))

describe('App', () => {
  test('renders without crashing', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </MockedProvider>
    )

    // Verify that the mocked Router component is rendered
    expect(screen.getByText('Mocked Router')).toBeInTheDocument()
  })
})

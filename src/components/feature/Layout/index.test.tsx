import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, test, vi } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from '@/components/feature/Layout'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Outlet: () => <div>Mocked Outlet</div>
  }
})

describe('Layout', () => {
  test('renders the header with title and link', () => {
    render(
      <Router>
        <Layout />
      </Router>
    )

    const headerElement = screen.getByRole('banner')
    expect(headerElement).toBeInTheDocument()

    const titleElement = screen.getByText('Post Gallery')
    expect(titleElement).toBeInTheDocument()

    const linkElement = screen.getByRole('link', { name: /post gallery/i })
    expect(linkElement).toHaveAttribute('href', '/')
  })

  test('renders the Outlet component', () => {
    render(
      <Router>
        <Layout />
      </Router>
    )

    const outletElement = screen.getByText('Mocked Outlet')
    expect(outletElement).toBeInTheDocument()
  })

  test('renders the footer with copyright text', () => {
    render(
      <Router>
        <Layout />
      </Router>
    )

    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toBeInTheDocument()

    const copyrightElement = screen.getByText('© 2024 Post Gallery')
    expect(copyrightElement).toBeInTheDocument()
  })
})

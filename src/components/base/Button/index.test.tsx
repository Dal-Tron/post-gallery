import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { Button } from '.'

describe('Button', () => {
  test('renders the button with the correct text', () => {
    render(<Button>Click me!</Button>)
    const buttonElement = screen.getByText('Click me!')
    expect(buttonElement).toBeInTheDocument()
  })

  test('calls onClick when button is enabled', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me!</Button>)
    const buttonElement = screen.getByText('Click me!')
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not call onClick when button is disabled', () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Click me!
      </Button>
    )
    const buttonElement = screen.getByText('Click me!')
    fireEvent.click(buttonElement)
    expect(handleClick).not.toHaveBeenCalled()
    expect(buttonElement).toBeDisabled()
  })

  test('does not call onClick when onClick is undefined', () => {
    const handleClick = undefined
    render(<Button onClick={handleClick}>Click me!</Button>)
    const buttonElement = screen.getByText('Click me!')
    fireEvent.click(buttonElement)
  })

  test('applies error styling when hasError is true', () => {
    render(<Button hasError>Click me!</Button>)
    const buttonElement = screen.getByText('Click me!')
    expect(buttonElement).toHaveClass('border-red-500')
  })

  test('applies disabled styling when disabled', () => {
    render(<Button disabled>Click me!</Button>)
    const buttonElement = screen.getByText('Click me!')
    expect(buttonElement).toHaveClass('opacity-30 cursor-not-allowed')
  })

  test('sets aria-label when provided', () => {
    const ariaLabel = 'Accessible Button'
    render(<Button ariaLabel={ariaLabel}>Click me!</Button>)
    const buttonElement = screen.getByLabelText(ariaLabel)
    expect(buttonElement).toBeInTheDocument()
  })

  test('does not set aria-label when not provided', () => {
    render(<Button>Click me!</Button>)
    const buttonElement = screen.getByText('Click me!')
    expect(buttonElement).not.toHaveAttribute('aria-label')
  })
})

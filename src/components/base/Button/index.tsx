import { clsx } from 'clsx'
import { FC } from 'react'

interface ButtonProps {
  ariaLabel?: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
  hasError?: boolean
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  ariaLabel,
  children,
  className,
  disabled = false,
  hasError,
  onClick
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  return (
    <button
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      className={clsx(
        {
          'border-red-500': hasError,
          'opacity-30 cursor-not-allowed': disabled
        },
        'transition-opacity duration-300',
        className
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

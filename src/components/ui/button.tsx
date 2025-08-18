
import { ButtonHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost' | 'outline' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant='default', size='md', ...props }, ref
) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 transition'
  const variants = {
    default: 'bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800',
    ghost: 'bg-transparent hover:bg-violet-100 text-violet-700',
    outline: 'border border-violet-300 hover:bg-violet-50 text-violet-700',
    accent: 'bg-violet-100 text-violet-800 hover:bg-violet-200'
  }
  const sizes = { sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-base' }
  return <button ref={ref} className={clsx(base, variants[variant], sizes[size], className)} {...props} />
})

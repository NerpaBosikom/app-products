
import { InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...props }, ref
) {
  return <input ref={ref} className={clsx('w-full h-10 rounded-md border border-violet-300 bg-white/80 backdrop-blur px-3 text-sm outline-none focus:ring-2 focus:ring-violet-400', className)} {...props} />
})

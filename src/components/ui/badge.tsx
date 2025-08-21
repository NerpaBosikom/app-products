import { HTMLAttributes } from 'react'
import clsx from 'clsx'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={clsx('inline-block text-xs px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800', className)} {...props} />
}

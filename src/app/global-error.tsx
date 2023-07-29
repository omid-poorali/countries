'use client'

import { Button, Error } from '@/components';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <Error onClick={reset} />
      </body>
    </html>
  )
}
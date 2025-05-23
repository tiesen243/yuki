import * as React from 'react'

export function useDebounce<T extends (...args: never[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutRef = React.useRef<NodeJS.Timeout>(null)

  return React.useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay],
  )
}

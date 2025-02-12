import * as React from 'react'

export const useDebounce = <T extends (...args: never[]) => void>(
  callback: T,
  delay: number,
): T => {
  const timeoutRef = React.useRef<NodeJS.Timeout>(null)
  const latestCallbackRef = React.useRef<T>(callback)

  React.useEffect(() => {
    latestCallbackRef.current = callback
  }, [callback])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const debouncedCallback = React.useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        latestCallbackRef.current(...args)
      }, delay)
    },
    [delay],
  ) as T

  return debouncedCallback
}

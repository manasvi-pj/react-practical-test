import { useState, useEffect } from 'react'

export const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler) // Clean up timeout on value or delay change
  }, [value, delay])

  return debouncedValue
}

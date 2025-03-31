"use client"

import * as React from "react"

export function useCopyToClipboard({ timeout = 2000 }: { timeout?: number } = {}) {
  const [isCopied, setIsCopied] = React.useState<boolean>(false)

  const copyToClipboard = React.useCallback(
    async (text: string) => {
      if (!navigator.clipboard) {
        console.warn("Clipboard API not available")
        return false
      }

      try {
        await navigator.clipboard.writeText(text)
        setIsCopied(true)

        setTimeout(() => {
          setIsCopied(false)
        }, timeout)

        return true
      } catch (error) {
        console.warn("Failed to copy:", error)
        setIsCopied(false)
        return false
      }
    },
    [timeout],
  )

  return { isCopied, copyToClipboard }
}


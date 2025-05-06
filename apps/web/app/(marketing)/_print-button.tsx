'use client'

export const PrintButton: React.FC = () => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className="text-muted-foreground hover:text-foreground flex items-center text-sm transition-colors"
    >
      Print this page
    </button>
  )
}

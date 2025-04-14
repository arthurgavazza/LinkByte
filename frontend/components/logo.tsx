import Link from 'next/link'
import { Link2 } from 'lucide-react'

interface LogoProps {
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  asLink?: boolean
}

export function Logo({ showText = true, size = 'md', asLink = true }: LogoProps) {
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  const LogoContent = (
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-primary p-1.5">
        <Link2 className={`${iconSizes[size]} text-primary-foreground`} />
      </div>
      {showText && <span className={`${textSizes[size]} font-bold`}>LinkByte</span>}
    </div>
  )

  if (asLink) {
    return <Link href="/">{LogoContent}</Link>
  }

  return LogoContent
}

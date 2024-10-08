import { cn } from '@yuki/ui'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  repeat?: number
}

export const Marquee: React.FC<MarqueeProps> = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) => (
  <div
    {...props}
    className={cn(
      'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
      {
        'flex-row': !vertical,
        'flex-col': vertical,
      },
      className,
    )}
  >
    {Array(repeat)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
            'animate-marquee flex-row': !vertical,
            'animate-marquee-vertical flex-col': vertical,
            'group-hover:[animation-play-state:paused]': pauseOnHover,
            '[animation-direction:reverse]': reverse,
          })}
        >
          {children}
        </div>
      ))}
  </div>
)

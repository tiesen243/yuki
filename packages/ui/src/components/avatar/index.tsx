import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@yuki/ui/utils'

import type {
  AvatarFallbackVariants,
  AvatarImageVariants,
  AvatarVariants,
} from './variants'
import { avatarFallbackVariants, avatarImageVariants, avatarVariants } from './variants'

const Avatar: React.FC<AvatarPrimitive.AvatarProps & AvatarVariants> = ({
  shape,
  className,
  ...props
}) => (
  <AvatarPrimitive.Root className={cn(avatarVariants({ shape, className }))} {...props} />
)
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage: React.FC<AvatarPrimitive.AvatarImageProps & AvatarImageVariants> = ({
  className,
  ...props
}) => (
  <AvatarPrimitive.Image className={cn(avatarImageVariants({ className }))} {...props} />
)
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback: React.FC<
  AvatarPrimitive.AvatarFallbackProps & AvatarFallbackVariants
> = ({ shape, className, ...props }) => (
  <AvatarPrimitive.Fallback
    className={cn(avatarFallbackVariants({ shape, className }))}
    {...props}
  />
)
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

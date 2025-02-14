'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@yuki/ui/utils'

import {
  scrollButtonVariants,
  selectContentVariants,
  selectItemIndicatorWrapper,
  selectItemVariants,
  selectLabelVariants,
  selectSeparatorVariants,
  selectTriggerVariants,
  selectViewportVariants,
} from './variants'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger: React.FC<React.ComponentProps<typeof SelectPrimitive.Trigger>> = ({
  className,
  children,
  ...props
}) => (
  <SelectPrimitive.Trigger
    className={cn(selectTriggerVariants({ className }))}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton: React.FC<
  React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
> = ({ className, ...props }) => (
  <SelectPrimitive.ScrollUpButton
    className={cn(scrollButtonVariants({ className }))}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
)
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton: React.FC<
  React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>
> = ({ className, ...props }) => (
  <SelectPrimitive.ScrollDownButton
    className={cn(scrollButtonVariants({ className }))}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
)
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent: React.FC<React.ComponentProps<typeof SelectPrimitive.Content>> = ({
  className,
  children,
  position = 'popper',
  ...props
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(selectContentVariants({ position, className }))}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className={cn(selectViewportVariants({ position }))}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel: React.FC<React.ComponentProps<typeof SelectPrimitive.Label>> = ({
  className,
  ...props
}) => (
  <SelectPrimitive.Label className={cn(selectLabelVariants({ className }))} {...props} />
)
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem: React.FC<React.ComponentProps<typeof SelectPrimitive.Item>> = ({
  className,
  children,
  ...props
}) => (
  <SelectPrimitive.Item className={cn(selectItemVariants({ className }))} {...props}>
    <span className={selectItemIndicatorWrapper()}>
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator: React.FC<
  React.ComponentProps<typeof SelectPrimitive.Separator>
> = ({ className, ...props }) => (
  <SelectPrimitive.Separator
    className={cn(selectSeparatorVariants, className)}
    {...props}
  />
)
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

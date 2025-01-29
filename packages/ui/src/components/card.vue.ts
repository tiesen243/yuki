import { defineComponent, h } from 'vue'

import { cn } from '@yuki/ui/utils'

const Card = defineComponent({
  name: 'Card',
  props: {
    class: String,
    as: { type: String, default: 'div' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.as,
        {
          class: cn(
            'bg-card text-card-foreground rounded-xl border shadow-sm',
            props.class,
          ),
        },
        { default: () => slots.default?.() },
      )
  },
})

const CardHeader = defineComponent({
  name: 'CardHeader',
  props: {
    class: String,
    as: { type: String, default: 'div' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.as,
        { class: cn('flex flex-col space-y-1.5 p-6', props.class) },
        { default: () => slots.default?.() },
      )
  },
})

const CardTitle = defineComponent({
  name: 'CardTitle',
  props: {
    class: String,
    as: { type: String, default: 'div' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.as,
        { class: cn('leading-none font-semibold tracking-tight', props.class) },
        { default: () => slots.default?.() },
      )
  },
})

const CardDescription = defineComponent({
  name: 'CardDescription',
  props: {
    class: String,
    as: { type: String, default: 'div' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.as,
        { class: cn('text-muted-foreground text-sm', props.class) },
        { default: () => slots.default?.() },
      )
  },
})

const CardContent = defineComponent({
  name: 'CardContent',
  props: {
    class: String,
    as: { type: String, default: 'div' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.as,
        { class: cn('p-6 pt-0', props.class) },
        { default: () => slots.default?.() },
      )
  },
})

const CardFooter = defineComponent({
  name: 'CardFooter',
  props: {
    class: String,
    as: { type: String, default: 'div' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.as,
        { class: cn('flex items-center p-6 pt-0', props.class) },
        { default: () => slots.default?.() },
      )
  },
})

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

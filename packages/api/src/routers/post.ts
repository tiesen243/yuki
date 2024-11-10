import { createTRPCRouter, protectedProcedure, publicProcedure } from '@yuki/api/trpc'
import { createPost } from '@yuki/api/validators/post'

export const postRouter = createTRPCRouter({
  hello: publicProcedure.query(async () => {
    return 'Hello World'
  }),

  getLatestPost: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      where: { authorId: ctx.session.userId },
      orderBy: { createdAt: 'desc' },
    })

    return post ?? null
  }),

  createPost: protectedProcedure.input(createPost).mutation(async ({ input, ctx }) => {
    const post = await ctx.db.post.create({
      data: {
        content: input.content,
        author: { connect: { id: ctx.session.userId } },
      },
    })

    return post
  }),
})

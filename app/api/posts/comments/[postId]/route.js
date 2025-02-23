import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (request, { params }) => {
  try {
    const { postId } = await params
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' }
    })
    if (!comments.length)
      return NextResponse.error(new Error('Comments not found'))

    const commentWithAuthorData = await Promise.all(
      comments.map(async (comment) => {
        const author = await prisma.user.findUnique({
          where: {
            id: comment.authorId
          },
          select: {
            username: true,
            fullname: true,
            image: true,
            position: true
          }
        })
        return {
          ...comment,
          author,
          replies: []
        }
      })
    )

    const commentMap = new Map()
    commentWithAuthorData.forEach((comment) => {
      commentMap.set(comment.id, comment)
    })
    const rootComments = []
    commentWithAuthorData.forEach((comment) => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId)
        if (parent) parent.replies.push(comment)
      } else {
        rootComments.push(comment)
      }
    })

    return NextResponse.json(rootComments)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

export const POST = async (request, { params }) => {
  try {
    const { postId } = await params
    const body = await request.json()
    const { content, email, parentCommentId } = body

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) return NextResponse.error(new Error('User not found'))

    if (!parentCommentId) {
      const comment = await prisma.comment.create({
        data: {
          content,
          postId,
          authorId: user.id
        }
      })
      if (!comment) return NextResponse.error(new Error('Comment not created'))

      return NextResponse.json(comment)
    } else {
      const parentComment = await prisma.comment.findUnique({
        where: {
          id: parentCommentId
        }
      })
      if (!parentComment)
        return NextResponse.error(new Error('Parent comment not found'))

      const reply = await prisma.comment.update({
        where: {
          id: parentCommentId
        },
        data: {
          replies: {
            create: {
              content,
              postId,
              authorId: user.id
            }
          }
        }
      })
      if (!reply) return NextResponse.error(new Error(`Couldn't create reply`))

      return NextResponse.json(reply)
    }
  } catch (error) {
    console.error(error.message)
    return NextResponse.json({ error: error.message }, { status: 404 })
  }
}

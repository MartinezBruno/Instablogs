import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (request, { params }) => {
  try {
    const { postId } = await params
    const comments = await prisma.comment.findMany({
      where: {
        postId
      }
    })
    if (!comments) return NextResponse.error(new Error('Comments not found'))
    const commentWithAuthorData = await Promise.all(
      comments.map(async comment => {
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
          author
        }
      })
    )
    return NextResponse.json(commentWithAuthorData)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

export const POST = async (request, { params }) => {
  try {
    const { postId } = params
    const body = await request.json()
    const { content, email } = body

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) return NextResponse.error(new Error('User not found'))

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: user.id
      }
    })
    if (!comment) return NextResponse.error(new Error('Comment not created'))

    return NextResponse.json(comment)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

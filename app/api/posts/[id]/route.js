import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (_request, { params }) => {
  try {
    const { id } = await params
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    })
    if (!post)
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    const author = await prisma.user.findUnique({
      where: {
        id: post.authorId
      },
      select: {
        username: true,
        fullname: true,
        image: true,
        position: true
      }
    })
    if (!author)
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })

    const response = {
      ...post,
      authorName: author.fullname,
      authorPos: author.position,
      authorPic: author.image,
      authorUsername: author.username
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

export const DELETE = async (_request, { params }) => {
  try {
    const { id } = await params
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    })
    if (!post)
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    await prisma.$transaction(async (prisma) => {
      await prisma.comment.deleteMany({
        where: {
          parentId: {
            not: null // This will only delete replies
          }
        }
      })

      await prisma.comment.deleteMany({
        where: {
          postId: id
        }
      })
    })

    await prisma.post.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ message: 'Post deleted' })
  } catch (error) {
    console.error(error.message)
    return NextResponse.json({ error: error.message }, { status: 404 })
  }
}

export const PUT = async (request, { params }) => {
  try {
    const { id } = await params
    const { title, content } = await request.json()

    const post = await prisma.post.update({
      where: {
        id
      },
      data: {
        title,
        content
      }
    })
    if (!post)
      return NextResponse.json(
        { error: 'Unable to update post content, please try again later' },
        { status: 404 }
      )

    return NextResponse.json({ message: 'Post updated' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

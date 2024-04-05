import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (request, { params }) => {
  try {
    const { user: userName } = params
    if (!userName) return NextResponse.error(new Error('Username not provided'))

    const user = await prisma.user.findUnique({
      where: {
        username: userName
      },
      select: {
        id: true,
        fullname: true,
        image: true
      }
    })
    if (!user) return NextResponse.error(new Error('User not found'))

    // Get all posts for the user
    const posts = await prisma.post.findMany({
      where: {
        authorId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    if (!posts) return NextResponse.error(new Error('Post not found'))

    const postsWithAuthorData = posts.map((post) => {
      return {
        ...post,
        authorImage: user.image,
        authorName: user.fullname
      }
    })

    return NextResponse.json(postsWithAuthorData)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

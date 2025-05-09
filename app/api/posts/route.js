import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'
import { uploadImageAndGetURL } from '@/app/services/firebase.config'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

export const GET = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  const postsWithAuthorData = await Promise.all(
    posts.map(async (post) => {
      const author = await prisma.user.findUnique({
        where: {
          id: post.authorId
        },
        select: {
          fullname: true,
          image: true
        }
      })
      return {
        ...post,
        authorName: author.fullname,
        authorImage: author.image,
        autorUsername: author.username
      }
    })
  )
  return NextResponse.json(postsWithAuthorData)
}

export const POST = async (request) => {
  try {
    const body = await request.json()
    const { title, content, email, banner } = body

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const { fileName, webpBuffer } = await base64toWebp(banner)
    const image = await uploadImageAndGetURL({
      file: webpBuffer,
      fileName,
      userId: user.id
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Image upload failed' },
        { status: 500 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
        banner: image
      }
    })
    if (!post) return NextResponse.json(new Error('Post not created'))

    return NextResponse.json(post)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

const base64toWebp = async (image) => {
  const buffer = Buffer.from(image, 'base64')
  const webpBuffer = await sharp(buffer).webp().toBuffer()
  const fileName = `blog-${uuidv4()}.webp`

  return { fileName, webpBuffer }
}

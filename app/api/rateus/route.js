import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const POST = async request => {
  try {
    // get the user id from params and update there biography or other details depending on the request body
    const body = await request.json()
    const { content, authorId, rating } = body

    const user = await prisma.user.findUnique({
      where: {
        id: authorId
      }
    })
    if (!user) return NextResponse.error(new Error('User not found'))

    const review = await prisma.review.create({
      data: {
        content,
        rating,
        authorId
      }
    })
    if (!review) return NextResponse.error(new Error('Review not created'))

    return NextResponse.json(review)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

export const GET = async () => {
  try {
    const reviews = await prisma.review.findMany()
    const reviewsWithAuthorData = await Promise.all(
      reviews.map(async review => {
        const author = await prisma.user.findUnique({
          where: {
            id: review.authorId
          },
          select: {
            username: true,
            fullname: true,
            image: true,
            position: true
          }
        })
        return {
          ...review,
          authorName: author.fullname,
          authorImage: author.image,
          authorPosition: author.position,
          authorUsername: author.username
        }
      })
    )
    if (!reviews) return NextResponse.error(new Error('Reviews not found'))
    return NextResponse.json(reviewsWithAuthorData)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

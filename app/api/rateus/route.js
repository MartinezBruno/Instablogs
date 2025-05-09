import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request) => {
  try {
    const body = await request.json()
    const { content, authorId, rating } = body

    const user = await prisma.user.findUnique({
      where: {
        id: authorId
      }
    })
    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const existingReview = await prisma.review.findFirst({
      where: {
        authorId
      }
    })

    let review

    if (existingReview) {
      review = await prisma.review.update({
        where: {
          id: existingReview.id
        },
        data: {
          content,
          rating
        }
      })
    } else {
      review = await prisma.review.create({
        data: {
          content,
          rating,
          authorId
        }
      })
    }

    if (!review)
      return NextResponse.json(
        { error: 'Review not created or updated' },
        { status: 404 }
      )

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
      reviews.map(async (review) => {
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
    if (!reviews)
      return NextResponse.json({ error: 'Reviews not found' }, { status: 404 })
    return NextResponse.json(reviewsWithAuthorData)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

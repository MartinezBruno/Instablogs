import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const PATCH = async (request, { params }) => {
  try {
    // get the user id from params and update there biography or other details depending on the request body
    const { userId } = await params
    const body = await request.json()
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        ...body
      }
    })
    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

export const GET = async (request, { params }) => {
  try {
    const { userId } = await params
    const user = await prisma.user.findUnique({
      where: {
        username: userId
      }
    })
    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 404 })
  }
}

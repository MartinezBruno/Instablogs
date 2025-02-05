import prisma from '@/lib/prismadb'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        const userExists = await prisma.user.findUnique({
          where: {
            email: profile.email
          }
        })
        const userName = profile.name.replace(' ', '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        const userNameIsTaken = await prisma.user.findUnique({
          where: {
            username: userName
          }
        })
        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: userNameIsTaken ? `${userName}${Math.floor(Math.random() * 1000)}` : userName,
              fullname: profile.name,
              image: profile.picture
            }
          })
        }
        return true
      } catch (error) {
        console.error(error)
      }
    },
    async session({ session }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        })

        session.user.id = user.id
        session.user.username = user.username
        session.user.fullname = user.fullname
        session.user.pos = user.position ?? ''
        session.user.bio = user.bio ?? ''

        return session
      } catch (error) {
        console.error(error)
      }
    }
  }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

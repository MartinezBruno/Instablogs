// One-off migration: Firebase Storage is no longer readable (HTTP 402) and the
// original banner files are lost, so every Post.banner that still points to
// Firebase is replaced with a generic local image.
//
// Usage (needs DATABASE_URL in .env / .env.local):
//   node scripts/migrate-banners.mjs            # dry run
//   node scripts/migrate-banners.mjs --apply    # update the database
import nextEnv from '@next/env'
import { PrismaClient } from '@prisma/client'

nextEnv.loadEnvConfig(process.cwd())

const PLACEHOLDER_BANNER = '/images/post-placeholder.png'
const apply = process.argv.includes('--apply')

const prisma = new PrismaClient()

try {
  const posts = await prisma.post.findMany({
    where: { banner: { contains: 'firebasestorage.googleapis.com' } },
    select: { id: true, title: true }
  })

  console.log(`${posts.length} post(s) with a Firebase banner`)
  console.log(apply ? 'Mode: APPLY' : 'Mode: dry run (pass --apply to write)')

  for (const post of posts) {
    if (apply) {
      await prisma.post.update({
        where: { id: post.id },
        data: { banner: PLACEHOLDER_BANNER }
      })
    }
    console.log(
      `${apply ? 'updated' : 'would update'} "${post.title}" -> ${PLACEHOLDER_BANNER}`
    )
  }
} finally {
  await prisma.$disconnect()
}

import { put } from '@vercel/blob'

// Uses BLOB_READ_WRITE_TOKEN from the environment (set automatically by Vercel
// when a Blob store is connected to the project).
export const uploadImageAndGetURL = async ({ userId, file, fileName }) => {
  try {
    const blob = await put(`${userId}/${fileName}`, file, {
      access: 'public',
      contentType: 'image/webp'
    })

    return blob.url
  } catch (error) {
    console.error(error)
  }
}

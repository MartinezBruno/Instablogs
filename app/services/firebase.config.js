import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID
} from './config'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)

export const uploadImageAndGetURL = async ({ userId, file, fileName }) => {
  try {
    const storageRef = ref(storage, `${userId}/${fileName}`)

    await uploadBytes(storageRef, file)
    const imageUrl = await getDownloadURL(storageRef)

    return imageUrl
  } catch (error) {
    console.error(error)
  }
}

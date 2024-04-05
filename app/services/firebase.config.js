import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyB-K7Sbec6H8YeeXFg4t2z7Dd9LRiwPsX8',
  authDomain: 'instablogs-82a89.firebaseapp.com',
  projectId: 'instablogs-82a89',
  storageBucket: 'instablogs-82a89.appspot.com',
  messagingSenderId: '714583806826',
  appId: '1:714583806826:web:717f60fd195dc7c7460b13'
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)

export const uploadImageAndGetURL = async ({ userId, file }) => {
  try {
    const storageRef = ref(storage, `${userId}/${file.name}`)

    await uploadBytes(storageRef, file)
    const imageUrl = await getDownloadURL(storageRef)

    return imageUrl
  } catch (error) {
    console.error(error)
  }
}

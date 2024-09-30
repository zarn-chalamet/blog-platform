import { ref } from 'vue'
import { ref as storageRef, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'
// import { getFirestore } from "firebase/firestore";

let storeDataToDatabase = () => {
  let storage = getStorage()
  const err = ref(null)

  const uploadFile = async (file) => {
    try {
      // Create a storage reference
      const storageReference = storageRef(storage, `uploads/${file.name}`)

      // Upload the file
      const uploadResult = await uploadBytes(storageReference, file)

      // Get the download URL
      const downloadURL = await getDownloadURL(uploadResult.ref)

      // Save metadata in Firestore
      // await addDoc(collection(db, collectionName), {
      //     fileName: file.name,
      //     fileUrl: downloadURL,
      //     createdAt: new Date(),
      // });

      return downloadURL
    } catch (error) {
      err.value = error.message
      return null
    }
  }
  return {
    uploadFile,
    err
  }
}

export default storeDataToDatabase

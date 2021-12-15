import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config() // This will load in the GOOGLE_APPLICATION_CREDENTIALS

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

export const verifyToken = (token: string) => {
  return new Promise(function (resolve, reject) {
    admin
      .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        resolve(decodedToken)
      })
      .catch(error => {
        reject(error)
      })
  })
}

import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
]

const missingEnvVars = requiredEnvVars.filter((key) => !import.meta.env[key])

if (missingEnvVars.length > 0 && import.meta.env.PROD) {
  throw new Error(`Missing required Firebase environment variables: ${missingEnvVars.join(', ')}`)
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:demo',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
}

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig)

async function initializeAnalytics(firebaseApp: FirebaseApp, measurementId?: string): Promise<Analytics | undefined> {
  if (!measurementId || typeof window === 'undefined') {
    return undefined
  }

  if (!(await isSupported())) {
    return undefined
  }

  return getAnalytics(firebaseApp)
}

export const auth = getAuth(app)
export const db = getFirestore(app)
export const analyticsPromise = initializeAnalytics(app, firebaseConfig.measurementId)

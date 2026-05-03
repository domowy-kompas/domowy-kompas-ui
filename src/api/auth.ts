import type { AuthUser, LoginCredentials, RegisterCredentials } from '../types/auth'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  updateProfile,
  type User,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

interface AuthResponse {
  token: string
  user: AuthUser
}

interface UserProfile {
  name?: string
  surname?: string
}

export function mapFirebaseUser(firebaseUser: User, profile?: UserProfile | null): AuthUser {
  const profileName = profile?.name?.trim() || firebaseUser.displayName?.split(' ')?.[0] || ''
  const profileSurname = profile?.surname?.trim() || firebaseUser.displayName?.split(' ')?.slice(1).join(' ') || ''

  return {
    uid: firebaseUser.uid,
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: profileName,
    surname: profileSurname,
  }
}

async function loadUserProfile(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, 'users', uid))
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null
}

async function resolveAuthUser(firebaseUser: User): Promise<AuthUser> {
  try {
    const profile = await loadUserProfile(firebaseUser.uid)
    return mapFirebaseUser(firebaseUser, profile)
  } catch (error) {
    console.error(`[Auth] Failed to load user profile for ${firebaseUser.uid}:`, error)
    // Fallback to basic user info from Auth if Firestore fails
    return mapFirebaseUser(firebaseUser)
  }
}

export async function login(credentials: LoginCredentials, rememberMe = true): Promise<AuthResponse> {
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
  const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)

  return {
    token: await result.user.getIdToken(),
    // Return quickly; profile enrichment happens in auth state observer.
    user: mapFirebaseUser(result.user),
  }
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  await setPersistence(auth, browserLocalPersistence)
  const result = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)

  try {
    // 1. Update Auth Profile
    await updateProfile(result.user, {
      displayName: `${credentials.name} ${credentials.surname}`.trim(),
    })

    // 2. Create Firestore Document
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      email: credentials.email,
      name: credentials.name,
      surname: credentials.surname,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('[Auth] Registration profile setup failed:', error)
    // We don't delete the user account here to avoid losing the email reservation,
    // but the UI will know something went wrong if we re-throw or handle it.
    throw new Error('Konto zostało utworzone, ale wystąpił problem z konfiguracją profilu. Spróbuj zalogować się ponownie.')
  }

  return {
    token: await result.user.getIdToken(),
    user: mapFirebaseUser(result.user, {
      name: credentials.name,
      surname: credentials.surname,
    }),
  }
}

export async function logout(): Promise<void> {
  await signOut(auth)
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}

export function observeAuthState(onChange: (user: AuthUser | null) => void): () => void {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      onChange(null)
      return
    }

    // Instead of emitting twice, we resolve the full user first.
    // This prevents the UI from flashing between "logged in" and "profile loaded".
    const resolvedUser = await resolveAuthUser(firebaseUser)
    onChange(resolvedUser)
  })
}
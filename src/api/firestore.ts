import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import type { Budget } from '../hooks/useBudgetsData'
import type { Goal } from '../hooks/useGoalsData'
import type { Transaction } from '../features/transactions/types'
import type { ReportData, HistoricalData } from '../hooks/useReportsData'

export interface UserProfile {
  name: string
  surname: string
  email: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

/**
 * Firestore Data Access Layer
 * Implementation based on FIREBASE_MIGRATION_PART2.md
 */

// --- Helper Functions ---

const mapDocWithId = <T>(doc: QueryDocumentSnapshot<DocumentData>): T => ({
  ...doc.data(),
  id: doc.id,
}) as T

const convertTimestamps = <T extends Record<string, any>>(data: T): T => {
  const result = { ...data } as any
  Object.keys(result).forEach((key) => {
    if (result[key] instanceof Timestamp) {
      result[key] = (result[key] as Timestamp).toDate().toISOString()
    }
  })
  return result as T
}

// --- User Profile ---

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', userId)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
  const docRef = doc(db, 'users', userId)
  await updateDoc(docRef, {
    ...profile,
    updatedAt: serverTimestamp(),
  })
}

// --- Budgets ---

export async function getBudgets(userId: string): Promise<Budget[]> {
  const q = query(collection(db, 'users', userId, 'budgets'), orderBy('createdAt', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => convertTimestamps(mapDocWithId<Budget>(d)))
}

export async function addBudget(userId: string, budget: Omit<Budget, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'users', userId, 'budgets'), {
    ...budget,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateBudget(userId: string, budgetId: string, budget: Partial<Budget>): Promise<void> {
  const docRef = doc(db, 'users', userId, 'budgets', budgetId)
  await updateDoc(docRef, {
    ...budget,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteBudget(userId: string, budgetId: string): Promise<void> {
  const docRef = doc(db, 'users', userId, 'budgets', budgetId)
  await deleteDoc(docRef)
}

// --- Goals ---

export async function getGoals(userId: string): Promise<Goal[]> {
  const q = query(collection(db, 'users', userId, 'goals'), orderBy('createdAt', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => convertTimestamps(mapDocWithId<Goal>(d)))
}

export async function addGoal(userId: string, goal: Omit<Goal, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'users', userId, 'goals'), {
    ...goal,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateGoal(userId: string, goalId: string, goal: Partial<Goal>): Promise<void> {
  const docRef = doc(db, 'users', userId, 'goals', goalId)
  await updateDoc(docRef, {
    ...goal,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteGoal(userId: string, goalId: string): Promise<void> {
  const docRef = doc(db, 'users', userId, 'goals', goalId)
  await deleteDoc(docRef)
}

// --- Transactions ---

export async function getTransactions(userId: string): Promise<Transaction[]> {
  const q = query(collection(db, 'users', userId, 'transactions'), orderBy('date', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => convertTimestamps(mapDocWithId<Transaction>(d)))
}

export async function addTransaction(userId: string, transaction: Omit<Transaction, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'users', userId, 'transactions'), {
    ...transaction,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateTransaction(userId: string, txnId: string, transaction: Partial<Transaction>): Promise<void> {
  const docRef = doc(db, 'users', userId, 'transactions', txnId)
  await updateDoc(docRef, {
    ...transaction,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteTransaction(userId: string, txnId: string): Promise<void> {
  const docRef = doc(db, 'users', userId, 'transactions', txnId)
  await deleteDoc(docRef)
}

// --- Reports ---

export async function getReports(userId: string): Promise<ReportData[]> {
  const q = query(collection(db, 'users', userId, 'reports'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => convertTimestamps(mapDocWithId<ReportData>(d)))
}

export async function saveReportSnapshot(userId: string, reportId: string, report: Omit<ReportData, 'id'>): Promise<void> {
  const docRef = doc(db, 'users', userId, 'reports', reportId)
  await setDoc(docRef, {
    ...report,
    period: reportId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function saveHistoricalData(userId: string, data: HistoricalData[]): Promise<void> {
  // Store historical data as a special document in users collection or a separate collection
  // For now, let's follow the plan and maybe store it in the user doc or a specific report doc
  const docRef = doc(db, 'users', userId, 'metadata', 'historical')
  await setDoc(docRef, {
    data,
    updatedAt: serverTimestamp(),
  })
}

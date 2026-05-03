export function getFirebaseAuthErrorMessage(error: unknown): string {
  const code = typeof error === 'object' && error !== null && 'code' in error ? String((error as { code: string }).code) : ''

  switch (code) {
    case 'auth/invalid-email':
      return 'Podaj poprawny adres email.'
    case 'auth/user-disabled':
      return 'To konto zostało zablokowane.'
    case 'auth/user-not-found':
      return 'Nie znaleziono konta z takim adresem email.'
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Nieprawidłowy email lub hasło.'
    case 'auth/email-already-in-use':
      return 'To konto email jest już zajęte.'
    case 'auth/weak-password':
      return 'Hasło jest zbyt słabe. Użyj co najmniej 6 znaków.'
    case 'auth/missing-password':
      return 'Podaj hasło.'
    case 'auth/missing-email':
      return 'Podaj adres email.'
    case 'auth/too-many-requests':
      return 'Za dużo prób logowania. Spróbuj ponownie później.'
    default:
      return 'Wystąpił błąd uwierzytelniania. Spróbuj ponownie.'
  }
}

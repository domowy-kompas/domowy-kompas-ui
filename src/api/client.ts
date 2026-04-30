const API_URL = 'http://localhost:3001/api'

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('auth_token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options?.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let errorMessage = 'Wystąpił błąd serwera'
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch {
      // Ignore parse errors, fallback to default message
    }
    throw new Error(errorMessage)
  }

  const text = await response.text()
  return (text ? JSON.parse(text) : {}) as T
}

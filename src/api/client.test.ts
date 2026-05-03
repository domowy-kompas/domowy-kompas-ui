import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchApi } from './client'
import { auth } from '../config/firebase'

describe('fetchApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('includes Authorization header when user is logged in', async () => {
    // Mock user with a token
    const mockUser = {
      getIdToken: vi.fn().mockResolvedValue('test-firebase-token'),
    }
    
    // We need to trick the 'auth' instance which is already mocked in setup.ts
    // In setup.ts, getAuth is mocked to return { currentUser: mockFirebaseUser }
    // We can access it via the imported auth
    Object.defineProperty(auth, 'currentUser', {
      get: () => mockUser,
      configurable: true
    })

    const spy = vi.spyOn(globalThis, 'fetch')

    await fetchApi('/test-endpoint')

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('/test-endpoint'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-firebase-token'
        })
      })
    )
  })

  it('does not include Authorization header when user is not logged in', async () => {
    Object.defineProperty(auth, 'currentUser', {
      get: () => null,
      configurable: true
    })

    const spy = vi.spyOn(globalThis, 'fetch')

    await fetchApi('/test-endpoint')

    const callArgs = spy.mock.calls[0][1]
    expect(callArgs?.headers).not.toHaveProperty('Authorization')
  })
})

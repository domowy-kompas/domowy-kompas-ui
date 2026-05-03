import jsonServer from 'json-server'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Add random sleep between 200-800ms for a more responsive dev experience
server.use((req, res, next) => {
  const delay = Math.floor(Math.random() * (800 - 200 + 1)) + 200
  console.log(`[Opóźnienie] Dodaję ${delay}ms do zapytania ${req.method} ${req.originalUrl}`)
  setTimeout(next, delay)
})

const mockUser = {
  id: '1',
  email: 'kacper.klimas@student.pk.edu.com',
  name: 'Kacper',
  surname: 'Klimas',
}

// Custom route for login
server.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  if (email && password) {
    res.status(200).json({
      token: 'mock-jwt-token-123',
      user: mockUser
    })
  } else {
    res.status(401).json({ message: 'Nieprawidłowy email lub hasło' })
  }
})

// Custom route for register
server.post('/api/auth/register', (req, res) => {
  const { email, password, name, surname } = req.body

  if (email && password && name && surname) {
    const newUser = {
      ...mockUser,
      name,
      surname,
      email
    }
    res.status(200).json({
      token: 'mock-jwt-token-123',
      user: newUser
    })
  } else {
    res.status(400).json({ message: 'Rejestracja nie powiodła się' })
  }
})

// Custom route for logout (if needed)
server.post('/api/auth/logout', (req, res) => {
  res.status(200).json({ message: 'Wylogowano' })
})

// Rewrite routes to prefix with /api
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))

server.use(router)

const PORT = 3001
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})

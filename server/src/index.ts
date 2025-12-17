import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

// Route imports
import { authRouter } from './routes/auth.js'
import { passengerRouter } from './routes/passenger.js'
import { driverRouter } from './routes/driver.js'
import { paymentsRouter } from './routes/payments.js'
import { matchingRouter } from './routes/matching.js'
import { adminRouter } from './routes/admin.js'
import { waitlistRouter } from './routes/waitlist.js'

// Middleware
const app = express()
const PORT = process.env.BACKEND_PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/passenger', passengerRouter)
app.use('/api/driver', driverRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/matching', matchingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/waitlist', waitlistRouter)

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Yenko backend is running' })
})

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  })
})

app.listen(PORT, () => {
  console.log(`🚗 Yenko backend running on http://localhost:${PORT}`)
})

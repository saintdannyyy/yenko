import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'yenko-secret-key-change-in-production'

// Extend Express Request type
export interface AuthRequest extends Request {
  userId?: string
  userPhone?: string
  userRole?: 'driver' | 'passenger' | 'admin'
}

interface JWTPayload {
  userId: string
  phone: string
  role: 'driver' | 'passenger' | 'admin'
  iat: number
  exp: number
}

/**
 * Verify JWT token middleware
 * Adds userId, userPhone, and userRole to request
 */
export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No authorization header provided',
      })
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization format. Use: Bearer <token>',
      })
    }

    const token = authHeader.slice(7)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload

    // Attach user info to request
    req.userId = decoded.userId
    req.userPhone = decoded.phone
    req.userRole = decoded.role

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED',
      })
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        code: 'INVALID_TOKEN',
      })
    }

    console.error('Token verification error:', error)
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
    })
  }
}

/**
 * Require specific role(s) middleware
 * Use after verifyToken
 */
export function requireRole(allowedRoles: ('driver' | 'passenger' | 'admin')[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userRole) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      })
    }

    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
      })
    }

    next()
  }
}

/**
 * Require driver role
 */
export const requireDriver = requireRole(['driver'])

/**
 * Require passenger role
 */
export const requirePassenger = requireRole(['passenger'])

/**
 * Require admin role
 */
export const requireAdmin = requireRole(['admin'])

/**
 * Optional auth - doesn't fail if no token, but attaches user if present
 */
export function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next()
  }

  const token = authHeader.slice(7)

  if (!token) {
    return next()
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    req.userId = decoded.userId
    req.userPhone = decoded.phone
    req.userRole = decoded.role
  } catch {
    // Token invalid, but that's okay for optional auth
  }

  next()
}

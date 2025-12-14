import { Router, Request, Response } from 'express'
import { supabaseAdmin } from '../supabase/client'

export const waitlistRouter = Router()

// Add to waitlist
waitlistRouter.post('/join', async (req: Request, res: Response) => {
  try {
    const { email, phone, role } = req.body

    const { error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        email,
        phone,
        role,
        area: 'Accra',
      })

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, message: 'Added to waitlist' })
  } catch (error) {
    console.error('Waitlist error:', error)
    res.status(500).json({ success: false, message: 'Failed to join waitlist' })
  }
})

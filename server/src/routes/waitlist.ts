import { Router, Request, Response } from 'express'
import type { Router as ExpressRouter } from 'express'
import { supabaseAdmin } from '../supabase/client.js'

export const waitlistRouter: ExpressRouter = Router()

// Add to waitlist
waitlistRouter.post('/join', async (req: Request, res: Response) => {
  try {
    const { name, phone, email, area, role } = req.body

    // Validation
    if (!name || !phone || !role || !area) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, area, and role are required',
      })
    }

    // Check if already on waitlist
    const { data: existing } = await supabaseAdmin
      .from('waitlist')
      .select('id')
      .eq('phone', phone)
      .single()

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You are already on the waitlist',
      })
    }

    const { error } = await supabaseAdmin.from('waitlist').insert({
      name,
      phone,
      email: email || null,
      area,
      role,
    })

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({
      success: true,
      message: `Successfully joined the ${role} waitlist!`,
    })
  } catch (error) {
    console.error('Waitlist error:', error)
    res.status(500).json({ success: false, message: 'Failed to join waitlist' })
  }
})

// Get waitlist stats (public)
waitlistRouter.get('/stats', async (req: Request, res: Response) => {
  try {
    const { count } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    res.json({
      success: true,
      total: count || 0,
    })
  } catch (error) {
    console.error('Waitlist stats error:', error)
    res.status(500).json({ success: false, message: 'Failed to get stats' })
  }
})

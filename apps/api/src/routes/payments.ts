import { Router, Request, Response } from 'express'
import { supabaseAdmin } from '../supabase/client'
import { verifyToken } from '../middleware/auth'
import crypto from 'crypto'

export const paymentsRouter = Router()

// Initialize Paystack payment
paymentsRouter.post('/paystack/init', verifyToken, async (req: Request, res: Response) => {
  try {
    const { amount, email, metadata } = req.body
    const userId = req.userId

    // Mock Paystack integration
    // In production, call Paystack API: POST https://api.paystack.co/transaction/initialize
    const reference = `yenko_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

    // Create payment record
    const { data: payment, error } = await supabaseAdmin
      .from('payments')
      .insert({
        passenger_id: userId,
        driver_id: metadata?.driverId,
        amount: amount / 100, // Convert from pesewas
        provider: 'paystack',
        reference,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    // Mock Paystack response
    const authorization_url = `https://checkout.paystack.com/mock?reference=${reference}`

    res.json({
      success: true,
      authorization_url,
      reference,
    })
  } catch (error) {
    console.error('Paystack init error:', error)
    res.status(500).json({ success: false, message: 'Payment initialization failed' })
  }
})

// Handle Paystack webhook
paymentsRouter.post('/paystack/webhook', async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-paystack-signature'] as string
    const secret = process.env.PAYSTACK_SECRET_KEY || ''

    // Verify webhook signature
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex')

    if (hash !== signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' })
    }

    const { event, data } = req.body

    if (event === 'charge.success') {
      const { reference, status } = data

      // Update payment status
      const { error } = await supabaseAdmin
        .from('payments')
        .update({ status: 'paid' })
        .eq('reference', reference)

      if (error) {
        console.error('Update payment error:', error)
        return res.status(400).json({ success: false, message: error.message })
      }

      // Get payment and create/mark ride as paid
      const { data: payment } = await supabaseAdmin
        .from('payments')
        .select('*')
        .eq('reference', reference)
        .single()

      if (payment?.ride_id) {
        await supabaseAdmin
          .from('rides')
          .update({ status: 'payment_confirmed' })
          .eq('id', payment.ride_id)
      }
    }

    res.json({ success: true, message: 'Webhook processed' })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ success: false, message: 'Webhook processing failed' })
  }
})

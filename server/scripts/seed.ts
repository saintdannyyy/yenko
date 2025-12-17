import 'dotenv/config'
import { supabaseAdmin } from '../src/supabase/client'

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    // Delete existing test data (optional - comment out if you want to keep existing data)
    console.log('Cleaning up existing test data...')
    
    // Try to delete existing users by email
    const testEmails = ['admin@yenko.local', 'driver@yenko.local', 'passenger@yenko.local']
    for (const email of testEmails) {
      try {
        const { data: users } = await supabaseAdmin.auth.admin.listUsers()
        const existingUser = users.users.find(u => u.email === email)
        if (existingUser) {
          await supabaseAdmin.auth.admin.deleteUser(existingUser.id)
          console.log(`Deleted existing user: ${email}`)
        }
      } catch (e) {
        console.log(`No existing user to delete: ${email}`)
      }
    }

    // Create test users (using Supabase Auth)
    console.log('Creating test users...')
    const testAdmin = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@yenko.local',
      password: 'AdminPassword123!',
      email_confirm: true,
    })

    if (testAdmin.error) {
      console.error('Admin creation error:', testAdmin.error)
      throw testAdmin.error
    }
    const adminId = testAdmin.data?.user?.id
    if (!adminId) throw new Error('Failed to create admin user')

    const testDriver = await supabaseAdmin.auth.admin.createUser({
      email: 'driver@yenko.local',
      password: 'DriverPassword123!',
      email_confirm: true,
    })

    if (testDriver.error) {
      console.error('Driver creation error:', testDriver.error)
      throw testDriver.error
    }
    const driverId = testDriver.data?.user?.id
    if (!driverId) throw new Error('Failed to create driver user')

    const testPassenger = await supabaseAdmin.auth.admin.createUser({
      email: 'passenger@yenko.local',
      password: 'PassengerPassword123!',
      email_confirm: true,
    })

    if (testPassenger.error) {
      console.error('Passenger creation error:', testPassenger.error)
      throw testPassenger.error
    }
    const passengerId = testPassenger.data?.user?.id
    if (!passengerId) throw new Error('Failed to create passenger user')

    console.log('✓ Created test users')

    // Create profiles
    console.log('Creating profiles...')
    const { error: profileError } = await supabaseAdmin.from('profiles').upsert(
      [
        {
          id: adminId,
          full_name: 'Admin User',
          phone: '+233202248817',
          role: 'admin',
          suspended: false,
        },
        {
          id: driverId,
          full_name: 'John Doe',
          phone: '+233501234567',
          role: 'driver',
          suspended: false,
        },
        {
          id: passengerId,
          full_name: 'Jane Smith',
          phone: '+233509876543',
          role: 'passenger',
          suspended: false,
        },
      ],
      { onConflict: 'id' }
    )

    if (profileError) {
      console.error('Profile creation error:', profileError)
      throw profileError
    }
    console.log('✓ Created profiles')

    // Create driver record
    console.log('Creating driver record...')
    const { error: driverError } = await supabaseAdmin.from('drivers').insert({
      id: driverId,
      car_make: 'Toyota',
      car_model: 'Corolla',
      car_year: '2020',
      car_color: 'White',
      plate_number: 'GH-4567-AC',
      is_premium: false,
      seats: 4,
      condition_ac: true,
      condition_quiet: false,
      condition_music: true,
      verified: true,
      current_lat: 5.6037,
      current_lng: -0.187,
    })

    if (driverError) {
      console.error('Driver record error:', driverError)
      throw driverError
    }
    console.log('✓ Created driver profile')

    // Create passenger record
    console.log('Creating passenger record...')
    const { error: passengerError } = await supabaseAdmin
      .from('passengers')
      .insert({ id: passengerId })

    if (passengerError) {
      console.error('Passenger record error:', passengerError)
      throw passengerError
    }
    console.log('✓ Created passenger profile')

    // Create driver route
    console.log('Creating driver route...')
    const { error: routeError } = await supabaseAdmin
      .from('driver_routes')
      .insert({
        driver_id: driverId,
        start_location: { address: 'Osu, Accra', lat: 5.6037, lng: -0.187 },
        end_location: { address: 'Tema, Accra', lat: 5.5496, lng: -0.1989 },
        polyline: 'mock_polyline_data',
        departure_time: new Date(Date.now() + 86400000).toISOString(),
        seats: 4,
      })

    if (routeError) {
      console.error('Route creation error:', routeError)
      throw routeError
    }
    console.log('✓ Created driver route')

    // Create sample rides (more data for analytics)
    const now = new Date()
    const rides = []

    // Create rides for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)

      // 2-5 rides per day
      const ridesPerDay = Math.floor(Math.random() * 4) + 2

      for (let j = 0; j < ridesPerDay; j++) {
        const isCompleted = Math.random() > 0.2 // 80% completion rate
        const price = Math.floor(Math.random() * 30) + 15 // ₵15-45

        rides.push({
          passenger_id: passengerId,
          driver_id: driverId,
          pickup: { address: 'Osu, Accra', lat: 5.6037, lng: -0.187 },
          destination: { address: 'Tema, Accra', lat: 5.5496, lng: -0.1989 },
          distance_km: Math.floor(Math.random() * 20) + 10,
          estimated_price: price,
          final_price: isCompleted ? price : null,
          is_premium: false,
          status: isCompleted ? 'completed' : Math.random() > 0.5 ? 'pending' : 'cancelled',
          trip_code: `TEST${i}${j}`,
          created_at: date.toISOString(),
        })
      }
    }

    const { data: rideData, error: ridesError } = await supabaseAdmin
      .from('rides')
      .insert(rides)
      .select()

    if (ridesError) throw ridesError
    console.log(`✓ Created ${rides.length} sample rides`)

    // Create sample ratings for completed rides
    const completedRides = rideData?.filter((r) => r.status === 'completed') || []
    if (completedRides.length > 0) {
      const ratings = completedRides.map((ride) => ({
        ride_id: ride.id,
        driver_id: driverId,
        passenger_id: passengerId,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        comment: ['Great ride!', 'Excellent service', 'Very professional', 'Clean car!'][
          Math.floor(Math.random() * 4)
        ],
      }))

      const { error: ratingError } = await supabaseAdmin.from('ratings').insert(ratings)

      if (ratingError) throw ratingError
      console.log(`✓ Created ${ratings.length} sample ratings`)
    }

    // Create sample waitlist entries
    const { error: waitlistError } = await supabaseAdmin.from('waitlist').insert([
      {
        name: 'Michael Johnson',
        phone: '+233244111222',
        email: 'michael@example.com',
        area: 'Accra',
        role: 'driver',
      },
      {
        name: 'Sarah Williams',
        phone: '+233244333444',
        email: 'sarah@example.com',
        area: 'Kumasi',
        role: 'passenger',
      },
      {
        name: 'David Brown',
        phone: '+233244555666',
        email: 'david@example.com',
        area: 'Tema',
        role: 'driver',
      },
    ])

    if (waitlistError) throw waitlistError
    console.log('✓ Created waitlist entries')

    console.log('\n✅ Seeding complete!')
    console.log('\nTest credentials:')
    console.log('Admin:     admin@yenko.local / AdminPassword123!')
    console.log('Driver:    driver@yenko.local / DriverPassword123!')
    console.log('Passenger: passenger@yenko.local / PassengerPassword123!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()

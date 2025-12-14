import 'dotenv/config'
import { supabaseAdmin } from '../src/supabase/client'

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    // Create test users (using Supabase Auth)
    const testAdmin = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@yenko.local',
      password: 'AdminPassword123!',
      email_confirm: true,
    })

    if (testAdmin.error) throw testAdmin.error
    const adminId = testAdmin.data?.user?.id
    if (!adminId) throw new Error('Failed to create admin user')

    const testDriver = await supabaseAdmin.auth.admin.createUser({
      email: 'driver@yenko.local',
      password: 'DriverPassword123!',
      email_confirm: true,
    })

    if (testDriver.error) throw testDriver.error
    const driverId = testDriver.data?.user?.id
    if (!driverId) throw new Error('Failed to create driver user')

    const testPassenger = await supabaseAdmin.auth.admin.createUser({
      email: 'passenger@yenko.local',
      password: 'PassengerPassword123!',
      email_confirm: true,
    })

    if (testPassenger.error) throw testPassenger.error
    const passengerId = testPassenger.data?.user?.id
    if (!passengerId) throw new Error('Failed to create passenger user')

    console.log('✓ Created test users')

    // Create profiles
    const { error: profileError } = await supabaseAdmin.from('profiles').upsert(
      [
        {
          id: adminId,
          full_name: 'Admin User',
          phone: '+233550000000',
          role: 'admin',
        },
        {
          id: driverId,
          full_name: 'John Doe',
          phone: '+233501234567',
          role: 'driver',
        },
        {
          id: passengerId,
          full_name: 'Jane Smith',
          phone: '+233509876543',
          role: 'passenger',
        },
      ],
      { onConflict: 'id' }
    )

    if (profileError) throw profileError
    console.log('✓ Created profiles')

    // Create driver record
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

    if (driverError) throw driverError
    console.log('✓ Created driver profile')

    // Create passenger record
    const { error: passengerError } = await supabaseAdmin
      .from('passengers')
      .insert({ id: passengerId })

    if (passengerError) throw passengerError
    console.log('✓ Created passenger profile')

    // Create driver route
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

    if (routeError) throw routeError
    console.log('✓ Created driver route')

    // Create sample rides
    const { data: rideData, error: ridesError } = await supabaseAdmin
      .from('rides')
      .insert([
        {
          passenger_id: passengerId,
          driver_id: driverId,
          pickup: { address: 'Osu, Accra', lat: 5.6037, lng: -0.187 },
          destination: { address: 'Tema, Accra', lat: 5.5496, lng: -0.1989 },
          distance_km: 20,
          estimated_price: 27.0,
          final_price: 27.0,
          is_premium: false,
          status: 'completed',
          trip_code: 'TEST1',
        },
        {
          passenger_id: passengerId,
          driver_id: driverId,
          pickup: { address: 'Cantonments, Accra', lat: 5.5976, lng: -0.1745 },
          destination: { address: 'Airport, Accra', lat: 5.605, lng: -0.175 },
          distance_km: 10,
          estimated_price: 15.0,
          final_price: 15.0,
          is_premium: false,
          status: 'pending',
        },
      ])
      .select()

    if (ridesError) throw ridesError
    console.log('✓ Created sample rides')

    // Create sample ratings
    if (rideData?.[0]) {
      const { error: ratingError } = await supabaseAdmin.from('ratings').insert({
        ride_id: rideData[0].id,
        driver_id: driverId,
        passenger_id: passengerId,
        rating: 5,
        comment: 'Great driver, clean car!',
      })

      if (ratingError) throw ratingError
      console.log('✓ Created sample rating')
    }

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

-- Profiles table (sync with auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT UNIQUE,
  role TEXT CHECK (role IN ('driver','passenger','admin')) DEFAULT 'passenger',
  profile_photo TEXT,
  rating NUMERIC DEFAULT 5.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  car_make TEXT,
  car_model TEXT,
  car_year TEXT,
  car_color TEXT,
  plate_number TEXT UNIQUE,
  is_premium BOOLEAN DEFAULT false,
  seats INTEGER DEFAULT 4,
  condition_ac BOOLEAN DEFAULT true,
  condition_quiet BOOLEAN DEFAULT false,
  condition_music BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,
  current_lat DOUBLE PRECISION,
  current_lng DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Driver routes
CREATE TABLE IF NOT EXISTS driver_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE,
  start_location JSONB,
  end_location JSONB,
  polyline TEXT,
  departure_time TIMESTAMPTZ,
  seats INTEGER DEFAULT 4,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Passengers (light)
CREATE TABLE IF NOT EXISTS passengers (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rides
CREATE TABLE IF NOT EXISTS rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passenger_id UUID REFERENCES passengers(id) ON DELETE SET NULL,
  driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  pickup JSONB,
  destination JSONB,
  distance_km NUMERIC,
  estimated_price NUMERIC,
  final_price NUMERIC,
  is_premium BOOLEAN DEFAULT false,
  status TEXT CHECK (status IN ('pending','driver_assigned','en_route','arrived','started','completed','cancelled')) DEFAULT 'pending',
  trip_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES rides(id) ON DELETE SET NULL,
  passenger_id UUID REFERENCES passengers(id) ON DELETE SET NULL,
  driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  amount NUMERIC,
  provider TEXT DEFAULT 'paystack',
  reference TEXT UNIQUE,
  status TEXT CHECK (status IN ('pending','paid','failed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ratings / incidents
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES rides(id) ON DELETE SET NULL,
  driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  passenger_id UUID REFERENCES passengers(id) ON DELETE SET NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Driver locations (realtime)
CREATE TABLE IF NOT EXISTS driver_locations (
  driver_id UUID PRIMARY KEY REFERENCES drivers(id) ON DELETE CASCADE,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Waitlist
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  phone TEXT,
  email TEXT,
  role TEXT CHECK (role IN ('driver','passenger')),
  area TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles
CREATE POLICY "select own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Drivers
CREATE POLICY "insert driver by owner" ON drivers FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "select drivers public" ON drivers FOR SELECT USING (true);
CREATE POLICY "update driver by owner" ON drivers FOR UPDATE USING (auth.uid() = id);

-- Driver routes
CREATE POLICY "insert driver_routes by owner" ON driver_routes FOR INSERT WITH CHECK (auth.uid() = driver_id);
CREATE POLICY "select driver_routes public" ON driver_routes FOR SELECT USING (true);

-- Passengers
CREATE POLICY "insert passenger by owner" ON passengers FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "select own passenger" ON passengers FOR SELECT USING (auth.uid() = id);

-- Rides
CREATE POLICY "passenger create rides" ON rides FOR INSERT WITH CHECK (auth.uid() = passenger_id);
CREATE POLICY "read own rides" ON rides FOR SELECT USING (auth.uid() = passenger_id OR auth.uid() = driver_id);
CREATE POLICY "driver update ride status" ON rides FOR UPDATE USING (auth.uid() = driver_id);

-- Payments (server-only)
CREATE POLICY "payments server only" ON payments FOR INSERT WITH CHECK (false);
CREATE POLICY "select own payments" ON payments FOR SELECT USING (auth.uid() = passenger_id);

-- Ratings
CREATE POLICY "create own rating" ON ratings FOR INSERT WITH CHECK (auth.uid() = passenger_id OR auth.uid() = driver_id);
CREATE POLICY "read ratings" ON ratings FOR SELECT USING (true);

-- Driver locations
CREATE POLICY "update own location" ON driver_locations FOR UPDATE USING (auth.uid() = driver_id);
CREATE POLICY "select driver locations" ON driver_locations FOR SELECT USING (true);

-- Waitlist
CREATE POLICY "insert to waitlist" ON waitlist FOR INSERT WITH CHECK (true);

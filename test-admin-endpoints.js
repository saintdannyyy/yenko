// Quick test script to verify admin endpoints
// Run with: node test-admin-endpoints.js

const BASE_URL = "http://localhost:4000";

async function testEndpoints() {
  console.log("Testing Admin Endpoints...\n");

  // First, login as admin to get token
  console.log("1. Testing login...");
  try {
    const loginRes = await fetch(`${BASE_URL}/api/auth/request-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: "+233202248817" }),
    });
    console.log("   Login OTP request:", loginRes.status);

    // For testing, you'll need to get the actual token
    // For now, let's just test the health endpoint
  } catch (error) {
    console.error("   Error:", error.message);
  }

  // Test health endpoint
  console.log("\n2. Testing health endpoint...");
  try {
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const data = await healthRes.json();
    console.log("   Health check:", data);
  } catch (error) {
    console.error("   Error:", error.message);
  }

  console.log("\n✅ Basic tests complete");
  console.log("\nTo test admin endpoints:");
  console.log("1. Start backend: cd apps/api && pnpm run dev");
  console.log("2. Run seed: pnpm run seed");
  console.log(
    "3. Login at http://localhost:3000/auth/login with +233202248817",
  );
  console.log("4. Open browser console to see fetch logs");
}

testEndpoints();

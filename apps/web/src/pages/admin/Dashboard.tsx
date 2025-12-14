import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Input } from "@/components/input";
import { Users, Zap, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  full_name: string;
  phone: string;
  role: "driver" | "passenger" | "admin";
  created_at: string;
}

interface Driver extends User {
  is_premium: boolean;
  verified: boolean;
  rating: number;
}

interface Trip {
  id: string;
  passenger_id: string;
  driver_id: string;
  status: string;
  estimated_price: number;
  final_price?: number;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<User[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
      return;
    }

    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let endpoint = "/api/admin/users";

      if (activeTab === "drivers") {
        endpoint = "/api/admin/drivers";
      } else if (activeTab === "trips") {
        endpoint = "/api/admin/trips";
      }

      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        if (activeTab === "users") {
          setUsers(data.users || []);
        } else if (activeTab === "drivers") {
          setDrivers(data.drivers || []);
        } else if (activeTab === "trips") {
          setTrips(data.trips || []);
        }
      } else if (response.status === 401) {
        navigate("/auth/login");
      } else {
        toast.error("Failed to load data");
      }
    } catch (error) {
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDriver = async (driverId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/verify-driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ driver_id: driverId }),
      });

      if (response.ok) {
        toast.success("Driver verified!");
        fetchData();
      } else {
        toast.error("Failed to verify driver");
      }
    } catch (error) {
      toast.error("Error verifying driver");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery),
  );

  const filteredDrivers = drivers.filter((d) =>
    d.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredTrips = trips.filter(
    (t) => t.id.includes(searchQuery) || t.status.includes(searchQuery),
  );

  return (
    <div className="min-h-screen bg-yenko-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-yenko-deep mb-2">
              Admin Dashboard
            </h1>
            <p className="text-yenko-muted">Manage users, drivers, and trips</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth/login");
            }}
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-yenko-muted mb-1">Total Users</p>
                <p className="text-3xl font-bold text-yenko-deep">
                  {users.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-yenko-blue" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-yenko-muted mb-1">Active Drivers</p>
                <p className="text-3xl font-bold text-yenko-deep">
                  {drivers.filter((d) => d.verified).length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-yenko-yellow" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-yenko-muted mb-1">Total Trips</p>
                <p className="text-3xl font-bold text-yenko-deep">
                  {trips.length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-yenko-success" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3 border-b">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="drivers">Drivers</TabsTrigger>
              <TabsTrigger value="trips">Trips</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="p-6">
              <div className="mb-6">
                <Input
                  placeholder="Search by name or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {loading ? (
                <p className="text-yenko-muted">Loading users...</p>
              ) : filteredUsers.length === 0 ? (
                <p className="text-yenko-muted">No users found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-yenko-muted">
                      <tr>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Phone</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-yenko-muted/50 hover:bg-yenko-bg"
                        >
                          <td className="py-3 px-4 font-medium">
                            {user.full_name}
                          </td>
                          <td className="py-3 px-4 text-yenko-muted">
                            {user.phone}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                user.role === "driver"
                                  ? "bg-blue-100 text-blue-800"
                                  : user.role === "passenger"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-yenko-muted text-xs">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            {/* Drivers Tab */}
            <TabsContent value="drivers" className="p-6">
              <div className="mb-6">
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {loading ? (
                <p className="text-yenko-muted">Loading drivers...</p>
              ) : filteredDrivers.length === 0 ? (
                <p className="text-yenko-muted">No drivers found</p>
              ) : (
                <div className="space-y-3">
                  {filteredDrivers.map((driver) => (
                    <Card key={driver.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-yenko-deep">
                              {driver.full_name}
                            </h3>
                            {driver.verified ? (
                              <CheckCircle className="w-4 h-4 text-yenko-success" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yenko-danger" />
                            )}
                            {driver.is_premium && (
                              <span className="text-xs bg-yenko-yellow text-yenko-deep px-2 py-1 rounded">
                                PREMIUM
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-yenko-muted">
                            {driver.phone}
                          </p>
                          <p className="text-sm text-yenko-muted">
                            ⭐ {driver.rating.toFixed(1)}
                          </p>
                        </div>
                        {!driver.verified && (
                          <Button
                            onClick={() => handleVerifyDriver(driver.id)}
                            size="sm"
                            className="bg-yenko-blue hover:bg-yenko-deep text-white"
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Trips Tab */}
            <TabsContent value="trips" className="p-6">
              <div className="mb-6">
                <Input
                  placeholder="Search by trip ID or status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {loading ? (
                <p className="text-yenko-muted">Loading trips...</p>
              ) : filteredTrips.length === 0 ? (
                <p className="text-yenko-muted">No trips found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-yenko-muted">
                      <tr>
                        <th className="text-left py-3 px-4">Trip ID</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Est. Price</th>
                        <th className="text-left py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTrips.map((trip) => (
                        <tr
                          key={trip.id}
                          className="border-b border-yenko-muted/50 hover:bg-yenko-bg"
                        >
                          <td className="py-3 px-4 font-mono text-xs">
                            {trip.id.slice(0, 8)}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                trip.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : trip.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {trip.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium">
                            ₵{trip.estimated_price.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-yenko-muted text-xs">
                            {new Date(trip.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

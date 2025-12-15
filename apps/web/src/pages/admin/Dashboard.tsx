import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Users,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BarChart3,
  DollarSign,
  Activity,
  UserX,
  Trash2,
  Eye,
  Download,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface User {
  id: string;
  full_name: string;
  phone: string;
  role: "driver" | "passenger" | "admin";
  suspended?: boolean;
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

interface WaitlistEntry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  area: string;
  role: "driver" | "passenger";
  created_at: string;
}

interface Analytics {
  totalUsers: number;
  totalDrivers: number;
  verifiedDrivers: number;
  premiumDrivers: number;
  totalRides: number;
  completedRides: number;
  pendingRides: number;
  cancelledRides: number;
  totalRevenue: number;
  averageRidePrice: string;
  completionRate: string;
  last7Days: Array<{ date: string; revenue: number; rides: number }>;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    fetchData();
  }, [activeTab, token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!token) {
        navigate("/auth/login");
        return;
      }

      // Fetch analytics for overview tab
      if (activeTab === "overview") {
        console.log("Fetching analytics...");
        const analyticsRes = await fetch("/api/admin/analytics/detailed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Analytics response status:", analyticsRes.status);
        if (analyticsRes.ok) {
          const data = await analyticsRes.json();
          console.log("Analytics data:", data);
          setAnalytics(data.analytics);
        } else {
          const errorData = await analyticsRes.json().catch(() => ({}));
          console.error(
            "Analytics fetch failed:",
            analyticsRes.status,
            errorData,
          );
          toast.error("Failed to load analytics");
        }
      }

      let endpoint = "/api/admin/users";
      if (activeTab === "drivers") {
        endpoint = "/api/admin/drivers";
      } else if (activeTab === "trips") {
        endpoint = "/api/admin/trips";
      } else if (activeTab === "waitlist") {
        endpoint = "/api/admin/waitlist";
      }

      if (activeTab !== "overview") {
        console.log(`Fetching ${activeTab} from ${endpoint}...`);
        const response = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(`${activeTab} response status:`, response.status);

        if (response.ok) {
          const data = await response.json();
          console.log(`${activeTab} data:`, data);
          if (activeTab === "users") {
            setUsers(data.users || []);
          } else if (activeTab === "drivers") {
            setDrivers(data.drivers || []);
          } else if (activeTab === "trips") {
            setTrips(data.trips || []);
          } else if (activeTab === "waitlist") {
            setWaitlist(data.waitlist || []);
          }
        } else if (response.status === 401) {
          console.error("Unauthorized - redirecting to login");
          navigate("/auth/login");
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error(
            `Failed to load ${activeTab}:`,
            response.status,
            errorData,
          );
          toast.error(`Failed to load ${activeTab}`);
        }
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error(
        "Error loading data: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDriver = async (driverId: string) => {
    try {
      if (!token) return;
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

  const handleSuspendUser = async (userId: string, suspend: boolean) => {
    try {
      if (!token) return;
      const response = await fetch("/api/admin/suspend-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, suspend }),
      });

      if (response.ok) {
        toast.success(suspend ? "User suspended" : "User activated");
        fetchData();
      } else {
        toast.error("Failed to update user status");
      }
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      if (!token) return;
      const response = await fetch(`/api/admin/delete-user/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success("User deleted");
        fetchData();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${val}"`)
        .join(","),
    );
    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
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

  const filteredWaitlist = waitlist.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.phone.includes(searchQuery) ||
      w.area.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Chart colors
  const COLORS = ["#0057FF", "#FFD400", "#10B981", "#EF4444"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-yellow-50/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yenko-blue to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-yenko-muted text-sm">
              Comprehensive carpooling management • {user?.full_name}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              logout();
              navigate("/auth/login");
            }}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all"
          >
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-5 border-b bg-gradient-to-r from-gray-50 to-blue-50/50 p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-yenko-blue transition-all"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-yenko-blue transition-all"
              >
                <Users className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="drivers"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-yenko-blue transition-all"
              >
                <Zap className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Drivers</span>
              </TabsTrigger>
              <TabsTrigger
                value="trips"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-yenko-blue transition-all"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Trips</span>
              </TabsTrigger>
              <TabsTrigger
                value="waitlist"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-yenko-blue transition-all"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Waitlist</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6">
              {loading ? (
                <p className="text-yenko-muted">Loading analytics...</p>
              ) : analytics ? (
                <div className="space-y-6">
                  {/* Key Stats */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <Card className="p-6 bg-gradient-to-br from-blue-50 via-blue-100/50 to-white border-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-2 font-medium">
                            Total Users
                          </p>
                          <p className="text-4xl font-bold text-yenko-blue group-hover:scale-105 transition-transform">
                            {analytics.totalUsers}
                          </p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-yenko-blue group-hover:scale-110 transition-all">
                          <Users className="w-6 h-6 text-yenko-blue group-hover:text-white" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-yellow-50 via-yellow-100/50 to-white border-yellow-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-2 font-medium">
                            Total Revenue
                          </p>
                          <p className="text-4xl font-bold text-yellow-600 group-hover:scale-105 transition-transform">
                            ₵{analytics.totalRevenue.toFixed(0)}
                          </p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-xl group-hover:bg-yenko-yellow group-hover:scale-110 transition-all">
                          <DollarSign className="w-6 h-6 text-yellow-600 group-hover:text-yenko-deep" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-green-50 via-green-100/50 to-white border-green-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-2 font-medium">
                            Completed Trips
                          </p>
                          <p className="text-4xl font-bold text-green-600 group-hover:scale-105 transition-transform">
                            {analytics.completedRides}
                          </p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-500 group-hover:scale-110 transition-all">
                          <CheckCircle className="w-6 h-6 text-green-600 group-hover:text-white" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-purple-50 via-purple-100/50 to-white border-purple-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-2 font-medium">
                            Active Drivers
                          </p>
                          <p className="text-4xl font-bold text-purple-600 group-hover:scale-105 transition-transform">
                            {analytics.verifiedDrivers}
                          </p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-500 group-hover:scale-110 transition-all">
                          <Zap className="w-6 h-6 text-purple-600 group-hover:text-white" />
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Secondary Stats */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <Card className="p-5 border-l-4 border-yenko-blue hover:shadow-md transition-all bg-white/80 backdrop-blur">
                      <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                        Avg Ride Price
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        ₵{analytics.averageRidePrice}
                      </p>
                    </Card>
                    <Card className="p-5 border-l-4 border-green-500 hover:shadow-md transition-all bg-white/80 backdrop-blur">
                      <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                        Completion Rate
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        {analytics.completionRate}%
                      </p>
                    </Card>
                    <Card className="p-5 border-l-4 border-yenko-yellow hover:shadow-md transition-all bg-white/80 backdrop-blur">
                      <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                        Premium Drivers
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        {analytics.premiumDrivers}
                      </p>
                    </Card>
                    <Card className="p-5 border-l-4 border-orange-500 hover:shadow-md transition-all bg-white/80 backdrop-blur">
                      <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                        Pending Rides
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        {analytics.pendingRides}
                      </p>
                    </Card>
                  </div>

                  {/* Charts */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Revenue Chart */}
                    <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/90 backdrop-blur">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-yenko-blue" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">
                          Revenue (Last 7 Days)
                        </h3>
                      </div>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analytics.last7Days}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) =>
                              new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            }
                          />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#0057FF"
                            strokeWidth={2}
                            name="Revenue (₵)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Card>

                    {/* Rides Chart */}
                    <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/90 backdrop-blur">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <BarChart3 className="w-5 h-5 text-yenko-yellow" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">
                          Rides (Last 7 Days)
                        </h3>
                      </div>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analytics.last7Days}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) =>
                              new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            }
                          />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="rides"
                            fill="#FFD400"
                            name="Completed Rides"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>
                  </div>

                  {/* Ride Status Distribution */}
                  <Card className="p-6 border-0 shadow-lg bg-white/90 backdrop-blur">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Activity className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Ride Status Distribution
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              {
                                name: "Completed",
                                value: analytics.completedRides,
                              },
                              {
                                name: "Pending",
                                value: analytics.pendingRides,
                              },
                              {
                                name: "Cancelled",
                                value: analytics.cancelledRides,
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#10B981" />
                            <Cell fill="#FFD400" />
                            <Cell fill="#EF4444" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-col justify-center space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded bg-green-500 mr-2"></div>
                            <span>Completed</span>
                          </div>
                          <span className="font-bold">
                            {analytics.completedRides}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded bg-yellow-500 mr-2"></div>
                            <span>Pending</span>
                          </div>
                          <span className="font-bold">
                            {analytics.pendingRides}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded bg-red-500 mr-2"></div>
                            <span>Cancelled</span>
                          </div>
                          <span className="font-bold">
                            {analytics.cancelledRides}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <p>No analytics data available</p>
              )}
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="p-6">
              <div className="mb-6 flex justify-between items-center">
                <Input
                  placeholder="Search by name or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportToCSV(users, "users")}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 transition-all shadow-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Export CSV</span>
                </Button>
              </div>

              {loading ? (
                <p className="text-yenko-muted">Loading users...</p>
              ) : filteredUsers.length === 0 ? (
                <p className="text-yenko-muted">No users found</p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-gray-50 to-blue-50/30">
                      <tr>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Phone
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Role
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Joined
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-blue-50/50 transition-colors group"
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
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                user.suspended
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {user.suspended ? "Suspended" : "Active"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-yenko-muted text-xs">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSuspendUser(user.id, !user.suspended)
                                }
                                disabled={user.role === "admin"}
                                className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all"
                                title={
                                  user.suspended
                                    ? "Activate user"
                                    : "Suspend user"
                                }
                              >
                                <UserX className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={user.role === "admin"}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all"
                                title="Delete user"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
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
                    <Card
                      key={driver.id}
                      className="p-5 hover:shadow-lg transition-all duration-300 border-l-4 border-yenko-blue bg-white/80 backdrop-blur group"
                    >
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
                            className="bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-yenko-blue text-white shadow-md hover:shadow-lg transition-all"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
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
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-gray-50 to-blue-50/30">
                      <tr>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Trip ID
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Est. Price
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredTrips.map((trip) => (
                        <tr
                          key={trip.id}
                          className="hover:bg-blue-50/50 transition-colors cursor-pointer"
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

            {/* Waitlist Tab */}
            <TabsContent value="waitlist" className="p-6">
              <div className="mb-6 flex justify-between items-center">
                <Input
                  placeholder="Search by name, phone, or area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportToCSV(waitlist, "waitlist")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              {loading ? (
                <p className="text-yenko-muted">Loading waitlist...</p>
              ) : filteredWaitlist.length === 0 ? (
                <p className="text-yenko-muted">No waitlist entries found</p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-gray-50 to-blue-50/30">
                      <tr>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Phone
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Email
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Area
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Role
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredWaitlist.map((entry) => (
                        <tr
                          key={entry.id}
                          className="hover:bg-blue-50/50 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium">
                            {entry.name}
                          </td>
                          <td className="py-3 px-4">{entry.phone}</td>
                          <td className="py-3 px-4 text-yenko-muted">
                            {entry.email || "-"}
                          </td>
                          <td className="py-3 px-4">{entry.area}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                entry.role === "driver"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {entry.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-yenko-muted text-xs">
                            {new Date(entry.created_at).toLocaleDateString()}
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

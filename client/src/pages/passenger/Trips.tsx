import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader, BottomNav } from "@/components/app-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ChevronRight,
  Car,
  CheckCircle2,
  XCircle,
  Loader2,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock trip data - in real app this would come from API
const mockTrips = [
  {
    id: "trip-001",
    status: "completed",
    date: "2024-12-20",
    time: "09:30 AM",
    from: "University of Ghana, Legon",
    to: "Accra Mall",
    driver: {
      name: "Kofi Mensah",
      photo: null,
      rating: 4.8,
      car: "Toyota Corolla",
      plate: "GR-1234-24",
    },
    price: 25.0,
    code: "8A2K",
  },
  {
    id: "trip-002",
    status: "completed",
    date: "2024-12-19",
    time: "02:15 PM",
    from: "Osu, Oxford Street",
    to: "Kotoka Airport",
    driver: {
      name: "Ama Serwaa",
      photo: null,
      rating: 4.9,
      car: "Honda Civic",
      plate: "GW-5678-23",
    },
    price: 45.0,
    code: "3B7X",
  },
  {
    id: "trip-003",
    status: "cancelled",
    date: "2024-12-18",
    time: "11:00 AM",
    from: "East Legon",
    to: "Tema Community 1",
    driver: null,
    price: 0,
    code: "9C4M",
  },
  {
    id: "trip-004",
    status: "in_progress",
    date: "2024-12-20",
    time: "11:45 AM",
    from: "Madina Market",
    to: "Circle VIP Station",
    driver: {
      name: "Yaw Boateng",
      photo: null,
      rating: 4.7,
      car: "Hyundai Accent",
      plate: "GA-9012-24",
    },
    price: 18.0,
    code: "2D5P",
  },
];

type TripStatus = "all" | "in_progress" | "completed" | "cancelled";

export default function PassengerTrips() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TripStatus>("all");

  const filteredTrips = mockTrips.filter((trip) => {
    if (activeTab === "all") return true;
    return trip.status === activeTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-0 gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 border-0 gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700 border-0 gap-1">
            <XCircle className="w-3 h-3" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <AppHeader title="My Trips" />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Tab Filter */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TripStatus)}
          className="mb-6"
        >
          <TabsList className="grid grid-cols-4 w-full h-12 bg-white border border-gray-100 rounded-xl p-1">
            <TabsTrigger
              value="all"
              className="rounded-lg text-sm data-[state=active]:bg-yenko-blue data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="in_progress"
              className="rounded-lg text-sm data-[state=active]:bg-yenko-blue data-[state=active]:text-white"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-lg text-sm data-[state=active]:bg-yenko-blue data-[state=active]:text-white"
            >
              Done
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="rounded-lg text-sm data-[state=active]:bg-yenko-blue data-[state=active]:text-white"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Trips List */}
        {filteredTrips.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <History className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No trips yet</h3>
              <p className="text-gray-500 text-sm mb-4">
                {activeTab === "all"
                  ? "You haven't taken any trips yet"
                  : `No ${activeTab.replace("_", " ")} trips`}
              </p>
              <Button
                onClick={() => navigate("/passenger/home")}
                className="bg-yenko-blue hover:bg-yenko-blue/90"
              >
                Book a Ride
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredTrips.map((trip) => (
              <Card
                key={trip.id}
                className={cn(
                  "border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden",
                  trip.status === "in_progress" && "ring-2 ring-yenko-blue/20",
                )}
                onClick={() => navigate(`/passenger/trip/${trip.id}`)}
              >
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {trip.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {trip.time}
                      </div>
                    </div>
                    {getStatusBadge(trip.status)}
                  </div>

                  {/* Route */}
                  <div className="px-4 py-4">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div className="w-0.5 h-8 bg-gray-200" />
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">
                            Pick up
                          </p>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {trip.from}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">
                            Drop off
                          </p>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {trip.to}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                    {trip.driver ? (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yenko-blue to-blue-600 flex items-center justify-center">
                          <Car className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {trip.driver.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {trip.driver.car} • {trip.driver.plate}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm">No driver assigned</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      {trip.price > 0 && (
                        <div className="flex items-center gap-1 text-gray-900 font-semibold">
                          <DollarSign className="w-4 h-4" />
                          {trip.price.toFixed(2)}
                        </div>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Book New Ride Button */}
        <div className="mt-6">
          <Button
            onClick={() => navigate("/passenger/home")}
            className="w-full bg-yenko-blue hover:bg-yenko-blue/90 h-12 text-base font-semibold shadow-lg"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Book New Ride
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Settings,
  LogOut,
  ChevronLeft,
  Car,
  Users,
  Home,
  MapPin,
  DollarSign,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  className?: string;
  transparent?: boolean;
}

export function AppHeader({
  title,
  showBack = false,
  onBack,
  className,
  transparent = false,
}: AppHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login", { replace: true });
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleIcon = () => {
    if (user?.role === "driver") {
      return <Car className="w-3 h-3" />;
    }
    return <Users className="w-3 h-3" />;
  };

  // Navigation items based on role
  const getNavItems = () => {
    if (user?.role === "driver") {
      return [
        { href: "/driver/direction", icon: MapPin, label: "Route" },
        { href: "/driver/requests", icon: Bell, label: "Requests" },
        { href: "/driver/earnings", icon: DollarSign, label: "Earnings" },
      ];
    }
    return [
      { href: "/passenger/home", icon: Home, label: "Home" },
      { href: "/passenger/trips", icon: Car, label: "Trips" },
    ];
  };

  const navItems = getNavItems();

  return (
    <header
      className={cn(
        "px-4 h-16 flex items-center justify-between sticky top-0 z-50 transition-all",
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}
        {title ? (
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        ) : (
          <Link to="/" className="flex items-center">
            <img src="/yenko.png" alt="Yenko" className="h-8 w-auto" />
          </Link>
        )}
      </div>

      {/* Center Navigation (Desktop) */}
      {user && !showBack && (
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-yenko-blue text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}

      {/* Right side */}
      <div className="flex items-center gap-3">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-all outline-none">
                <Avatar className="w-9 h-9 border-2 border-gray-100">
                  <AvatarImage src={user.profile_photo || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-yenko-blue to-blue-600 text-white text-sm font-semibold">
                    {getInitials(user.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                    {user.full_name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
                    {getRoleIcon()}
                    {user.role}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl shadow-lg border-gray-100"
            >
              <div className="px-3 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-t-lg">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.full_name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.phone}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer py-2.5"
              >
                <User className="w-4 h-4 mr-3 text-gray-500" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="cursor-pointer py-2.5"
              >
                <Settings className="w-4 h-4 mr-3 text-gray-500" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

// Bottom navigation for mobile
export function BottomNav() {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  const getNavItems = () => {
    if (user?.role === "driver") {
      return [
        { href: "/driver/direction", icon: MapPin, label: "Route" },
        { href: "/driver/requests", icon: Bell, label: "Requests" },
        { href: "/driver/earnings", icon: DollarSign, label: "Earnings" },
        { href: "/profile", icon: User, label: "Profile" },
      ];
    }
    return [
      { href: "/passenger/home", icon: Home, label: "Home" },
      { href: "/passenger/trips", icon: Car, label: "Trips" },
      { href: "/profile", icon: User, label: "Profile" },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pb-safe z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.href ||
            location.pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px]",
                isActive
                  ? "text-yenko-blue"
                  : "text-gray-400 hover:text-gray-600",
              )}
            >
              <item.icon
                className={cn("w-5 h-5", isActive && "stroke-[2.5px]")}
              />
              <span
                className={cn(
                  "text-xs",
                  isActive ? "font-semibold" : "font-medium",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

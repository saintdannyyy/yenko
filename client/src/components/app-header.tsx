import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { User, Settings, LogOut, ChevronLeft, Car, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  className?: string;
}

export function AppHeader({
  title,
  showBack = false,
  onBack,
  className,
}: AppHeaderProps) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    logout();
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

  return (
    <header
      className={cn(
        "bg-white border-b border-yenko-separator px-4 h-14 flex items-center justify-between sticky top-0 z-50",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-yenko-bgSecondary transition-apple"
          >
            <ChevronLeft className="w-6 h-6 text-yenko-blue" />
          </button>
        )}
        {title ? (
          <h1 className="text-headline text-yenko-label">{title}</h1>
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">🚗</span>
            <span className="text-headline text-yenko-label font-semibold">
              Yenko
            </span>
          </Link>
        )}
      </div>

      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 rounded-full hover:bg-yenko-bgSecondary transition-apple outline-none">
              <Avatar className="w-8 h-8 border border-yenko-separator">
                <AvatarImage src={user.profile_photo || undefined} />
                <AvatarFallback className="bg-yenko-blue text-white text-xs font-medium">
                  {getInitials(user.full_name)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2">
              <p className="text-subheadline font-medium text-yenko-label truncate">
                {user.full_name || "User"}
              </p>
              <p className="text-footnote text-yenko-muted truncate">
                {user.phone}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {getRoleIcon()}
                <span className="text-caption text-yenko-secondary capitalize">
                  {user.role}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              className="cursor-pointer"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/settings")}
              className="cursor-pointer"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-yenko-danger focus:text-yenko-danger"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}

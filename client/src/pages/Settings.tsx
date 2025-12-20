import { useNavigate } from "react-router-dom";
import { AppHeader, BottomNav } from "@/components/app-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/authStore";
import {
  Bell,
  Globe,
  Moon,
  Shield,
  Smartphone,
  HelpCircle,
  FileText,
  MessageSquare,
  LogOut,
  ChevronRight,
  Lock,
  CreditCard,
  User,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
}

function SettingItem({
  icon,
  label,
  description,
  onClick,
  trailing,
}: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors text-left",
        onClick ? "cursor-pointer" : "cursor-default",
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900">{label}</p>
        {description && (
          <p className="text-sm text-gray-500 truncate">{description}</p>
        )}
      </div>
      {trailing ||
        (onClick && <ChevronRight className="w-5 h-5 text-gray-400" />)}
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  // Settings state (would be persisted in real app)
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <AppHeader title="Settings" showBack />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Account Section */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-semibold text-gray-900">
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <SettingItem
              icon={<User className="w-5 h-5 text-gray-600" />}
              label="Edit Profile"
              description="Update your personal information"
              onClick={() => navigate("/profile")}
            />
            <Separator />
            <SettingItem
              icon={<Lock className="w-5 h-5 text-gray-600" />}
              label="Security"
              description="Password and authentication"
              onClick={() => {}}
            />
            <Separator />
            <SettingItem
              icon={<CreditCard className="w-5 h-5 text-gray-600" />}
              label="Payment Methods"
              description="Manage your payment options"
              onClick={() => {}}
            />
          </CardContent>
        </Card>

        {/* Preferences Section */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-semibold text-gray-900">
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <SettingItem
              icon={<Bell className="w-5 h-5 text-gray-600" />}
              label="Notifications"
              description={notifications ? "Enabled" : "Disabled"}
              trailing={
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              }
            />
            <Separator />
            <SettingItem
              icon={<Moon className="w-5 h-5 text-gray-600" />}
              label="Dark Mode"
              description={darkMode ? "On" : "Off"}
              trailing={
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              }
            />
            <Separator />
            <SettingItem
              icon={<Globe className="w-5 h-5 text-gray-600" />}
              label="Language"
              description="English"
              onClick={() => {}}
            />
            <Separator />
            <SettingItem
              icon={<Smartphone className="w-5 h-5 text-gray-600" />}
              label="Location Sharing"
              description={locationSharing ? "Share during trips" : "Disabled"}
              trailing={
                <Switch
                  checked={locationSharing}
                  onCheckedChange={setLocationSharing}
                />
              }
            />
          </CardContent>
        </Card>

        {/* Privacy & Safety */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-semibold text-gray-900">
              Privacy & Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <SettingItem
              icon={<Shield className="w-5 h-5 text-gray-600" />}
              label="Privacy Settings"
              description="Control your data"
              onClick={() => {}}
            />
            <Separator />
            <SettingItem
              icon={<FileText className="w-5 h-5 text-gray-600" />}
              label="Terms of Service"
              onClick={() => {}}
            />
            <Separator />
            <SettingItem
              icon={<FileText className="w-5 h-5 text-gray-600" />}
              label="Privacy Policy"
              onClick={() => {}}
            />
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-semibold text-gray-900">
              Support
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <SettingItem
              icon={<HelpCircle className="w-5 h-5 text-gray-600" />}
              label="Help Center"
              description="FAQs and guides"
              onClick={() => {}}
            />
            <Separator />
            <SettingItem
              icon={<MessageSquare className="w-5 h-5 text-gray-600" />}
              label="Contact Support"
              description="Get help from our team"
              onClick={() => {}}
            />
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center py-4 text-sm text-gray-500">
          <p>Yenko v1.0.0</p>
          <p className="mt-1">Made with ❤️ in Ghana</p>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}

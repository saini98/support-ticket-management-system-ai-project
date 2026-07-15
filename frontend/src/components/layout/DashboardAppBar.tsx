import Header from "./Header";
import { useAuth } from "../../context/AuthContext";

interface DashboardAppBarProps {
  onMenuClick: () => void;
}

function DashboardAppBar({ onMenuClick }: DashboardAppBarProps) {
  const { user, logout } = useAuth();

  return (
    <Header
      onMenuClick={onMenuClick}
      userName={user?.name}
      onLogout={logout}
    />
  );
}

export default DashboardAppBar;

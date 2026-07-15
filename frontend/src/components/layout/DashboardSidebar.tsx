import Sidebar from "./Sidebar";

interface DashboardSidebarProps {
  onNavigate?: () => void;
}

function DashboardSidebar({ onNavigate }: DashboardSidebarProps) {
  return <Sidebar onNavigate={onNavigate} />;
}

export default DashboardSidebar;

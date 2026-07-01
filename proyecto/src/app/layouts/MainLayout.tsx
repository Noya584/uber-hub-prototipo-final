import { Outlet } from 'react-router';
import { LeftSidebar } from '../components/layout/LeftSidebar';
import { Topbar } from '../components/layout/Topbar';
import { RightPanel } from '../components/layout/RightPanel';

export function MainLayout() {
  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <Topbar />
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
        <RightPanel />
      </div>
    </div>
  );
}

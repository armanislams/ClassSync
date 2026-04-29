import { NavLink, Outlet, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import {
  FaChalkboardTeacher,
  FaCalendarPlus,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUserGraduate,
  FaHome,
  FaBars,
} from 'react-icons/fa';
import { useState } from 'react';

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, roleLoading } = useRole();

  const isTeacher = role === 'teacher';

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm ${
      isActive
        ? 'bg-primary text-primary-content shadow-md'
        : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
    }`;

  const teacherLinks = (
    <>
      <NavLink to="/dashboard" end className={navLinkClass}>
        <FaHome size={16} /> Overview
      </NavLink>
      <NavLink to="/dashboard/add-slot" className={navLinkClass}>
        <FaCalendarPlus size={16} /> Add Slot
      </NavLink>
      <NavLink to="/dashboard/my-slots" className={navLinkClass}>
        <FaCalendarAlt size={16} /> My Slots
      </NavLink>
    </>
  );

  const studentLinks = (
    <>
      <NavLink to="/dashboard" end className={navLinkClass}>
        <FaHome size={16} /> Overview
      </NavLink>
      <NavLink to="/dashboard/book-slot" className={navLinkClass}>
        <FaCalendarAlt size={16} /> Book a Slot
      </NavLink>
      <NavLink to="/dashboard/my-bookings" className={navLinkClass}>
        <FaUserGraduate size={16} /> My Bookings
      </NavLink>
    </>
  );

  const sidebar = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-base-300">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <FaChalkboardTeacher className="text-primary-content" size={18} />
          </div>
          <span className="text-xl font-bold text-base-content">ClassSync</span>
        </div>
        <div className="mt-3">
          <span className={`badge badge-sm ${isTeacher ? 'badge-secondary' : 'badge-primary'}`}>
            {isTeacher ? 'Teacher' : 'Student'}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {isTeacher ? teacherLinks : studentLinks}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-base-300">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="avatar placeholder">
            <div className="w-9 rounded-full bg-primary text-primary-content">
              <span className="text-sm font-bold">
                {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.displayName || 'User'}</p>
            <p className="text-xs text-base-content/50 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-sm w-full justify-start gap-2 text-error hover:bg-error/10"
        >
          <FaSignOutAlt size={14} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-base-100 border-r border-base-300 min-h-screen fixed left-0 top-0">
        {sidebar}
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-base-100 border-r border-base-300 flex flex-col z-50">
            {sidebar}
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="bg-base-100 border-b border-base-300 px-6 py-4 flex items-center gap-4 sticky top-0 z-40">
          <button
            className="lg:hidden btn btn-ghost btn-sm"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={18} />
          </button>
          <h1 className="text-lg font-semibold text-base-content">
            Welcome back, <span className="text-primary">{user?.displayName || 'there'}!</span>
          </h1>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

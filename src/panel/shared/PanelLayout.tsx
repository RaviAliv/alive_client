import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ROLE_LABEL: Record<string, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  user: "Student",
};

const ROLE_COLOR: Record<string, string> = {
  superadmin: "bg-[rgba(168,121,40,0.2)] text-[#f7db7d]",
  admin: "bg-[rgba(30,90,166,0.3)] text-blue-300",
  user: "bg-[rgba(33,134,78,0.25)] text-green-300",
};

function NavItem({ to, label, icon, end }: { to: string; label: string; icon: React.ReactNode; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
          isActive
            ? "bg-[rgba(197,164,109,0.15)] text-[#f7db7d] border border-[rgba(197,164,109,0.25)]"
            : "text-ivory/60 hover:text-ivory hover:bg-white/[0.05]"
        }`
      }
    >
      <span className="w-4 h-4 shrink-0">{icon}</span>
      {label}
    </NavLink>
  );
}

export default function PanelLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.systemRole ?? "user";

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#1E2A44] flex flex-col fixed inset-y-0 left-0 z-50">

        {/* Logo area */}
        <div className="px-5 py-4 border-b border-[rgba(197,164,109,0.12)]">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/images/logo.png" alt="STAR" className="h-8 w-auto" />
            <div className="leading-tight">
              <p className="text-[11px] font-semibold text-[#f7db7d]/90 tracking-wide">STAR Academy</p>
              <p className="text-[9px] text-ivory/30 tracking-wider uppercase">Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

          {role === "superadmin" && (
            <>
              <p className="px-4 mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-ivory/25">Super Admin</p>
              <NavItem to="/panel/super" end label="Dashboard" icon={<IcoGrid />} />
              <NavItem to="/panel/super/users" label="All Users" icon={<IcoUsers />} />
              <NavItem to="/panel/super/admins" label="Manage Admins" icon={<IcoShield />} />
            </>
          )}

          {role === "admin" && (
            <>
              <p className="px-4 mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-ivory/25">Admin</p>
              <NavItem to="/panel/admin" end label="Dashboard" icon={<IcoGrid />} />
              <NavItem to="/panel/admin/grant" label="Grant Access" icon={<IcoKey />} />
            </>
          )}

          {role === "user" && (
            <>
              <p className="px-4 mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-ivory/25">My Access</p>
              <NavItem to="/panel/my-courses" label="My Courses" icon={<IcoBook />} />
              <NavItem to="/video" label="Video Library" icon={<IcoPlay />} />
            </>
          )}

          <div className="pt-4 mt-4 border-t border-[rgba(197,164,109,0.1)]">
            <NavItem to="/" label="HOME" icon={<IcoHome />} />
          </div>
        </nav>

        {/* User info + logout */}
        <div className="px-3 py-4 border-t border-[rgba(197,164,109,0.12)]">
          <div className="flex items-center gap-2.5 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[rgba(197,164,109,0.2)] flex items-center justify-center text-[#f7db7d] font-bold text-sm uppercase shrink-0">
              {user?.name?.[0] ?? "?"}
            </div>
            <div className="min-w-0">
              <p className="text-ivory text-[13px] font-medium truncate">{user?.name}</p>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold tracking-wide uppercase ${ROLE_COLOR[role]}`}>
                {ROLE_LABEL[role]}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-[12px] text-ivory/40 hover:text-ivory/80 hover:bg-white/[0.05] rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 ml-56 min-h-screen flex flex-col">
        <main className="flex-1 p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Icons
function IcoGrid() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
}
function IcoUsers() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" /></svg>;
}
function IcoShield() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
}
function IcoKey() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>;
}
function IcoBook() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
}
function IcoHome() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
}
function IcoPlay() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}

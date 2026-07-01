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
        `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
          isActive
            ? "bg-[rgba(197,164,109,0.18)] text-[#f7db7d] border border-[rgba(197,164,109,0.28)]"
            : "text-ivory/55 hover:text-ivory/90 hover:bg-white/[0.06]"
        }`
      }
    >
      <span className="w-4 h-4 shrink-0 opacity-80">{icon}</span>
      {label}
    </NavLink>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-3.5 mt-5 mb-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-ivory/22">
      {children}
    </p>
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
      <aside className="w-58 shrink-0 bg-[#1A2238] flex flex-col fixed inset-y-0 left-0 z-50 border-r border-[rgba(197,164,109,0.08)]"
        style={{ width: "224px" }}>

        {/* Logo */}
        <div className="px-5 py-4 border-b border-[rgba(197,164,109,0.1)]">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/images/logo.png" alt="STAR" className="h-8 w-auto" />
            <div className="leading-tight">
              <p className="text-[11.5px] font-semibold text-[#f7db7d]/90 tracking-wide">STAR Academy</p>
              <p className="text-[9px] text-ivory/25 tracking-[0.2em] uppercase">Control Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">

          {role === "superadmin" && (
            <>
              <SectionLabel>Super Admin</SectionLabel>
              <NavItem to="/panel/super" end label="Dashboard" icon={<IcoGrid />} />
              <NavItem to="/panel/super/users" label="All Users" icon={<IcoUsers />} />
              <NavItem to="/panel/super/admins" label="Manage Admins" icon={<IcoShield />} />
              <NavItem to="/panel/super/transactions" label="Transactions" icon={<IcoReceipt />} />
              <NavItem to="/panel/super/video-mapping" label="Video Mapping" icon={<IcoLink />} />

              <SectionLabel>Admin Panel</SectionLabel>
              <NavItem to="/panel/admin" end label="Admin Dashboard" icon={<IcoChart />} />
              <NavItem to="/panel/admin/grant" label="Grant Access" icon={<IcoKey />} />
              <NavItem to="/panel/admin/students" label="My Students" icon={<IcoStudents />} />
            </>
          )}

          {role === "admin" && (
            <>
              <SectionLabel>Admin</SectionLabel>
              <NavItem to="/panel/admin" end label="Dashboard" icon={<IcoGrid />} />
              <NavItem to="/panel/admin/grant" label="Grant Access" icon={<IcoKey />} />
              <NavItem to="/panel/admin/students" label="My Students" icon={<IcoStudents />} />
            </>
          )}

          {role === "user" && (
            <>
              <SectionLabel>My Learning</SectionLabel>
              <NavItem to="/panel/my-courses" label="My Courses & Payments" icon={<IcoBook />} />
              <NavItem to="/video" label="Video Library" icon={<IcoPlay />} />
            </>
          )}

          {(role === "superadmin" || role === "admin") && (
            <>
              <SectionLabel>Quick Links</SectionLabel>
              <NavItem to="/video" label="Video Library" icon={<IcoPlay />} />
            </>
          )}

          <div className="pt-4 mt-2 border-t border-[rgba(197,164,109,0.08)]">
            <NavItem to="/" label="Back to Site" icon={<IcoHome />} />
          </div>
        </nav>

        {/* User info + logout */}
        <div className="px-3 py-3 border-t border-[rgba(197,164,109,0.1)]">
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-white/[0.04] mb-2">
            <div className="w-8 h-8 rounded-full bg-[rgba(197,164,109,0.18)] flex items-center justify-center text-[#f7db7d] font-bold text-sm uppercase shrink-0">
              {user?.name?.[0] ?? "?"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-ivory/90 text-[12.5px] font-medium truncate leading-tight">{user?.name}</p>
              <p className="text-ivory/40 text-[9.5px] truncate leading-tight mt-[1px]">{user?.email}</p>
              <span className={`inline-block mt-[3px] text-[9px] px-1.5 py-0.5 rounded font-semibold tracking-wide uppercase ${ROLE_COLOR[role]}`}>
                {ROLE_LABEL[role]}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-[12px] text-ivory/35 hover:text-ivory/70 hover:bg-white/[0.05] rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-h-screen flex flex-col" style={{ marginLeft: "224px" }}>
        <main className="flex-1 p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function IcoGrid() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
}
function IcoChart() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
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
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
}
function IcoPlay() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
function IcoReceipt() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
}
function IcoLink() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
}
function IcoStudents() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}

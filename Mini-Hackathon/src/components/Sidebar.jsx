import {
  FiBookOpen,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiUsers,
  FiX,
} from "react-icons/fi";

const Sidebar = ({
  isOpen,
  closeSidebar,
  handleLogout,
  activeSection,
  handleSectionChange,
}) => {
  const changeSection = (section) => {
    handleSectionChange(section);
    closeSidebar();
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="dashboard-brand">
            <div className="dashboard-logo">E</div>

            <div>
              <h2>EduManage</h2>
              <span>Admin Portal</span>
            </div>
          </div>

          <button
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        <nav className="sidebar-menu">
          <button
            className={`sidebar-link ${
              activeSection === "dashboard" ? "active-link" : ""
            }`}
            onClick={() => changeSection("dashboard")}
          >
            <FiGrid />
            <span>Dashboard</span>
          </button>

          <button
            className={`sidebar-link ${
              activeSection === "students" ? "active-link" : ""
            }`}
            onClick={() => changeSection("students")}
          >
            <FiUsers />
            <span>Students</span>
          </button>

          <button
            className={`sidebar-link ${
              activeSection === "courses" ? "active-link" : ""
            }`}
            onClick={() => changeSection("courses")}
          >
            <FiBookOpen />
            <span>Courses</span>
          </button>

          <button
            className={`sidebar-link ${
              activeSection === "settings" ? "active-link" : ""
            }`}
            onClick={() => changeSection("settings")}
          >
            <FiSettings />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <div className="help-icon">?</div>

            <div>
              <h3>Need help?</h3>
              <p>Check project documentation.</p>
            </div>
          </div>

          <button className="sidebar-logout" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {isOpen && (
        <button
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}
    </>
  );
};

export default Sidebar;
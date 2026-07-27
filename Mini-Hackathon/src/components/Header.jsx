import {
  FiBell,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSun,
} from "react-icons/fi";

const Header = ({
  admin,
  theme,
  changeTheme,
  openSidebar,
}) => {
  const getInitials = () => {
    if (!admin?.name) {
      return "AD";
    }

    return admin.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={openSidebar}
          aria-label="Open sidebar"
        >
          <FiMenu />
        </button>

        <div>
          <span>STUDENT ADMINISTRATION</span>
          <h2>Dashboard</h2>
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <FiSearch />

          <input
            type="search"
            placeholder="Search students..."
          />
        </div>

        <button
          className="header-icon-button"
          onClick={changeTheme}
          aria-label="Change theme"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>

        <button
          className="header-icon-button notification-button"
          aria-label="Notifications"
        >
          <FiBell />
          <span></span>
        </button>

        <div className="admin-details">
          <div className="admin-avatar">{getInitials()}</div>

          <div>
            <h3>{admin?.name || "Admin"}</h3>
            <span>{admin?.role || "Administrator"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
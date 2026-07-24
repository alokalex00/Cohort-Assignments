import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function Navbar({ user, cartCount, openCart, logout }) {
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-cyan-400"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080b12]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            Shop
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm sm:block">
            <span className="text-cyan-400">●</span>{" "}
            <span className="text-gray-300">
              {user?.name || "User"}
            </span>
          </div>

          <button
            onClick={openCart}
            className="relative rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1.5 py-0.5 text-[10px] font-black text-black">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={logout}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-400 transition hover:text-white"
          >
            ↪
          </button>
        </div>
      </nav>

      <div className="flex justify-center gap-8 border-t border-white/5 py-3 md:hidden">
        <NavLink to="/home" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          Shop
        </NavLink>

        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
import Logo from "./Logo";

function Navbar({ searchText, setSearchText, cartCount, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-800 bg-[#0b0b0b]/95 px-6 py-4 backdrop-blur md:px-10">
      <Logo />

      <div className="hidden gap-8 md:flex">
        <a
          href="#products"
          className="text-gray-300 transition hover:text-lime-400"
        >
          Products
        </a>

        <a
          href="#featured"
          className="text-gray-300 transition hover:text-lime-400"
        >
          Featured
        </a>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="hidden rounded-xl border border-gray-700 bg-[#151515] px-4 py-2 text-white outline-none focus:border-lime-400 sm:block"
        />

        <div className="rounded-xl bg-[#151515] px-4 py-2 text-white">
          🛒 {cartCount}
        </div>

        <button
          onClick={onLogout}
          className="rounded-xl border border-gray-700 px-4 py-2 text-gray-300 transition hover:border-lime-400 hover:text-lime-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
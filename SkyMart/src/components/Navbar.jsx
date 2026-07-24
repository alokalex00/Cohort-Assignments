import Logo from "./Logo";

function Navbar({
  user,
  searchText,
  setSearchText,
  cartCount,
  openCart,
  logout,
}) {
  return (
    <nav className="sticky top-0 z-40 border-b border-gray-800 bg-[#0a0a0a]/95 px-6 py-4 backdrop-blur md:px-10">

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">

        <Logo />

        <div className="hidden flex-1 justify-center md:flex">

          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
            className="w-full max-w-md rounded-xl border border-gray-700 bg-[#151515] px-4 py-3 outline-none focus:border-lime-400"
          />

        </div>

        <div className="flex items-center gap-3">

          <p className="hidden text-sm text-gray-400 lg:block">

            Hi, {user.name}

          </p>

          <button
            onClick={openCart}
            className="rounded-xl bg-[#181818] px-4 py-3"
          >

            🛒 {cartCount}

          </button>

          <button
            onClick={logout}
            className="rounded-xl border border-gray-700 px-4 py-3 text-gray-400 hover:border-lime-400 hover:text-lime-400"
          >

            Logout

          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
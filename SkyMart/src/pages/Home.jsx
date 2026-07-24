import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home({
  user,
  products,
  cartCount,
  cartTotal,
  addToCart,
}) {
  const categories = [
    ["💻", "Electronics"],
    ["👕", "Clothing"],
    ["🪑", "Furniture"],
    ["🏠", "Home"],
  ];

  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e131c] p-7 md:p-10">
        <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-cyan-400/10 blur-[90px]" />

        <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_220px]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Good evening 👋
            </p>

            <h1 className="mt-3 text-4xl font-black md:text-5xl">
              Welcome back,
              <br />

              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                {user?.name || "Shopper"}!
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
              Discover today's picks — hand-curated
              products across electronics, fashion,
              home and more.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-black text-black"
              >
                Shop Now →
              </Link>

              <Link
                to="/products"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-gray-300"
              >
                View All Products
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <p className="text-3xl font-black text-cyan-400">
                20+
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Products Available
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-2xl font-black">
                Free
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Delivery on ₹999+
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["⚡", cartCount, "Cart Items"],
          ["💳", `₹${cartTotal}`, "Cart Value"],
          ["⭐", products.length, "Top Products"],
          ["◈", "6", "Categories"],
        ].map(([icon, value, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-[#0e131c] p-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                {icon}
              </span>

              <div>
                <p className="font-black text-white">
                  {value}
                </p>

                <p className="text-xs text-gray-500">
                  {label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold">
            Shop by Category
          </h2>

          <Link
            to="/products"
            className="text-xs font-bold text-cyan-400"
          >
            View All →
          </Link>
        </div>

        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          {categories.map(([icon, name]) => (
            <Link
              key={name}
              to="/products"
              className="rounded-2xl border border-white/10 bg-white p-6 text-center transition hover:-translate-y-1"
            >
              <div className="text-3xl">
                {icon}
              </div>

              <h3 className="mt-3 text-sm font-bold text-gray-900">
                {name}
              </h3>

              <p className="mt-1 text-[10px] text-gray-400">
                Explore products
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-400">
              Handpicked
            </p>

            <h2 className="mt-1 text-2xl font-black">
              Featured Products
            </h2>
          </div>

          <Link
            to="/products"
            className="text-sm text-cyan-400"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
        {[
          ["⚡", "Fast Delivery", "Same-day on select items"],
          ["🔒", "Secure Payments", "100% encrypted checkout"],
          ["🏷️", "Best Prices", "Prices you'll love"],
        ].map(([icon, title, desc]) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
          >
            <div className="flex gap-4">
              <span className="text-cyan-400">
                {icon}
              </span>

              <div>
                <h3 className="font-bold">
                  {title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;
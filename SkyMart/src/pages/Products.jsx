import { useState } from "react";
import ProductCard from "../components/ProductCard";

function Products({ products, addToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");

  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Furniture",
    "Home",
    "Sports",
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "Price Low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "Price High") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "Rating") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-10">
      <div>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          Shop
        </p>

        <h1 className="mt-2 text-4xl font-black">
          All Products
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {filteredProducts.length} products found
        </p>
      </div>

      <div className="mt-7 grid gap-3 rounded-2xl border border-white/10 bg-[#0e131c] p-3 md:grid-cols-[1fr_180px_180px]">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#121722] px-4 py-3 text-sm text-white outline-none"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#121722] px-4 py-3 text-sm text-white outline-none"
        >
          <option value="Featured">Featured</option>
          <option value="Price Low">Price Low</option>
          <option value="Price High">Price High</option>
          <option value="Rating">Rating</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center">
          <div className="text-5xl">🔍</div>

          <h2 className="mt-4 text-xl font-bold">
            No products found
          </h2>

          <p className="mt-2 text-gray-500">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;
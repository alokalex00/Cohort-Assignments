import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  searchText,
  selectedCategory,
  setSelectedCategory,
  addToCart,
}) {
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Sports",
    "Home",
  ];

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const categoryMatch =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return searchMatch && categoryMatch;
  });

  return (
    <section
      id="products"
      className="px-6 py-20 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-semibold uppercase tracking-widest text-lime-400">
              Explore Collection
            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              Trending Products
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`rounded-xl px-4 py-2 font-medium ${
                  selectedCategory === category
                    ? "bg-lime-400 text-black"
                    : "bg-[#171717] text-gray-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="py-20 text-center text-xl text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
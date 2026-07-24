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

  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        product.category ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <section
      id="products"
      className="px-6 py-20 md:px-10"
    >

      <div className="mx-auto max-w-7xl">

        <div className="mb-10">

          <p className="font-bold uppercase tracking-widest text-lime-400">

            Explore Collection

          </p>

          <h2 className="mt-3 text-4xl font-bold">

            Trending Products

          </h2>

        </div>

        <div className="mb-10 flex flex-wrap gap-3">

          {categories.map(
            (category) => (

              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
                className={`rounded-xl px-5 py-3 ${
                  selectedCategory ===
                  category
                    ? "bg-lime-400 font-bold text-black"
                    : "bg-[#161616] text-gray-400"
                }`}
              >

                {category}

              </button>

            )
          )}

        </div>

        {filteredProducts.length ===
        0 ? (

          <p className="py-20 text-center text-gray-500">

            No products found.

          </p>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}

export default ProductGrid;
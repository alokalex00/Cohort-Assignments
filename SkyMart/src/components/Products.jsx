function Products({
  addToCart,
  searchText,
  selectedCategory,
  showAll,
  setShowAll,
}) {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      category: "Electronics",
      image:
        "https://www.leafstudios.in/cdn/shop/files/1_a43c5e0b-3a47-497d-acec-b4764259b10e_800x.png?v=1750486829",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2499,
      category: "Electronics",
      image:
        "https://i5.walmartimages.com/seo/Kogiio-Smart-Watch-Fitness-Tracker-2-01-Black-Case-with-Black-Band-1-Count-1-Pack_d94ed35a-84ea-4b4c-b28a-a9215086a266.747f659b406adbc741e29a4d1fb13128.jpeg",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 1599,
      category: "Sports",
      image:
        "https://www.campusshoes.com/cdn/shop/files/FIRST_11G-787_LGRY-BLK_01.webp?v=1763546608",
    },
    {
      id: 4,
      name: "Backpack",
      price: 999,
      category: "Fashion",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0J2RK4VqG9YeLZT7TdQAdK8jz-7SIHpbl-kGOUBFIKQ&s=10",
    },
    {
      id: 5,
      name: "Home Lamp",
      price: 1299,
      category: "Home",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    },
    {
      id: 6,
      name: "Beauty Kit",
      price: 799,
      category: "Beauty",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
    },
  ];

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }
  );

  const visibleProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 4);

  return (
    <section
      className="productsSection"
      id="products"
    >
      <div className="productsHeading">
        <div>
          <p>Our Products</p>
          <h2>Featured Products</h2>
        </div>

        <button
          className="viewButton"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All →"}
        </button>
      </div>

      {visibleProducts.length === 0 ? (
        <p className="noProducts">
          No products found.
        </p>
      ) : (
        <div className="productsGrid">
          {visibleProducts.map((product) => (
            <div
              className="productCard"
              key={product.id}
            >
              <div className="productImage">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="productInfo">
                <p className="productLabel">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <div className="rating">
                  ⭐⭐⭐⭐⭐
                </div>

                <div className="productBottom">
                  <p className="price">
                    ₹{product.price}
                  </p>

                  <button
                    className="addButton"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
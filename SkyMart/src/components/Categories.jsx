function Categories({
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Beauty",
    "Sports",
  ];

  return (
    <section
      className="categoriesSection"
      id="categories"
    >
      <div className="sectionTitle">
        <p>Browse Collections</p>
        <h2>Shop by Category</h2>
      </div>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "categoryCard activeCategory"
                : "categoryCard"
            }
            onClick={() =>
              setSelectedCategory(category)
            }
          >
            <h3>{category}</h3>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
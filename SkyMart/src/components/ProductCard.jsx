function ProductCard({ product, addToCart }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-800 bg-[#111111] transition hover:-translate-y-2 hover:border-lime-400">
      <div className="h-64 bg-[#181818] p-6">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-6">
        <p className="text-xs uppercase tracking-widest text-lime-400">
          {product.category}
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          {product.name}
        </h3>

        <p className="mt-2 text-gray-500">
          Premium quality product
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-xl font-bold text-lime-400">
            ₹{product.price}
          </p>

          <button
            onClick={addToCart}
            className="rounded-xl bg-lime-400 px-4 py-2 font-semibold text-black transition hover:bg-lime-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
function ProductCard({ product, addToCart }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#10141d] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
      <div className="relative h-48 overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] text-gray-200 backdrop-blur">
          {product.badge}
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-1 min-h-12 font-semibold text-white">
          {product.name}
        </h3>

        <div className="mt-2 text-xs text-yellow-400">
          ★ {product.rating}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-lg font-black text-cyan-400">
            ₹{product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-black text-black transition hover:bg-cyan-300"
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
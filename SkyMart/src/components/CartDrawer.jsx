function CartDrawer({
  cart,
  isOpen,
  closeCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {isOpen && (
        <button
          aria-label="Close cart"
          onClick={closeCart}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0b0f17] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h2 className="text-xl font-bold text-white">
              🛒 Cart
            </h2>

            <p className="text-xs text-gray-500">
              {cart.length} unique products
            </p>
          </div>

          <button
            onClick={closeCart}
            className="rounded-lg bg-white/5 px-3 py-2 text-gray-400"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="text-6xl">🛒</div>

            <h3 className="mt-5 text-xl font-bold text-white">
              Your cart is empty
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Add something amazing.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex gap-3">
                    <div className="h-20 w-20 overflow-hidden rounded-xl bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white">
                        {item.name}
                      </h3>

                      <p className="mt-1 font-bold text-cyan-400">
                        ₹{item.price}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="h-8 w-8 rounded-lg bg-white/10 text-white"
                        >
                          −
                        </button>

                        <span className="min-w-6 text-center text-sm text-white">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="h-8 w-8 rounded-lg bg-white/10 text-white"
                        >
                          +
                        </button>

                        <button
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="ml-auto text-xs text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">
                  Total
                </span>

                <span className="text-2xl font-black text-white">
                  ₹{total}
                </span>
              </div>

              <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 font-black text-black">
                Checkout →
              </button>

              <button
                onClick={clearCart}
                className="mt-3 w-full text-sm text-gray-500 hover:text-red-400"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
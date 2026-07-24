function CartDrawer({
  cart,
  isOpen,
  closeCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  return (
    <>

      {isOpen && (

        <div
          onClick={closeCart}
          className="fixed inset-0 z-40 bg-black/60"
        />

      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-[#101010] p-6 shadow-2xl transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">

            Your Cart

          </h2>

          <button
            onClick={closeCart}
            className="text-2xl text-gray-400"
          >

            ✕

          </button>

        </div>

        {cart.length === 0 ? (

          <p className="mt-20 text-center text-gray-500">

            Your cart is empty.

          </p>

        ) : (

          <div className="mt-8 flex h-[calc(100%-80px)] flex-col">

            <div className="flex-1 space-y-5 overflow-y-auto">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-800 bg-[#171717] p-4"
                >

                  <div className="flex gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl bg-white object-contain"
                    />

                    <div className="flex-1">

                      <h3 className="font-bold">

                        {item.name}

                      </h3>

                      <p className="mt-1 text-lime-400">

                        ₹{item.price}

                      </p>

                      <div className="mt-3 flex items-center gap-3">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                          className="h-8 w-8 rounded-lg bg-[#242424]"
                        >

                          −

                        </button>

                        <span>

                          {item.quantity}

                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.id
                            )
                          }
                          className="h-8 w-8 rounded-lg bg-[#242424]"
                        >

                          +

                        </button>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id
                        )
                      }
                      className="text-red-400"
                    >

                      Remove

                    </button>

                  </div>

                </div>

              ))}

            </div>

            <div className="border-t border-gray-800 pt-5">

              <div className="flex justify-between text-xl font-bold">

                <span>
                  Total
                </span>

                <span className="text-lime-400">

                  ₹{totalPrice}

                </span>

              </div>

              <button className="mt-5 w-full rounded-xl bg-lime-400 py-4 font-bold text-black">

                Checkout

              </button>

            </div>

          </div>

        )}

      </div>

    </>
  );
}

export default CartDrawer;
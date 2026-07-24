import { useEffect, useState } from "react";

import AuthPage from "./components/AuthPage";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";

function App() {
  // -----------------------------
  // USER STATE
  // -----------------------------

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("skymartUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // -----------------------------
  // CART STATE
  // -----------------------------

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("skymartCart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);

  // -----------------------------
  // SAVE USER
  // -----------------------------

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "skymartUser",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("skymartUser");
    }
  }, [user]);

  // -----------------------------
  // SAVE CART
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(
      "skymartCart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // -----------------------------
  // PRODUCTS
  // -----------------------------

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
      name: "Urban Backpack",
      price: 999,
      category: "Fashion",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0J2RK4VqG9YeLZT7TdQAdK8jz-7SIHpbl-kGOUBFIKQ&s=10",
    },

    {
      id: 5,
      name: "Modern Lamp",
      price: 1299,
      category: "Home",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    },

    {
      id: 6,
      name: "Street Jacket",
      price: 1899,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
    },
  ];

  // -----------------------------
  // ADD TO CART
  // -----------------------------

  function addToCart(product) {
    setCart((previousCart) => {
      const existingProduct =
        previousCart.find(
          (item) => item.id === product.id
        );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  // -----------------------------
  // INCREASE QUANTITY
  // -----------------------------

  function increaseQuantity(id) {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // -----------------------------
  // DECREASE QUANTITY
  // -----------------------------

  function decreaseQuantity(id) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // -----------------------------
  // REMOVE PRODUCT
  // -----------------------------

  function removeFromCart(id) {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== id
      )
    );
  }

  // -----------------------------
  // LOGOUT
  // -----------------------------

  function logout() {
    setUser(null);
  }

  // -----------------------------
  // AUTH PAGE
  // -----------------------------

  if (!user) {
    return (
      <AuthPage
        onLogin={(loggedUser) =>
          setUser(loggedUser)
        }
      />
    );
  }

  // -----------------------------
  // CART COUNT
  // -----------------------------

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      <Navbar
        user={user}
        searchText={searchText}
        setSearchText={setSearchText}
        cartCount={cartCount}
        openCart={() => setCartOpen(true)}
        logout={logout}
      />

      {/* HERO */}

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-gray-800 bg-gradient-to-br from-[#111] to-[#0b0b0b] p-10 md:p-16">

          <p className="font-bold uppercase tracking-widest text-lime-400">
            Welcome to SkyMart
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">

            Shop smarter.
            <br />

            <span className="text-lime-400">
              Live better.
            </span>

          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">

            Explore trending products,
            amazing prices and a smooth
            shopping experience.

          </p>

          <a
            href="#products"
            className="mt-8 inline-block rounded-xl bg-lime-400 px-7 py-4 font-bold text-black"
          >
            Explore Products →
          </a>

        </div>
      </section>

      {/* PRODUCTS */}

      <ProductGrid
        products={products}
        searchText={searchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={
          setSelectedCategory
        }
        addToCart={addToCart}
      />

      {/* CART */}

      <CartDrawer
        cart={cart}
        isOpen={cartOpen}
        closeCart={() => setCartOpen(false)}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />

      <footer className="border-t border-gray-800 px-6 py-10 text-center text-gray-600">

        © 2026 SkyMart — Shop the future today.

      </footer>

    </main>
  );
}

export default App;
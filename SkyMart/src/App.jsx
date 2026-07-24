import { useState } from "react";

import Logo from "./components/Logo";
import LoginForm from "./components/LoginForm";
import Stats from "./components/Stats";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

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

  function addToCart() {
    setCartCount((prev) => prev + 1);
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] text-white">
        <div className="grid min-h-screen lg:grid-cols-2">
          <section className="flex flex-col justify-between border-r border-gray-700 p-8 md:p-14">
            <Logo />

            <div className="my-16">
              <p className="mb-6 font-bold uppercase tracking-wider text-lime-400">
                Welcome Back
              </p>

              <h1 className="max-w-2xl text-5xl font-bold leading-tight md:text-7xl">
                Shop the future.
                <br />
                <span className="text-lime-400">
                  Today.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-gray-500">
                Thousands of products, lightning-fast
                delivery, and prices that make your wallet
                happy.
              </p>

              <div className="mt-12">
                <Stats />
              </div>
            </div>

            <p className="text-sm text-gray-700">
              © 2026 SkyMart
            </p>
          </section>

          <section className="flex items-center justify-center p-8">
            <LoginForm
              onLogin={() => setLoggedIn(true)}
            />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b]">
      <Navbar
        searchText={searchText}
        setSearchText={setSearchText}
        cartCount={cartCount}
        onLogout={() => setLoggedIn(false)}
      />

      <section
        id="featured"
        className="px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-7xl rounded-[40px] border border-gray-800 bg-gradient-to-br from-[#121212] to-[#0c0c0c] p-10 md:p-16">
          <p className="font-semibold uppercase tracking-widest text-lime-400">
            Future of Shopping
          </p>

          <h2 className="mt-4 max-w-4xl text-5xl font-bold text-white md:text-7xl">
            Everything you need.
            <br />
            One futuristic marketplace.
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-500">
            Discover trending technology, fashion, home
            essentials and more.
          </p>

          <a
            href="#products"
            className="mt-9 inline-block rounded-xl bg-lime-400 px-7 py-4 font-bold text-black"
          >
            Explore Products →
          </a>
        </div>
      </section>

      <ProductGrid
        products={products}
        searchText={searchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addToCart={addToCart}
      />

      <footer className="border-t border-gray-800 px-6 py-10 text-center text-gray-600">
        SkyMart © 2026 — Shop the future today.
      </footer>
    </main>
  );
}

export default App;
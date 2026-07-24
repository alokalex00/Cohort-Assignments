import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";

import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";

import products from "./data/products";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const saved =
      localStorage.getItem("skymartUser");

    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState(() => {
    const saved =
      localStorage.getItem("skymartCart");

    return saved ? JSON.parse(saved) : [];
  });

  const [cartOpen, setCartOpen] =
    useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "skymartUser",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(
        "skymartUser"
      );
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      "skymartCart",
      JSON.stringify(cart)
    );
  }, [cart]);

  function login(loggedUser) {
    setUser(loggedUser);

    navigate("/home");
  }

  function logout() {
    setUser(null);
    setCartOpen(false);

    navigate("/login");
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(id) {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  }

  function removeFromCart(id) {
    setCart((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <AuthPage onLogin={login} />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      <Navbar
        user={user}
        cartCount={cartCount}
        openCart={() =>
          setCartOpen(true)
        }
        logout={logout}
      />

      <Routes>
        <Route
          path="/home"
          element={
            <Home
              user={user}
              products={products}
              cartCount={cartCount}
              cartTotal={cartTotal}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/products"
          element={
            <Products
              products={products}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/home"
              replace
            />
          }
        />
      </Routes>

      <CartDrawer
        cart={cart}
        isOpen={cartOpen}
        closeCart={() =>
          setCartOpen(false)
        }
        increaseQuantity={
          increaseQuantity
        }
        decreaseQuantity={
          decreaseQuantity
        }
        removeFromCart={
          removeFromCart
        }
        clearCart={clearCart}
      />

      <footer className="mt-16 border-t border-white/10 py-8 text-center">
        <p className="text-sm font-bold text-cyan-400">
          SkyMart
        </p>

        <p className="mt-2 text-xs text-gray-700">
          © 2026 SkyMart • Built with React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;
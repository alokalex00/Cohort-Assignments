import { useState } from "react";

import Logo from "./Logo";

function AuthPage({ onLogin }) {
  const [isRegister, setIsRegister] =
    useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  function handleRegister(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage(
        "Please fill all fields."
      );

      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(userData)
    );

    setMessage(
      "Account created successfully. Please sign in."
    );

    setIsRegister(false);

    setPassword("");
  }

  function handleLogin(e) {
    e.preventDefault();

    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "registeredUser"
        )
      );

    if (!savedUser) {
      setMessage(
        "No account found. Please create an account first."
      );

      return;
    }

    if (
      savedUser.email === email &&
      savedUser.password === password
    ) {

      onLogin({
        name: savedUser.name,
        email: savedUser.email,
      });

    } else {

      setMessage(
        "Invalid email or password."
      );

    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT */}

        <section className="flex flex-col justify-between border-r border-gray-800 p-8 md:p-14">

          <Logo />

          <div className="my-16">

            <p className="font-bold uppercase tracking-widest text-lime-400">

              Welcome Back

            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">

              Shop the future.
              <br />

              <span className="text-lime-400">

                Today.

              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-500">

              Thousands of products,
              lightning-fast experience,
              and prices that make your wallet happy.

            </p>

            <div className="mt-12 grid grid-cols-3 gap-4">

              <div className="rounded-2xl border border-gray-700 p-5 text-center">

                <h3 className="text-2xl font-bold text-lime-400">

                  20K+

                </h3>

                <p className="mt-2 text-gray-500">

                  Products

                </p>

              </div>

              <div className="rounded-2xl border border-gray-700 p-5 text-center">

                <h3 className="text-2xl font-bold text-lime-400">

                  50K+

                </h3>

                <p className="mt-2 text-gray-500">

                  Users

                </p>

              </div>

              <div className="rounded-2xl border border-gray-700 p-5 text-center">

                <h3 className="text-2xl font-bold text-lime-400">

                  4.9★

                </h3>

                <p className="mt-2 text-gray-500">

                  Rating

                </p>

              </div>

            </div>

          </div>

          <p className="text-sm text-gray-700">

            © 2026 SkyMart

          </p>

        </section>

        {/* RIGHT */}

        <section className="flex items-center justify-center p-8">

          <div className="w-full max-w-lg rounded-3xl border border-gray-800 bg-[#101010] p-10">

            <h2 className="text-3xl font-bold">

              {isRegister
                ? "Create account"
                : "Sign in"}

            </h2>

            <p className="mt-2 text-gray-500">

              {isRegister
                ? "Create your SkyMart account"
                : "Enter your credentials to continue"}

            </p>

            <form
              onSubmit={
                isRegister
                  ? handleRegister
                  : handleLogin
              }
              className="mt-8 space-y-5"
            >

              {isRegister && (

                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full rounded-2xl border border-gray-700 bg-[#1a1a1a] px-5 py-4 outline-none focus:border-lime-400"
                />

              )}

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-2xl border border-gray-700 bg-[#1a1a1a] px-5 py-4 outline-none focus:border-lime-400"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-2xl border border-gray-700 bg-[#1a1a1a] px-5 py-4 outline-none focus:border-lime-400"
              />

              {message && (

                <p className="text-sm text-yellow-400">

                  {message}

                </p>

              )}

              <button
                type="submit"
                className="w-full rounded-2xl bg-lime-400 py-4 text-lg font-bold text-black"
              >

                {isRegister
                  ? "Create Account →"
                  : "Sign In →"}

              </button>

            </form>

            <p className="mt-7 text-center text-gray-500">

              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}

              <button
                onClick={() => {
                  setIsRegister(
                    !isRegister
                  );

                  setMessage("");
                }}
                className="ml-2 font-bold text-lime-400"
              >

                {isRegister
                  ? "Sign in"
                  : "Create one"}

              </button>

            </p>

          </div>

        </section>

      </div>

    </main>
  );
}

export default AuthPage;
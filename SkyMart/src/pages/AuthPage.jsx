import { useState } from "react";

function AuthPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function register(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Please fill all fields.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "skymartRegisteredUser",
      JSON.stringify(newUser)
    );

    setMessage("Account created! Now sign in.");
    setPassword("");
    setIsRegister(false);
  }

  function login(e) {
    e.preventDefault();

    const stored = localStorage.getItem(
      "skymartRegisteredUser"
    );

    if (!stored) {
      setMessage("Create an account first.");
      return;
    }

    const registered = JSON.parse(stored);

    if (
      registered.email === email &&
      registered.password === password
    ) {
      onLogin({
        name: registered.name,
        email: registered.email,
      });

      return;
    }

    setMessage("Invalid email or password.");
  }

  return (
    <main className="min-h-screen bg-[#070a10] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative flex flex-col justify-between overflow-hidden border-r border-white/10 p-8 md:p-14">
          <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 font-black text-black">
              ⚡
            </div>

            <h1 className="text-2xl font-black">
              Sky
              <span className="text-cyan-400">
                Mart
              </span>
            </h1>
          </div>

          <div className="relative z-10 my-14">
            <p className="font-bold uppercase tracking-[0.2em] text-cyan-400">
              Welcome Back
            </p>

            <h2 className="mt-7 text-5xl font-black leading-tight md:text-7xl">
              Shop the future.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Today.
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-lg leading-8 text-gray-500">
              Thousands of products, fast shopping,
              and prices that make your wallet happy.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-3">
              {[
                ["20K+", "Products"],
                ["50K+", "Users"],
                ["4.9★", "Rating"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center"
                >
                  <p className="text-xl font-black text-cyan-400 md:text-2xl">
                    {value}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-xs text-gray-700">
            © 2026 SkyMart
          </p>
        </section>

        <section className="flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0d1119] p-8 shadow-2xl md:p-10">
            <h2 className="text-3xl font-black">
              {isRegister
                ? "Create account"
                : "Sign in"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {isRegister
                ? "Start your SkyMart journey"
                : "Enter your credentials to continue"}
            </p>

            <form
              onSubmit={
                isRegister ? register : login
              }
              className="mt-8 space-y-4"
            >
              {isRegister && (
                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Full name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-cyan-400"
                />
              )}

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Email address"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-cyan-400"
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-cyan-400"
              />

              {message && (
                <p className="text-sm text-yellow-400">
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 font-black text-black"
              >
                {isRegister
                  ? "Create Account →"
                  : "Sign In →"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}

              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  setMessage("");
                }}
                className="ml-2 font-bold text-cyan-400"
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
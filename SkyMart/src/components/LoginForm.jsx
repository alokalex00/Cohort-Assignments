import { useState } from "react";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setError("");
    onLogin();
  }

  return (
    <div className="w-full max-w-lg rounded-3xl border border-gray-800 bg-[#101010] p-10 shadow-2xl">
      <h2 className="text-3xl font-bold text-white">
        Sign in
      </h2>

      <p className="mt-2 text-gray-500">
        Enter your credentials to continue
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5"
      >
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl border border-gray-700 bg-[#1b1b1b] px-5 py-4 text-white outline-none placeholder:text-gray-600 focus:border-lime-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-2xl border border-gray-700 bg-[#1b1b1b] px-5 py-4 text-white outline-none placeholder:text-gray-600 focus:border-lime-400"
        />

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-2xl bg-lime-400 py-4 text-lg font-bold text-black transition hover:bg-lime-300"
        >
          Sign in →
        </button>
      </form>

      <p className="mt-7 text-center text-gray-600">
        Don't have an account?{" "}
        <span className="cursor-pointer font-semibold text-lime-400">
          Create one
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
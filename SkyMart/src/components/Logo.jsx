import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/home" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-xl font-black text-black shadow-lg shadow-cyan-400/20">
        ⚡
      </div>

      <h1 className="text-xl font-black tracking-tight text-white">
        Sky<span className="text-cyan-400">Mart</span>
      </h1>
    </Link>
  );
}

export default Logo;
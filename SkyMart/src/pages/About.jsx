function About() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <section className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-2xl text-black">
          ⚡
        </div>

        <h1 className="mt-6 text-4xl font-black md:text-5xl">
          About{" "}
          <span className="text-cyan-400">
            SkyMart
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500">
          SkyMart is a next-generation
          e-commerce experience built to make
          online shopping fast, simple and enjoyable.
        </p>
      </section>

      <section className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["20K+", "Products"],
          ["50K+", "Happy Customers"],
          ["4.9", "Avg Rating"],
          ["99%", "On-time Delivery"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-[#0e131c] p-6 text-center"
          >
            <p className="text-2xl font-black text-cyan-400">
              {value}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              {label}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-white/10 bg-[#0e131c] p-7 md:p-10">
        <h2 className="text-xl font-bold">
          Our Story
        </h2>

        <p className="mt-5 text-sm leading-7 text-gray-500">
          SkyMart started as a simple idea:
          create an online marketplace that feels
          clean, quick and enjoyable.
        </p>

        <p className="mt-4 text-sm leading-7 text-gray-500">
          From electronics to fashion, furniture
          and everyday essentials, SkyMart brings
          everything together in one modern experience.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-center text-2xl font-black">
          What We Stand For
        </h2>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {[
            [
              "🛡️",
              "Trust",
              "Every product is selected with quality and reliability in mind.",
            ],
            [
              "⚡",
              "Speed",
              "A fast and smooth shopping experience from start to finish.",
            ],
            [
              "💬",
              "Community",
              "Designed around real customers and their everyday needs.",
            ],
            [
              "✨",
              "Quality",
              "A carefully designed experience with attention to detail.",
            ],
          ].map(([icon, title, desc]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-[#0e131c] p-6"
            >
              <div className="flex gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  {icon}
                </span>

                <div>
                  <h3 className="font-bold">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default About;
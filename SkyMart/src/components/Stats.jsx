function Stats() {
  const stats = [
    { value: "20K+", label: "Products" },
    { value: "50K+", label: "Users" },
    { value: "4.9★", label: "Rating" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-gray-700 p-6 text-center"
        >
          <h3 className="text-2xl font-bold text-lime-400">
            {stat.value}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Stats;
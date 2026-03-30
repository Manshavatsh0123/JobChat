const StatsSection = () => {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Companies" },
    { number: "1K+", label: "Connections Made" },
  ];

  return (
    <div className="mt-20 pt-16 border-t" style={{ borderColor: "#E5E7EB" }}>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="relative group text-center p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            style={{
              background: "linear-gradient(145deg, #ffffff, #f3f4f6)",
              border: "1px solid #E5E7EB",
            }}>
            
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
              style={{
                background: "radial-gradient(circle at top, rgba(99,102,241,0.15), transparent)",
              }}
            />

            <p
              className="text-5xl font-extrabold relative"
              style={{
                background: "linear-gradient(90deg, #111827, #6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {stat.number}
            </p>

            <p
              className="text-sm font-medium mt-3 relative"
              style={{ color: "#6B7280" }}
            >
              {stat.label}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
};

export default StatsSection;
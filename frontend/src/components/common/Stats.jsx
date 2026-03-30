const StatsSection = () => {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Companies" },
    { number: "1K+", label: "Connections Made" },
  ];

  return (
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-border pt-16">
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center">
          <p className="text-4xl font-bold text-primary">
            {stat.number}
          </p>
          <p className="text-muted-foreground mt-2">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
const FeaturesSection = ({ features }) => {
  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #F9FAFB, #FFFFFF)"
      }}
    >
      <div className="max-w-7xl mx-auto">
      
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span
              style={{
                background: "linear-gradient(90deg, #111827, #6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Everything You Need
            </span>
          </h2>

          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Built for professionals who value authenticity and real connections
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, idx) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  background: "linear-gradient(145deg, #ffffff, #f9fafb)",
                  borderColor: "#E5E7EB"}}>

                <div className="w-14 h-14 flex items-center justify-center rounded-xl mb-5 transition group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #6366F1, #4F46E5)"
                  }}
                >
                  <IconComponent size={26} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-[#111827] mb-3">
                  {feature.title}
                </h3>

                <p className="text-[#6B7280] leading-relaxed text-sm">
                  {feature.description}
                </p>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
                  style={{
                    background: "radial-gradient(circle at top, rgba(99,102,241,0.12), transparent)"
                  }}
                />

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
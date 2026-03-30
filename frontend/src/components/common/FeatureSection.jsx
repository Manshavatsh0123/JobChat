const FeaturesSection = ({ features }) => {
  return (
    <section
      id="features"
      className="bg-secondary py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* 🔹 Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for professionals who value authenticity and real connections
          </p>
        </div>

        {/* 🔹 Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-border p-8 hover:shadow-lg transition hover:border-primary/50"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent size={24} className="text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
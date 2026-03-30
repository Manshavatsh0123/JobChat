const HowItWorksSection = () => {
  const steps = [
    { step: "1", title: "Sign Up", description: "Create your authentic profile" },
    { step: "2", title: "Build Profile", description: "Share your real experience" },
    { step: "3", title: "Connect", description: "Meet like-minded professionals" },
    { step: "4", title: "Grow", description: "Land your next opportunity" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Get Started in Minutes
        </h2>

        <p className="text-xl text-muted-foreground">
          Simple steps to find your next opportunity
        </p>
      </div>

      {/* 🔹 Steps */}
      <div className="grid md:grid-cols-4 gap-6 md:gap-4">
        {steps.map((item, idx) => (
          <div key={idx} className="relative">

            <div className="bg-secondary rounded-lg border border-border p-8 text-center">
              
              {/* Step Number */}
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                {item.step}
              </div>

              {/* Title */}
              <h3 className="font-bold text-foreground mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>

            {/* Arrow */}
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-16 -right-2 text-muted-foreground text-2xl">
                →
              </div>
            )}

          </div>
        ))}
      </div>

    </section>
  );
};

export default HowItWorksSection;
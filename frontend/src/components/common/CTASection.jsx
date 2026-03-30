import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">

      <div className="max-w-4xl mx-auto text-center">

        <div className="inline-block mb-6 px-4 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: "rgba(99,102,241,0.1)",
            color: "#6366F1"
          }}
        >
          Start your journey today
        </div>


        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#111827] leading-tight">
          Ready to Build Your
          <span className="block" style={{ color: "#6366F1" }}>
            Real Career?
          </span>
        </h2>

        <p className="text-lg mb-10 text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
          Join thousands of professionals and connect with real opportunities,
          without the noise or exaggeration.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Button
            className="h-12 px-8 font-semibold text-white rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "#6366F1",
              boxShadow: "0 10px 25px rgba(99,102,241,0.25)"
            }}
          >
            Get Started Free
          </Button>

          <Button
            variant="outline"
            className="h-12 px-8 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              borderColor: "#D1D5DB",
              color: "#111827"
            }}
          >
            Learn More
          </Button>

        </div>

      </div>
    </section>
  );
};

export default CTASection;
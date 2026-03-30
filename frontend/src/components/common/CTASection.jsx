import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-foreground text-white py-20 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto text-center">
        
        {/* 🔹 Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Find Your Real Opportunity?
        </h2>

        {/* 🔹 Description */}
        <p className="text-lg text-white/80 mb-8">
          Join thousands of professionals building authentic careers on CareerChat.
        </p>

        {/* 🔹 Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-8 font-semibold">
            Get Started Free
          </Button>

          <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 h-12 px-8 font-semibold"
          >
            Talk to Sales
          </Button>

        </div>

      </div>

    </section>
  );
};

export default CTASection;
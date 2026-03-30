import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const companies = ["Google", "Microsoft", "Apple", "Meta"];

  return (
    <div className="space-y-8">
      
      {/* 🔹 Hero Text */}
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
          Connect Without Exaggeration
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed">
          A professional network built on authenticity. Real jobs, real people, real opportunities. No filters, no corporate theater.
        </p>
      </div>

      {/* 🔹 CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        
        <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-lg font-semibold flex items-center justify-center gap-2 group">
          Join Now
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition"
          />
        </Button>

        <Button
          variant="outline"
          className="h-12 px-8 rounded-lg font-semibold border-2 border-foreground text-foreground hover:bg-secondary"
        >
          Watch Demo
        </Button>

      </div>

      {/* 🔹 Trust Section */}
      <div className="pt-8 border-t border-border space-y-4">
        <p className="text-sm font-semibold text-muted-foreground">
          TRUSTED BY PROFESSIONALS FROM
        </p>

        <div className="flex gap-6 flex-wrap">
          {companies.map((company, index) => (
            <span
              key={index}
              className="text-sm font-semibold text-foreground"
            >
              {company}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
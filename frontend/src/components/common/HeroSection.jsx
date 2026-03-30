import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const companies = ["Google", "Microsoft", "Apple", "Meta"];

  return (
    <div className="space-y-8 text-[#111827]">

      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          <span
            style={{
              background: "linear-gradient(90deg, #111827, #6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Connect Without Exaggeration
          </span>
        </h1>

        <p className="text-xl leading-relaxed text-[#6B7280]">
          A professional network built on authenticity. Real jobs, real people, real opportunities. No filters, no corporate theater.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">

        <Button
          className="h-12 px-8 rounded-lg font-semibold flex items-center justify-center gap-2 group"
          style={{
            backgroundColor: "#6366F1",
            color: "#FFFFFF",
            boxShadow: "0 8px 20px rgba(99,102,241,0.25)"
          }}
        >
          Join Now
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition"
          />
        </Button>

      </div>

      <div
        className="pt-10 mt-10 space-y-6 border-t"
        style={{ borderColor: "#E5E7EB" }}
      >

        <p className="text-xs tracking-widest font-semibold text-[#6B7280] text-start">
          TRUSTED BY PROFESSIONALS FROM
        </p>

        <div className="flex flex-wrap items-center gap-8">

          {companies.map((company, index) => (
            <div
              key={index}
              className="px-4 py-2 rounded-lg border transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#6366F1]"
              style={{
                background: "#ffffff",
                borderColor: "#E5E7EB",
              }}
            >
              <span className="text-sm font-semibold text-[#374151]">
                {company}
              </span>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default HeroSection;
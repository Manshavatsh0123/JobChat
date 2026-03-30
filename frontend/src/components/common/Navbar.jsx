'use client'
import { Menu, X } from 'lucide-react';
import { Button } from "../ui/button";
import { useState } from 'react';
import { useRouter } from "next/navigation";

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md border-b"
            style={{ backgroundColor: "rgba(255,255,255,0.8)", borderColor: "#E5E7EB" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 flex items-center justify-center rounded-xl shadow-sm"
                            style={{ backgroundColor: "#6366F1" }}
                        >
                            <span className="text-white font-bold">C</span>
                        </div>

                        <span className="font-bold text-lg text-[#111827]">
                            CareerChat
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button
                            variant="ghost"
                            className="text-[#111827] hover:bg-gray-100"
                            onClick={() => router.push("/login")}>
                            Sign In
                        </Button>

                        <Button
                            className="text-white"
                            style={{
                                backgroundColor: "#6366F1",
                                boxShadow: "0 8px 20px rgba(99,102,241,0.25)"
                            }}
                        >
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#111827]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t space-y-2"
                        style={{ borderColor: "#E5E7EB" }}
                    >
                        {["Features", "Pricing", "About"].map((item, i) => (
                            <a
                                key={i}
                                href="#"
                                className="block py-2 text-[#374151] hover:text-[#6366F1] transition"
                            >
                                {item}
                            </a>
                        ))}

                        <div className="flex gap-3 mt-4">
                            <Button variant="outline" className="flex-1">
                                Sign In
                            </Button>

                            <Button
                                className="flex-1 text-white"
                                style={{ backgroundColor: "#6366F1" }}
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </nav>
    )
}

export default Navbar;
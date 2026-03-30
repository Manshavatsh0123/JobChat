'use client'
import { Menu, X } from 'lucide-react';
import { Button } from "../ui/button";
import { useState } from 'react';

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">C</span>
                        </div>
                        <span className="font-bold text-lg text-foreground">CareerChat</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-muted-foreground hover:text-foreground transition font-medium">Features</a>
                        <a href="#" className="text-muted-foreground hover:text-foreground transition font-medium">Pricing</a>
                        <a href="#" className="text-muted-foreground hover:text-foreground transition font-medium">About</a>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button variant="ghost" className="text-foreground hover:bg-secondary">Sign In</Button>
                        <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
                    </div>

                    {/* Mobile Menu */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Content */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-border">
                        <a href="#features" className="block py-3 text-foreground hover:text-primary transition">Features</a>
                        <a href="#" className="block py-3 text-foreground hover:text-primary transition">Pricing</a>
                        <a href="#" className="block py-3 text-foreground hover:text-primary transition">About</a>
                        <div className="flex gap-3 mt-4">
                            <Button variant="outline" className="flex-1">Sign In</Button>
                            <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">Get Started</Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;

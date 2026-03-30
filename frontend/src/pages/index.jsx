'use client';

import { useState } from 'react';
import { Users, Briefcase, TrendingUp, Lock, MessageCircle, Building2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserLayout from '@/layout/UserLayout';
import Footer from '@/components/common/Footer';
import ProfileCard from '@/components/common/ProfileCard';
import HeroSection from '@/components/common/HeroSection';
import StatsSection from '@/components/common/Stats';
import FeaturesSection from '@/components/common/FeatureSection';
import CTASection from '@/components/common/CTASection';

export default function Home() {

  const features = [
    {
      icon: Users,
      title: 'Authentic Connections',
      description: 'Build genuine professional relationships without exaggeration or pretense.',
    },
    {
      icon: TrendingUp,
      title: 'Real Career Growth',
      description: 'Track your progress and discover opportunities aligned with your goals.',
    },
    {
      icon: MessageCircle,
      title: 'Meaningful Conversations',
      description: 'Engage in substantive discussions with industry leaders and peers.',
    },
    {
      icon: Briefcase,
      title: 'Curated Opportunities',
      description: 'Access job listings from companies that match your values.',
    },
    {
      icon: Lock,
      title: 'Privacy Focused',
      description: 'You control your data. No algorithms selling your information.',
    },
    {
      icon: Building2,
      title: 'For Companies',
      description: 'Find authentic talent and build strong teams.',
    },
  ];

  return (
    <UserLayout>
      <div className="min-h-screen bg-white">

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <HeroSection />

            {/* Right Side - Visual */}
            <div className="hidden md:block">
              <div className="space-y-4">

                <ProfileCard
                  name="Sarah Chen"
                  role="Product Designer at Google"
                  message="Found my perfect role in 2 weeks"
                  image="/src/images/Image1.jpg"
                />

                <ProfileCard
                  name="Alex Kumar"
                  role="Senior Engineer at Meta"
                  message="Connected with amazing mentors"
                  offset={true}
                  image="/src/images/Image1.jpg"
                />

                <ProfileCard
                  name="Jordan Smith"
                  role="CEO at StartUp Inc"
                  message="Built my entire leadership team here"
                  image="/src/images/image2.avif"
                />

              </div>
            </div>
          </div>

          {/* Stats */}
          <StatsSection />
        </section>

        {/* Features Section */}
        <FeaturesSection features={features} />

        {/* CTA Section */}
        <CTASection />

        <Footer />
      </div>
    </UserLayout>
  );
}

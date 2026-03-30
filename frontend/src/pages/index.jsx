import { Users, Briefcase, TrendingUp, Lock, MessageCircle, Building2 } from 'lucide-react';
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

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <HeroSection />

            <div className="hidden md:block">
              <div className="space-y-4">

                <ProfileCard
                  name="Sarah Chen"
                  role="Product Designer at Google"
                  message="Found my perfect role in 2 weeks"
                  image="/images/alex.jpg"
                />

                <ProfileCard
                  name="Alex Kumar"
                  role="Senior Engineer at Meta"
                  message="Connected with amazing mentors"
                  offset={true}
                  image="/images/Person2.webp"
                />

                <ProfileCard
                  name="Jordan Smith"
                  role="CEO at StartUp Inc"
                  message="Built my entire leadership team here"
                  image="/images/Person1.jpg"
                />

              </div>
            </div>
          </div>

          <StatsSection />
        </section>

        <FeaturesSection features={features} />

        <CTASection />

        <Footer />
      </div>
    </UserLayout>
  );
}

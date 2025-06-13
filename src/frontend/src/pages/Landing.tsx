import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Package, ShieldCheck, TrendingUp, Zap, LineChart, Leaf, QrCode, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: Array(4).fill(false),
    benefits: Array(3).fill(false),
    testimonials: Array(3).fill(false),
    cta: false,
  });
  
  useEffect(() => {
    setIsVisible(prev => ({ ...prev, hero: true }));
    
    const featureTimers = isVisible.features.map((_, index) => {
      return setTimeout(() => {
        setIsVisible(prev => {
          const newFeatures = [...prev.features];
          newFeatures[index] = true;
          return { ...prev, features: newFeatures };
        });
      }, 300 + index * 150);
    });
    
    const benefitTimers = isVisible.benefits.map((_, index) => {
      return setTimeout(() => {
        setIsVisible(prev => {
          const newBenefits = [...prev.benefits];
          newBenefits[index] = true;
          return { ...prev, benefits: newBenefits };
        });
      }, 800 + index * 150);
    });
    
    const testimonialTimers = isVisible.testimonials.map((_, index) => {
      return setTimeout(() => {
        setIsVisible(prev => {
          const newTestimonials = [...prev.testimonials];
          newTestimonials[index] = true;
          return { ...prev, testimonials: newTestimonials };
        });
      }, 1200 + index * 150);
    });
    
    const ctaTimer = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, cta: true }));
    }, 1600);
    
    return () => {
      [...featureTimers, ...benefitTimers, ...testimonialTimers, ctaTimer].forEach(
        timer => clearTimeout(timer)
      );
    };
  }, []);
  
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-20 z-0" />
        <div
          className={`container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 relative z-10 transition-all duration-700 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 py-1 px-3 text-base animate-pulse">
              Revolutionizing Supply Chain Transparency
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ethical Supply Chain
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {' '}Tracking & Verification
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Gain complete visibility into your supply chain. Track, verify, and 
              showcase your commitment to ethical and sustainable sourcing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={isAuthenticated ? '/dashboard' : '/register'}>
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg">
                  Browse Verified Products
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <div className="relative w-full max-w-4xl h-auto rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 z-10" />
              <img
                src="https://images.pexels.com/photos/7353211/pexels-photo-7353211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Supply Chain Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Traceable Products', value: '10,000+' },
              { label: 'Verified Suppliers', value: '2,500+' },
              { label: 'Countries Covered', value: '45+' },
              { label: 'Sustainability Score', value: '93%' },
            ].map((stat, index) => (
              <div 
                key={index}
                className={`bg-card border border-border rounded-lg p-4 text-center transition-all duration-500 delay-${
                  index * 100
                } ${
                  isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Core Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Supply Chain Visibility
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform offers comprehensive tools to track, verify, and showcase
              the ethical journey of your products from source to shelf.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: 'Real-time Tracking',
                description:
                  'Monitor your supply chain in real-time. Get instant alerts about disruptions, delays, or compliance issues as they happen.',
                points: [
                  'GPS tracking and location verification',
                  'Automatic risk assessment and alerts',
                  'Mobile app for on-the-go monitoring',
                ],
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-secondary" />,
                title: 'Compliance Verification',
                description:
                  'Verify that all suppliers meet your ethical and sustainability standards with automated compliance checks and audits.',
                points: [
                  'Automatic document verification',
                  'Third-party audit integration',
                  'Compliance score calculation',
                ],
              },
              {
                icon: <LineChart className="h-8 w-8 text-accent-dark" />,
                title: 'Impact Analytics',
                description:
                  'Measure and analyze the environmental and social impact of your supply chain with comprehensive analytics.',
                points: [
                  'Carbon footprint calculation',
                  'Water usage and waste metrics',
                  'Labor practice assessments',
                ],
              },
              {
                icon: <QrCode className="h-8 w-8 text-primary" />,
                title: 'Consumer Transparency',
                description:
                  'Share your ethical sourcing story with consumers through QR codes, allowing them to trace product origins and verify claims.',
                points: [
                  'Product-specific QR codes',
                  'Consumer-friendly supply chain visualization',
                  'Social impact storytelling',
                ],
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`transition-all duration-700 ${
                  isVisible.features[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <CardContent className="p-6">
                  <div className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/10 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Why Choose SupplyX
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefits for Your Business
            </h2>
            <p className="text-lg text-muted-foreground">
              From regulatory compliance to customer trust, our platform helps you
              achieve multiple business objectives with a single solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="h-12 w-12 text-primary" />,
                title: "Increased Consumer Trust",
                description:
                  "Build stronger relationships with consumers by providing verified information about your product's origins and ethical credentials.",
              },
              {
                icon: <ShieldCheck className="h-12 w-12 text-secondary" />,
                title: 'Regulatory Compliance',
                description:
                  'Stay ahead of evolving regulations like the EU Supply Chain Due Diligence Act and avoid penalties with built-in compliance tools.',
              },
              {
                icon: <Leaf className="h-12 w-12 text-success" />,
                title: 'Enhanced Sustainability',
                description:
                  'Identify opportunities to reduce your environmental footprint and make meaningful progress toward sustainability goals.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className={`bg-card border border-border rounded-lg p-8 text-center transition-all duration-700 ${
                  isVisible.benefits[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="rounded-full w-20 h-20 mx-auto flex items-center justify-center bg-primary/10 mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-muted-foreground">
              See how organizations across various industries have transformed their
              supply chains with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "SupplyX has transformed how we manage our supply chain. We've increased our sustainability score by 28% and our customers love the transparency.",
                author: 'Sarah Johnson',
                role: 'Sustainability Director',
                company: 'EcoWear Apparel',
              },
              {
                quote:
                  "The ability to trace our products from farm to shelf has not only improved our operations but also increased customer confidence in our brand.",
                author: 'David Chen',
                role: 'Supply Chain Manager',
                company: 'Organic Foods Co.',
              },
              {
                quote:
                  "After implementing SupplyX, we identified several opportunities to reduce our carbon footprint and cut costs simultaneously.",
                author: 'Maria Rodriguez',
                role: 'Chief Operations Officer',
                company: 'GreenTech Solutions',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`bg-card border border-border rounded-lg p-8 transition-all duration-700 ${
                  isVisible.testimonials[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-2xl text-primary/70">"</div>
                  <p className="text-foreground mb-6 flex-grow">{testimonial.quote}</p>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div 
          className={`container mx-auto px-4 transition-all duration-700 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Supply Chain?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of forward-thinking companies that are using
                SupplyX to build more transparent, ethical, and sustainable
                supply chains.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to={isAuthenticated ? '/dashboard' : '/register'}>
                  <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                    {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" size="lg">
                    See it in Action
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
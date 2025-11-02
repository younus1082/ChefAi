'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from './contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  SparklesIcon, 
  ClockIcon, 
  HeartIcon,
  StarIcon,
  ArrowRightIcon,
  CheckIcon,
  CubeIcon,
  LightBulbIcon,
  ShoppingCartIcon,
  FireIcon
} from '@heroicons/react/24/outline';

export default function LandingPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);



  const features = [
    {
      icon: CubeIcon,
      title: "Smart Inventory",
      description: "Track your ingredients with AI-powered expiry alerts and smart categorization.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: LightBulbIcon,
      title: "Recipe Generation",
      description: "Get personalized recipes based on your available ingredients and preferences.",
      color: "from-purple-400 to-indigo-500"
    },
    {
      icon: ShoppingCartIcon,
      title: "Smart Shopping",
      description: "Auto-generate grocery lists and never forget an ingredient again.",
      color: "from-orange-400 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Chef",
      content: "ChefAI has revolutionized my cooking! I never waste ingredients anymore.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Food Blogger",
      content: "The recipe suggestions are incredibly creative and always delicious.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Busy Mom",
      content: "Saves me hours of meal planning every week. Absolutely love it!",
      rating: 5
    }
  ];

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Animation with Food Icons */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-teal-500/10">
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => {
              const foodIcons = ['🍎', '🥕', '🍞', '🧄', '🍅', '🥬', '🧅', '🥒', '🌶️', '🥑', '🍋', '🥔', '🌽', '🥦', '🍇', '🍕', '🍔', '🍝', '🥗', '🍜', '🍲', '🥘', '🍳', '🥞', '🧀', '🥓', '🍗', '🥩', '🍤', '🦐', '🍣', '🍱', '🥟', '🌮', '🌯', '🥙', '🥪', '🍰', '🧁', '🍪', '🥧', '🍯', '🥜', '🌰', '🥥'];
              const randomIcon = foodIcons[Math.floor(Math.random() * foodIcons.length)];
              return (
                <div
                  key={i}
                  className="absolute animate-float-continuous"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${8 + Math.random() * 6}s`
                  }}
                >
                  <div className="text-2xl opacity-20 hover:opacity-40 transition-opacity duration-300">
                    {randomIcon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Logo Animation */}
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 rounded-2xl shadow-2xl mb-8 transform transition-all duration-1000 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
              <SparklesIcon className="w-10 h-10 text-white" />
            </div>

            {/* Main Heading */}
            <h1 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 bg-clip-text text-transparent mb-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              ChefAI
            </h1>

            <p className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Your AI-powered cooking companion that transforms your ingredients into culinary masterpieces
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                href="/register"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Cooking</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                href="/login"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-purple-500 hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600">Recipes Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5K+</div>
                <div className="text-gray-600">Happy Chefs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">98%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionize Your Kitchen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how ChefAI makes cooking smarter, easier, and more enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {features.map((feature, index) => {
               const Icon = feature.icon;
               return (
                 <div
                   key={index}
                   className="group p-8 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white"
                 >
                   <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r ${feature.color}`}>
                     <Icon className="w-8 h-8 text-white" />
                   </div>
                   <h3 className="text-xl font-semibold mb-4 text-gray-900">
                     {feature.title}
                   </h3>
                   <p className="text-gray-600">
                     {feature.description}
                   </p>
                 </div>
               );
             })}
           </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to culinary excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Add Ingredients",
                description: "Simply input what you have in your kitchen",
                icon: CubeIcon
              },
              {
                title: "Get Recipes",
                description: "AI generates personalized recipes instantly",
                icon: LightBulbIcon
              },
              {
                 title: "Start Cooking",
                 description: "Follow step-by-step instructions to create amazing meals",
                 icon: FireIcon
               }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Chefs Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied home cooks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Cooking?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of home chefs who are already cooking smarter with ChefAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="group px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <SparklesIcon className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold">ChefAI</span>
            </div>
            <p className="text-gray-400 mb-8">
              Your AI-powered cooking companion
            </p>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500">
                © 2024 ChefAI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
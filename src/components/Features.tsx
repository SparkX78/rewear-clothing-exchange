import React from 'react';
import { ArrowRightLeft, Coins, Shield, Leaf, Users, Sparkles } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: ArrowRightLeft,
      title: 'Direct Swaps',
      description: 'Exchange items directly with other users. Find the perfect match for your style preferences.',
      color: 'bg-emerald-500'
    },
    {
      icon: Coins,
      title: 'Point System',
      description: 'Earn points by listing items and spend them on pieces you love. Flexible and fair for everyone.',
      color: 'bg-blue-500'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Safe and secure transactions with user verification and protection for all exchanges.',
      color: 'bg-purple-500'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Reduce textile waste and carbon footprint. Every swap contributes to a more sustainable planet.',
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a vibrant community of fashion enthusiasts committed to sustainable living.',
      color: 'bg-pink-500'
    },
    {
      icon: Sparkles,
      title: 'Quality Assured',
      description: 'All items are verified for quality and authenticity. Only the best pieces make it to our platform.',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose ReWear?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of sustainable fashion with our innovative platform designed for conscious consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-center text-white">
          <div className="absolute inset-0 opacity-20 rounded-2xl overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1"
              alt="Sustainable fashion"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making sustainable fashion choices. Start your journey today.
          </p>
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105">
            Get Started Now
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}
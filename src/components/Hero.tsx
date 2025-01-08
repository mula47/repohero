'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {/* Glass Effect Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-purple-400 font-mono text-lg mb-3">
              AI-Powered Repository Analysis
            </h2>
            
            <h1 className="text-6xl sm:text-7xl font-bold text-white mb-6">
              <span className="inline-block">
                Repo<span className="text-purple-500">Hero</span>
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed mx-auto max-w-2xl">
              Unlock the potential of your GitHub repositories with advanced AI analysis. 
              Get comprehensive insights, security checks, and performance metrics instantly.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/roadmap"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 
                         text-white font-medium rounded-lg transition-colors duration-200
                         shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
              >
                View Roadmap
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="https://twitter.com/repohero"
                target="_blank"
                className="inline-flex items-center px-6 py-3 border border-gray-600 
                         hover:border-purple-500 text-gray-300 hover:text-white font-medium 
                         rounded-lg transition-all duration-200"
              >
                Follow Updates
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            </div>

            {/* Feature List */}
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-4 text-gray-400">
                {[
                  'AI-Powered Analysis',
                  'Security Insights',
                  'Performance Metrics',
                  'Code Quality Checks'
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements - Now symmetrical */}
        <div className="absolute inset-x-0 top-0 h-full opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>
      </div>
    </div>
  );
} 
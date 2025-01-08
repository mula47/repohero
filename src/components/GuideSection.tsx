'use client';

import { motion } from 'framer-motion';

export default function GuideSection() {
  return (
    <div className="w-full relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-purple-400">Why</span>{' '}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              RepoHero
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your AI-powered companion for secure and informed repository analysis
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Get Started Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-sm rounded-2xl border border-gray-800/50 
                     bg-black/20 overflow-hidden p-8 
                     hover:border-purple-500/30 hover:bg-black/30
                     transition-all duration-300 group
                     shadow-[0_0_50px_-12px] shadow-purple-500/10"
          >
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-purple-400 text-3xl">🚀</span>
                Get Started with RepoAnalyzer
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Learn how to analyze GitHub repositories and identify potential scam projects.
              </p>
              
              <div className="space-y-8">
                <div className="bg-black/20 rounded-xl p-6 border border-gray-800/50">
                  <h4 className="text-purple-400 font-medium mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Using RepoHero
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      Enter the GitHub repository URL or Contract/Token Address (CA) in the analysis box
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      Review the confidence score and risk analysis
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      Check community votes and status badges
                    </li>
                  </ul>
                </div>

                <div className="bg-black/20 rounded-xl p-6 border border-gray-800/50">
                  <h4 className="text-purple-400 font-medium mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Community Features
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      Vote on repositories to help others
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      Mark repositories with status indicators (Fire, Moon, Doubt)
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      Check verified badges and community ratings
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Identifying Scams Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-sm rounded-2xl border border-gray-800/50 
                     bg-black/20 overflow-hidden p-8 
                     hover:border-purple-500/30 hover:bg-black/30
                     transition-all duration-300 group
                     shadow-[0_0_50px_-12px] shadow-purple-500/10"
          >
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-purple-400 text-3xl">🛡️</span>
                Identifying Scam Projects
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Learn to identify potential risks and verify project authenticity.
              </p>

              <div className="space-y-8">
                <div className="bg-black/20 rounded-xl p-6 border border-gray-800/50">
                  <h4 className="text-red-400 font-medium mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Repository Red Flags
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      New repository with unusually high activity
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Code similarity alerts (copied from other projects)
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Missing or unclear documentation
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      No active development or contributions
                    </li>
                  </ul>
                </div>

                <div className="bg-black/20 rounded-xl p-6 border border-gray-800/50">
                  <h4 className="text-green-400 font-medium mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Trust Indicators
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      Consistent development history and commits
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      Active community engagement and discussions
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      Clear roadmap and documentation
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      Regular security updates and maintenance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '🤖',
    title: 'Advanced AI Code Review',
    description: 'Deep learning models to analyze code quality, patterns, and potential vulnerabilities in real-time.',
    status: 'Coming Soon',
    progress: 80,
  },
  {
    icon: '🔐',
    title: 'Smart Contract Auditing',
    description: 'Automated security analysis for smart contracts with vulnerability detection and best practice recommendations.',
    status: 'In Development',
    progress: 60,
  },
  {
    icon: '📊',
    title: 'Repository Analytics Dashboard',
    description: 'Comprehensive analytics with AI-powered insights, trend analysis, and community health metrics.',
    status: 'Planning',
    progress: 40,
  },
  {
    icon: '🔍',
    title: 'Similarity Detection',
    description: 'AI-powered detection of code similarities across repositories to identify potential clones and forks.',
    status: 'Research',
    progress: 30,
  },
  {
    icon: '🎯',
    title: 'Custom Analysis Rules',
    description: 'Create and share custom analysis rules for specific project requirements and security standards.',
    status: 'Planned',
    progress: 20,
  },
  {
    icon: '🌐',
    title: 'Cross-Chain Analysis',
    description: 'Extended analysis support for multiple blockchain platforms and cross-chain compatibility checks.',
    status: 'Proposed',
    progress: 10,
  }
];

export default function UpcomingFeatures() {
  return (
    <div className="w-full relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-purple-400">Upcoming</span>{' '}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Exciting new features powered by cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="backdrop-blur-sm rounded-2xl border border-gray-800/50 
                       bg-black/20 overflow-hidden p-6 
                       hover:border-purple-500/30 hover:bg-black/30
                       transition-all duration-300 group
                       shadow-[0_0_50px_-12px] shadow-purple-500/10"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{feature.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-400">{feature.status}</span>
                      <span className="text-gray-500">{feature.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.progress}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 
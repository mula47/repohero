'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';

const roadmapItems = [
  {
    phase: "Phase 1 - Current",
    status: "Active",
    title: "Core Analysis Features",
    description: "Establishing fundamental repository analysis capabilities",
    completionPercentage: 80,
    items: [
      { text: "Basic repository metrics analysis", completed: true },
      { text: "Security vulnerability scanning", completed: true },
      { text: "Code quality assessment", completed: true },
      { text: "Community health indicators", completed: true },
      { text: "AI-powered insights generation", completed: false },
    ]
  },
  {
    phase: "Phase 2",
    status: "In Development",
    title: "Advanced AI Features",
    description: "Implementing sophisticated AI analysis capabilities",
    completionPercentage: 40,
    items: [
      { text: "Deep learning code analysis", completed: false },
      { text: "Smart contract vulnerability detection", completed: false },
      { text: "Automated code review suggestions", completed: false },
      { text: "Pattern recognition in repositories", completed: false },
    ]
  },
  {
    phase: "Phase 3",
    status: "Planned",
    title: "Community & Collaboration",
    description: "Enhancing community features and collaborative tools",
    completionPercentage: 10,
    items: [
      { text: "Repository comparison tools", completed: false },
      { text: "Community voting system", completed: false },
      { text: "Custom analysis rules", completed: false },
      { text: "Team collaboration features", completed: false },
    ]
  },
  {
    phase: "Phase 4",
    status: "Future",
    title: "Enterprise & Integration",
    description: "Building enterprise features and third-party integrations",
    completionPercentage: 0,
    items: [
      { text: "Enterprise dashboard", completed: false },
      { text: "CI/CD integration", completed: false },
      { text: "Custom reporting", completed: false },
      { text: "API access", completed: false },
    ]
  }
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-purple-400">Product</span>{' '}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Roadmap
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our vision and development timeline for RepoHero&apos;s features and capabilities
            </p>
          </motion.div>

          {/* Roadmap Timeline */}
          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-sm rounded-2xl border border-gray-800 
                         bg-black/20 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium px-3 py-1 rounded-full 
                                     bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {item.phase}
                        </span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full
                                     ${item.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                       item.status === 'In Development' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                       'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                          {item.status}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        {item.completionPercentage}%
                      </div>
                      <div className="text-sm text-gray-500">Completed</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.completionPercentage}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                    />
                  </div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {item.items.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3 p-3 rounded-lg
                                 bg-black/20 border border-gray-800"
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center
                                    ${feature.completed ? 
                                      'bg-green-500/20 text-green-400 border border-green-500/20' :
                                      'bg-gray-500/20 text-gray-400 border border-gray-500/20'}`}>
                          {feature.completed ? '✓' : '○'}
                        </div>
                        <span className="text-gray-300">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
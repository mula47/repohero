'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';

const sections = [
  {
    title: "Getting Started",
    icon: "🚀",
    content: [
      {
        heading: "What is RepoHero?",
        text: "RepoHero is an AI-powered GitHub repository analyzer that helps developers and teams assess code quality, security, and community health. Our platform uses advanced machine learning to provide comprehensive insights and security recommendations."
      },
      {
        heading: "Key Features",
        list: [
          "AI-powered code analysis",
          "Security vulnerability detection",
          "Community health metrics",
          "Smart contract auditing",
          "Repository comparison",
          "Automated recommendations"
        ]
      }
    ]
  },
  {
    title: "Analysis Features",
    icon: "🔍",
    content: [
      {
        heading: "Code Analysis",
        text: "Our AI engine analyzes repository code for:",
        list: [
          "Code quality and patterns",
          "Security vulnerabilities",
          "Best practice compliance",
          "Documentation completeness",
          "Test coverage indicators"
        ]
      },
      {
        heading: "Security Checks",
        text: "Comprehensive security analysis including:",
        list: [
          "Dependency vulnerabilities",
          "Code injection risks",
          "Access control issues",
          "Smart contract vulnerabilities",
          "Security policy compliance"
        ]
      }
    ]
  },
  {
    title: "Community Features",
    icon: "👥",
    content: [
      {
        heading: "Repository Metrics",
        text: "Track important community health indicators:",
        list: [
          "Active contributors",
          "Issue response time",
          "Pull request velocity",
          "Documentation quality",
          "Community engagement"
        ]
      }
    ]
  },
  {
    title: "Best Practices",
    icon: "✨",
    content: [
      {
        heading: "Repository Health",
        text: "Key factors we analyze for repository health:",
        list: [
          "Regular commit activity",
          "Comprehensive documentation",
          "Active issue management",
          "Security policy presence",
          "Clear contribution guidelines"
        ]
      }
    ]
  }
];

export default function DocsPage() {
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
              <span className="text-purple-400">Documentation</span>{' '}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                & Guides
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Learn how to use RepoHero to analyze and secure your GitHub repositories
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, sectionIndex) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="backdrop-blur-sm rounded-2xl border border-gray-800 
                         bg-black/20 overflow-hidden p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">{section.icon}</span>
                  {section.title}
                </h2>

                <div className="space-y-8">
                  {section.content.map((block, blockIndex) => (
                    <div key={blockIndex} className="space-y-4">
                      <h3 className="text-xl font-semibold text-purple-400">
                        {block.heading}
                      </h3>
                      {block.text && (
                        <p className="text-gray-300 leading-relaxed">
                          {block.text}
                        </p>
                      )}
                      {block.list && (
                        <ul className="grid md:grid-cols-2 gap-3">
                          {block.list.map((item, itemIndex) => (
                            <li 
                              key={itemIndex}
                              className="flex items-center gap-2 text-gray-300"
                            >
                              <svg className="w-5 h-5 text-purple-400 flex-shrink-0" 
                                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" 
                                      strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
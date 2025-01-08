'use client';

import { motion } from 'framer-motion';
import { AnalysisStorage, StoredAnalysis } from '@/services/storage';
import { useEffect, useState, useRef } from 'react';

export default function RecentAnalyses() {
  const [analyses, setAnalyses] = useState<StoredAnalysis[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnalyses(AnalysisStorage.getStoredAnalyses());
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjust scroll amount as needed
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (analyses.length === 0) return null;

  return (
    <div className="w-full bg-gradient-to-b from-black to-gray-900 -mt-32 pt-32 pb-16 relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            <span className="text-purple-400">Recently</span>{' '}
            <span className="text-white">Analyzed</span>{' '}
            <span className="text-gray-400">Repositories</span>
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-lg bg-black/20 hover:bg-black/40 backdrop-blur-sm
                       border border-gray-800 hover:border-purple-500/30 transition-all"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-lg bg-black/20 hover:bg-black/40 backdrop-blur-sm
                       border border-gray-800 hover:border-purple-500/30 transition-all"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-hidden relative flex gap-6 snap-x snap-mandatory"
        >
          {analyses.map((analysis, index) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="min-w-[280px] snap-start flex-shrink-0"
            >
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-5 
                            border border-gray-800 hover:border-purple-500/30
                            hover:bg-black/30 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white truncate max-w-[180px]">
                    {analysis.repoName}
                  </h3>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium
                    ${analysis.securityRating === 'High' 
                      ? 'bg-[#2D3B54] text-yellow-400' :
                      analysis.securityRating === 'Medium' 
                      ? 'bg-[#2D3B54] text-yellow-400' :
                      'bg-[#2D3B54] text-yellow-400'}`}
                  >
                    Score: {analysis.score}%
                  </span>
                </div>
                
                <p className="text-sm text-purple-400 mb-4">by {analysis.owner}</p>
                
                <div className="grid grid-cols-2 gap-4 bg-black/40 rounded-lg p-3 
                               border border-gray-800">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-400">Stars</span>
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="text-white font-medium">{analysis.stars}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-400">Total Forks</span>
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 3a3 3 0 013 3v4h6V6a3 3 0 116 0v12a3 3 0 11-6 0v-4H9v4a3 3 0 11-6 0V6a3 3 0 013-3z" />
                      </svg>
                      <span className="text-white font-medium">{analysis.forks}</span>
                    </div>
                  </div>
                </div>

                <a 
                  href={analysis.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2 
                           bg-purple-500/10 hover:bg-purple-500/20 text-gray-300 
                           rounded-lg transition-colors text-sm border border-purple-500/20"
                >
                  View on GitHub
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 
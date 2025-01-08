'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { AnalysisStorage, StoredAnalysis } from '@/services/storage';

const ITEMS_PER_PAGE = 9;

export default function ScannedReposPage() {
  const [analyses, setAnalyses] = useState<StoredAnalysis[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'stars'>('date');

  useEffect(() => {
    setAnalyses(AnalysisStorage.getStoredAnalyses());
  }, []);

  // Filter and sort analyses
  const filteredAnalyses = analyses
    .filter(analysis => 
      analysis.repoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.owner.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime();
        case 'score':
          return b.score - a.score;
        case 'stars':
          return b.stars - a.stars;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredAnalyses.length / ITEMS_PER_PAGE);
  const paginatedAnalyses = filteredAnalyses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
              <span className="text-purple-400">Scanned</span>{' '}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Repositories
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              History of all repository analyses performed by RepoHero
            </p>
          </motion.div>

          {/* Controls */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search repositories..."
                className="w-full px-4 py-2 bg-black/40 border border-gray-800 
                         rounded-lg text-white placeholder-gray-500 focus:border-purple-500/50
                         focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'score' | 'stars')}
                className="px-4 py-2 bg-black/40 border border-gray-800 rounded-lg
                         text-gray-300 focus:border-purple-500/50 transition-all"
              >
                <option value="date">Sort by Date</option>
                <option value="score">Sort by Score</option>
                <option value="stars">Sort by Stars</option>
              </select>
            </div>
          </div>

          {/* Grid of Analyses */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedAnalyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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

                  <div className="text-sm text-gray-500 mt-4 mb-4">
                    Analyzed {new Date(analysis.analyzedAt).toLocaleDateString()}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-black/40 border border-gray-800
                         text-gray-400 hover:text-white hover:border-purple-500/30
                         disabled:opacity-50 disabled:hover:border-gray-800
                         transition-all"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center
                           transition-all ${currentPage === page ?
                    'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    'bg-black/40 text-gray-400 border border-gray-800 hover:border-purple-500/30'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-black/40 border border-gray-800
                         text-gray-400 hover:text-white hover:border-purple-500/30
                         disabled:opacity-50 disabled:hover:border-gray-800
                         transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { analyzeRepository, RepoAnalysis } from '@/services/github';
import AnalysisResults from './AnalysisResults';

export default function SearchForm() {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<RepoAnalysis | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');
      if (!owner || !repo) {
        throw new Error('Invalid repository format');
      }
      const result = await analyzeRepository(owner, repo);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRepoUrl(text);
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-purple-400">Analyze</span>{' '}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Any GitHub Repository
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Get instant AI-powered insights about code quality, security, and community health
          </p>

          <div className="backdrop-blur-sm rounded-2xl p-8 
                        bg-black/20 border border-gray-800 
                        hover:border-purple-500/30 transition-all
                        shadow-[0_0_50px_-12px] shadow-purple-500/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 
                           bg-clip-text text-transparent mb-3">
                Ready to Analyze Your Repository?
              </h2>
              <p className="text-gray-400">
                Enter a GitHub repository URL or paste the repository path to get started
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                
                <input 
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="e.g., owner/repository or https://github.com/owner/repo"
                  className="w-full pl-12 pr-28 py-4 bg-black/40 text-white 
                           placeholder-gray-500 rounded-xl border border-gray-700/50
                           group-hover:border-purple-500/30 focus:border-purple-500/50
                           focus:ring-2 focus:ring-purple-500/20 transition-all"
                  pattern="^(?:https:\/\/github\.com\/)?[a-zA-Z0-9-]+\/[a-zA-Z0-9-_.]+$"
                  title="Please enter in format: username/repository or full GitHub URL"
                  disabled={loading}
                />
                
                <button
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5
                           text-sm text-gray-400 hover:text-white
                           bg-black/40 hover:bg-black/60 backdrop-blur-sm
                           rounded-lg border border-gray-700/50
                           hover:border-purple-500/30 transition-all"
                >
                  Paste URL
                </button>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700
                         hover:from-purple-500 hover:to-purple-600
                         text-white font-medium rounded-xl
                         transition-all transform hover:scale-[1.02]
                         disabled:opacity-50 disabled:hover:scale-100
                         shadow-lg shadow-purple-500/25
                         border border-purple-500/20"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Analyzing Repository...
                  </div>
                ) : (
                  'Analyze Repository'
                )}
              </button>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/20
                         text-red-400 rounded-lg text-center"
              >
                {error}
              </motion.div>
            )}
          </div>

          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <AnalysisResults analysis={analysis} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 
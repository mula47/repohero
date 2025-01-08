'use client';

import { RepoAnalysis } from '@/services/github';

export default function AnalysisResults({ analysis }: { analysis: RepoAnalysis }) {
  return (
    <div className="space-y-6 backdrop-blur-sm rounded-2xl border border-gray-800 
                    bg-black/20 overflow-hidden">
      {/* Score Section */}
      <div className="p-8 border-b border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Repository Analysis</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Score</span>
            <span className={`text-2xl font-bold px-4 py-2 rounded-lg
              ${analysis.aiSummary.score >= 80 ? 'text-green-400 bg-green-500/10 border border-green-500/20' :
                analysis.aiSummary.score >= 60 ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' :
                'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
              {analysis.aiSummary.score}%
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Stars', value: analysis.basic.stars, icon: '⭐' },
            { label: 'Forks', value: analysis.basic.forks, icon: '🔀' },
            { label: 'Contributors', value: analysis.basic.contributors, icon: '👥' },
            { label: 'Pull Requests', value: analysis.basic.pullRequests, icon: '🔄' },
          ].map((stat) => (
            <div key={stat.label} 
                 className="bg-black/40 rounded-xl p-4 border border-gray-800">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
              <div className="text-xl font-semibold text-white">
                {stat.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Features */}
      <div className="p-8 border-b border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-6">Security Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Security Policy', value: analysis.security.hasSecurityPolicy },
            { label: 'GitHub Actions', value: analysis.security.hasWorkflows },
            { label: 'README', value: analysis.security.hasReadme },
            { label: 'Contributing Guide', value: analysis.security.hasContributing },
            { label: 'Code of Conduct', value: analysis.security.hasCodeOfConduct },
          ].map((feature) => (
            <div key={feature.label} 
                 className="flex items-center gap-3 p-3 rounded-lg bg-black/40 
                          border border-gray-800">
              <div className={`text-lg ${feature.value ? 'text-green-400' : 'text-red-400'}`}>
                {feature.value ? '✓' : '×'}
              </div>
              <span className="text-gray-300">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="p-8 border-b border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-6">Languages</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(analysis.languages).map(([lang, bytes]) => (
            <div key={lang} 
                 className="px-4 py-2 bg-black/40 rounded-lg border border-gray-800
                          flex items-center gap-2">
              <span className="text-white">{lang}</span>
              <span className="text-sm text-gray-400">
                {Math.round(bytes / 1024)}KB
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis */}
      <div className="p-8">
        <h3 className="text-xl font-semibold text-white mb-6">AI Analysis</h3>
        <div className="grid gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-red-400 font-medium">Red Flags</h4>
                <ul className="space-y-2">
                  {analysis.aiSummary.redFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-red-400 mt-1">•</span>
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-green-400 font-medium">Green Flags</h4>
                <ul className="space-y-2">
                  {analysis.aiSummary.greenFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-green-400 mt-1">•</span>
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
            <h4 className="text-purple-400 font-medium mb-4">AI Insights</h4>
            <div className="prose prose-invert max-w-none">
              {analysis.aiInsights.split('\n').map((paragraph, i) => (
                paragraph.trim() && (
                  <p key={i} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
import { generateAIInsights } from './ai';
import { AnalysisStorage } from './storage';

const GITHUB_API_BASE = 'https://api.github.com';

interface GithubFile {
  name: string;
  type: string;
  path: string;
}

interface GithubLicense {
  name: string;
}

interface GithubRepo {
  stargazers_count: number;
  forks_count: number;
  subscribers_count: number;
  open_issues_count: number;
  updated_at: string;
  created_at: string;
  description: string | null;
  license: GithubLicense | null;
  has_wiki: boolean;
  has_pages: boolean;
  has_readme: boolean;
  default_branch: string;
}

export interface RepoAnalysis {
  basic: {
    stars: number;
    forks: number;
    watchers: number;
    issues: number;
    lastUpdate: string;
    createdAt: string;
    pullRequests: number;
    contributors: number;
    description: string;
    license: string;
  };
  languages: Record<string, number>;
  security: {
    hasSecurityPolicy: boolean;
    hasWorkflows: boolean;
    defaultBranch: string;
    hasReadme: boolean;
    hasContributing: boolean;
    hasCodeOfConduct: boolean;
  };
  aiSummary: {
    score: number;
    timesAnalyzed: number;
    redFlags: string[];
    greenFlags: string[];
    keyFindings: string[];
    securityRating: string;
    communityHealth: string;
  };
  aiInsights: string;
}

export async function analyzeRepository(owner: string, repo: string): Promise<RepoAnalysis> {
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'RepoHero-Analyzer',
      'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
    };

    // Enhanced parallel requests
    const [repoData, languages, security, pulls, contributors] = await Promise.all([
      fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, { headers }),
      fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`, { headers }),
      fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/.github`, { headers })
        .then(res => res.ok ? res.json() : [])
        .catch(() => []),
      fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls`, { headers }),
      fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors`, { headers })
    ]);

    if (!repoData.ok) throw new Error('Repository not found');

    const [repoJson, languagesJson, pullsJson, contributorsJson] = await Promise.all([
      repoData.json() as Promise<GithubRepo>,
      languages.json(),
      pulls.json(),
      contributors.ok ? contributors.json() : []
    ]);

    // Calculate repository age and activity metrics
    const createdAt = new Date(repoJson.created_at);
    const lastUpdate = new Date(repoJson.updated_at);
    const ageInMonths = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30));

    // Update the security.some() calls to use proper typing
    const securityFiles = security as GithubFile[];

    // Generate AI summary and analysis
    const aiSummary = generateAISummary({
      stars: repoJson.stargazers_count,
      age: ageInMonths,
      contributors: contributorsJson.length,
      hasDocumentation: repoJson.has_wiki || repoJson.has_pages,
      securityFeatures: {
        hasSecurityPolicy: securityFiles.some(f => f.name === 'SECURITY.md'),
        hasWorkflows: securityFiles.some(f => f.name === 'workflows'),
      },
      activity: {
        issues: repoJson.open_issues_count,
        pullRequests: pullsJson.length,
        lastUpdate: lastUpdate
      }
    });

    // Get AI insights
    const aiInsights = await generateAIInsights({
      basic: {
        stars: repoJson.stargazers_count,
        forks: repoJson.forks_count,
        contributors: contributorsJson.length,
        description: repoJson.description || 'No description provided',
        license: repoJson.license?.name || 'No license',
      },
      security: {
        hasSecurityPolicy: securityFiles.some(f => f.name === 'SECURITY.md'),
        hasWorkflows: securityFiles.some(f => f.name === 'workflows'),
        hasReadme: repoJson.has_readme,
        hasContributing: securityFiles.some(f => f.name === 'CONTRIBUTING.md'),
        hasCodeOfConduct: securityFiles.some(f => f.name === 'CODE_OF_CONDUCT.md')
      },
      languages: languagesJson
    });

    const result: RepoAnalysis = {
      basic: {
        stars: repoJson.stargazers_count,
        forks: repoJson.forks_count,
        watchers: repoJson.subscribers_count,
        issues: repoJson.open_issues_count,
        lastUpdate: repoJson.updated_at,
        createdAt: repoJson.created_at,
        pullRequests: pullsJson.length,
        contributors: contributorsJson.length,
        description: repoJson.description || 'No description provided',
        license: repoJson.license?.name || 'No license',
      },
      languages: languagesJson,
      security: {
        hasSecurityPolicy: securityFiles.some(f => f.name === 'SECURITY.md'),
        hasWorkflows: securityFiles.some(f => f.name === 'workflows'),
        defaultBranch: repoJson.default_branch,
        hasReadme: repoJson.has_readme,
        hasContributing: securityFiles.some(f => f.name === 'CONTRIBUTING.md'),
        hasCodeOfConduct: securityFiles.some(f => f.name === 'CODE_OF_CONDUCT.md')
      },
      aiSummary,
      aiInsights: aiInsights || ''
    };

    // Store the analysis
    AnalysisStorage.storeAnalysis(result, owner, repo);

    return result;
  } catch (error) {
    console.error('Analysis failed:', error);
    // Log error details securely without exposing sensitive info
    throw new Error('Repository analysis failed. Please try again later.');
  }
}

interface AISummaryData {
  stars: number;
  age: number;
  contributors: number;
  hasDocumentation: boolean;
  securityFeatures: {
    hasSecurityPolicy: boolean;
    hasWorkflows: boolean;
  };
  activity: {
    issues: number;
    pullRequests: number;
    lastUpdate: Date;
  };
}

function generateAISummary(data: AISummaryData) {
  const redFlags = [];
  const greenFlags = [];
  const keyFindings = [];
  let score = 70; // Base score

  // Calculate score and generate flags based on repository metrics
  if (data.stars < 10) {
    redFlags.push('Limited community adoption');
    score -= 5;
  }
  if (data.contributors < 2) {
    redFlags.push('Limited developer involvement');
    score -= 5;
  }
  if (!data.hasDocumentation) {
    redFlags.push('Poor or missing documentation');
    score -= 10;
  }

  if (data.securityFeatures.hasSecurityPolicy) {
    greenFlags.push('Has security policy');
    score += 5;
  }
  if (data.securityFeatures.hasWorkflows) {
    greenFlags.push('Has automated workflows');
    score += 5;
  }

  // Generate key findings
  keyFindings.push(`Repository is ${data.age} months old with ${data.stars} stars`);
  keyFindings.push(`Has ${data.contributors} contributors and ${data.activity.pullRequests} pull requests`);
  
  return {
    score: Math.min(100, Math.max(0, score)),
    timesAnalyzed: 1,
    redFlags,
    greenFlags,
    keyFindings,
    securityRating: score > 80 ? 'High' : score > 60 ? 'Medium' : 'Low',
    communityHealth: data.stars > 100 ? 'Active' : data.stars > 10 ? 'Growing' : 'New'
  };
} 
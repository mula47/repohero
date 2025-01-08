import { RepoAnalysis } from '@/services/github';

interface StoredAnalysis {
  id: string;                
  repoName: string;         
  owner: string;            
  score: number;            
  stars: number;            
  forks: number;            
  aiSummary: string[];      
  securityRating: string;   
  analyzedAt: string;       
  githubUrl: string;        
}

class AnalysisStorage {
  private static readonly MAX_ITEMS = 10;
  private static readonly STORAGE_KEY = 'repohero_analyses';

  static getStoredAnalyses(): StoredAnalysis[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static storeAnalysis(analysis: RepoAnalysis, owner: string, repoName: string): void {
    const analyses = this.getStoredAnalyses();
    const id = `${owner}/${repoName}`;

    const newAnalysis: StoredAnalysis = {
      id,
      repoName,
      owner,
      score: analysis.aiSummary.score,
      stars: analysis.basic.stars,
      forks: analysis.basic.forks,
      aiSummary: analysis.aiSummary.keyFindings,
      securityRating: analysis.aiSummary.securityRating,
      analyzedAt: new Date().toISOString(),
      githubUrl: `https://github.com/${owner}/${repoName}`
    };

    // Remove if exists
    const filteredAnalyses = analyses.filter(a => a.id !== id);
    
    // Add to start and limit to MAX_ITEMS
    const updatedAnalyses = [newAnalysis, ...filteredAnalyses].slice(0, this.MAX_ITEMS);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedAnalyses));
  }
}

export { AnalysisStorage, type StoredAnalysis }; 
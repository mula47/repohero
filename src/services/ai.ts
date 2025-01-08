import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use server-side API calls
});

interface RepoData {
  basic: {
    stars: number;
    forks: number;
    contributors: number;
    description: string;
    license: string | null | undefined;
  };
  security: {
    hasSecurityPolicy: boolean;
    hasWorkflows: boolean;
    hasReadme: boolean;
    hasContributing: boolean;
    hasCodeOfConduct: boolean;
  };
  languages: Record<string, number>;
}

export async function generateAIInsights(repoData: RepoData) {
  const prompt = `
    Analyze this GitHub repository and provide 5 key findings in bullet points.
    Focus on:
    - Code quality and structure
    - License and open-source status
    - Community engagement
    - Security status
    - Documentation quality

    Repository data:
    - Stars: ${repoData.basic.stars}
    - Forks: ${repoData.basic.forks}
    - Contributors: ${repoData.basic.contributors}
    - Description: ${repoData.basic.description}
    - License: ${repoData.basic.license}
    - Has Security Policy: ${repoData.security.hasSecurityPolicy}
    - Has GitHub Actions: ${repoData.security.hasWorkflows}
    - Has Documentation: ${repoData.security.hasReadme}

    Format response as:
    • [First insight about code quality]
    • [Second insight about license]
    • [Third insight about community]
    • [Fourth insight about security]
    • [Fifth insight about documentation]

    Keep each bullet point concise and factual.
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 200  // Reduced for more concise responses
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI Analysis failed:', error);
    return `
      • Analysis temporarily unavailable
      • Please check the metrics below for repository information
    `;
  }
} 
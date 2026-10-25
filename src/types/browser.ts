export type WebsiteCategory =
  | 'research'
  | 'corporate'
  | 'blog'
  | 'forum'
  | 'news'
  | 'tech_docs'
  | 'marketplace'
  | 'portal'
  | 'personal'
  | 'whistleblower';

export interface FictionalWebsite {
  url: string;
  title: string;
  category: WebsiteCategory;
  author?: string;
  lastUpdated?: string;
  description: string;
  icon?: string;
  contentHtml: string;
  rawSourceCode: string; // View Source with hidden comments/clues!
  links: string[]; // URLs of outgoing links
  hiddenClueId?: string;
  searchKeywords: string[];
}

export interface BrowserTab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
}

export interface BrowserBookmark {
  id: string;
  url: string;
  title: string;
  category: string;
}

export type Bilingual = { fa: string; en: string };

export type PortfolioSeed = {
  slug: string;
  category: string;
  year: number;
  client: string;
  featured: boolean;
  accent: string;
  icon: string;
  title: Bilingual;
  summary: Bilingual;
  challenge: Bilingual;
  solution: Bilingual;
  result: Bilingual;
  stack: string[];
  metrics: { label: Bilingual; value: string }[];
};

export type PostSeed = {
  slug: string;
  category: string;
  author: string;
  readMinutes: number;
  accent: string;
  title: Bilingual;
  excerpt: Bilingual;
  content: { fa: string[]; en: string[] };
  tags: string[];
  publishedAt: string;
};

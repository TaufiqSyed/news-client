export interface INewsArticle {
  author?: string;
  title?: string;
  description?: string;
  url: string;
  urlToImage: string;
  content: string;
  publishedAt: Date;
}

export interface IOption {
  id: string;
  name: string;
}

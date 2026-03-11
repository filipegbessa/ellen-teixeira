export interface Review {
  id: number;
  authorName: string;
  authorPhoto: string | null;
  rating: number;
  text: string;
  publishedAt: string;
  googleId: string;
}

export interface ReviewsSummary {
  averageRating: number;
  totalReviews: number;
}

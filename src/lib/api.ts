/**
 * API Client — ellen-api
 *
 * Funções para consumir a API backend (NestJS) usando axios.
 * `unstable_cache` do Next.js garante o comportamento de revalidação
 * (equivalente ao `next: { revalidate }` do fetch nativo).
 *
 * Se a API não estiver disponível, retorna array vazio — a UI trata o estado vazio.
 */

import axios from "axios";
import { unstable_cache } from "next/cache";
import type { Review, ReviewsSummary } from "@/types/review";

const API_URL = process.env.REVIEWS_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export const getReviews = unstable_cache(
  async (): Promise<Review[]> => {
    if (!API_URL) return [];

    try {
      const { data } = await apiClient.get<Review[]>("/reviews");
      return data;
    } catch (error) {
      return [];
    }
  },
  ["reviews"],
  { revalidate: 3600, tags: ["reviews"] }
);

export const getReviewsSummary = unstable_cache(
  async (): Promise<ReviewsSummary> => {
    if (!API_URL) return { averageRating: 0, totalReviews: 0 };

    try {
      const { data } = await apiClient.get<ReviewsSummary>("/reviews/summary");
      return data;
    } catch {
      return { averageRating: 0, totalReviews: 0 };
    }
  },
  ["reviews-summary"],
  { revalidate: 3600, tags: ["reviews"] }
);

import { useState, useEffect } from 'react';
import apiService, { FetchReviewsResponse, Review, SummaryData } from '../services/api';

export interface UseReviewsReturn {
  reviews: Review[];
  summary: SummaryData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching reviews from N8N
 * Falls back to mock data if API fails or is not configured
 */
export const useReviews = (): UseReviewsReturn => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReviewsData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from API first
      const data = await apiService.fetchReviews();
      setReviews(data.reviews);
      setSummary(data.summary);
    } catch (err) {
      console.warn('API request failed, using mock data:', err);
      // Fallback to mock data
      try {
        const { mockReviews, summaryData } = await import('../app/data/mockData');
        setReviews(mockReviews);
        setSummary(summaryData);
        setError(null); // Don't show error if we have fallback data
      } catch (mockErr) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch reviews';
        setError(new Error(errorMessage));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsData();
  }, []);

  return {
    reviews,
    summary,
    loading,
    error,
    refetch: fetchReviewsData,
  };
};

export interface UseExportReturn {
  exporting: boolean;
  error: Error | null;
  exportReport: (email: string, format: 'pdf' | 'csv' | 'json') => Promise<void>;
}

/**
 * Custom hook for exporting reports
 */
export const useExportReport = (): UseExportReturn => {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const exportReport = async (email: string, format: 'pdf' | 'csv' | 'json') => {
    setExporting(true);
    setError(null);

    try {
      await apiService.exportReport({
        email,
        format,
        includeCharts: true,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Export failed';
      setError(new Error(errorMessage));
      throw err;
    } finally {
      setExporting(false);
    }
  };

  return {
    exporting,
    error,
    exportReport,
  };
};

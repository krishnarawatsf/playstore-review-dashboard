/**
 * N8N API Service
 * Handles all communication with N8N webhooks and workflows
 */

export interface FetchReviewsResponse {
  reviews: Review[];
  summary: SummaryData;
  timestamp: string;
}

export interface Review {
  id: string;
  text: string;
  rating: number;
  sentiment: "positive" | "neutral" | "negative";
  score: number;
  reason: string;
  userName: string;
  date: string;
}

export interface SummaryData {
  total_reviews: number;
  positive_count: number;
  neutral_count: number;
  negative_count: number;
  top_complaints: string[];
  top_features: string[];
  daily_summary: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5678';
const N8N_REVIEWS_WEBHOOK = import.meta.env.VITE_N8N_REVIEWS_WEBHOOK;
const N8N_EXPORT_WEBHOOK = import.meta.env.VITE_N8N_EXPORT_WEBHOOK;

class ApiService {
  /**
   * Fetch reviews from N8N webhook
   */
  async fetchReviews(): Promise<FetchReviewsResponse> {
    try {
      if (!N8N_REVIEWS_WEBHOOK) {
        throw new Error('N8N_REVIEWS_WEBHOOK environment variable is not set');
      }

      const response = await fetch(`${API_BASE_URL}${N8N_REVIEWS_WEBHOOK}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        reviews: data.reviews || [],
        summary: data.summary || {},
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      throw error;
    }
  }

  /**
   * Export reports to email via N8N
   */
  async exportReport(exportData: {
    email: string;
    format: 'pdf' | 'csv' | 'json';
    includeCharts: boolean;
  }): Promise<{ success: boolean; message: string }> {
    try {
      if (!N8N_EXPORT_WEBHOOK) {
        throw new Error('N8N_EXPORT_WEBHOOK environment variable is not set');
      }

      const response = await fetch(`${API_BASE_URL}${N8N_EXPORT_WEBHOOK}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportData),
      });

      if (!response.ok) {
        throw new Error(`Export Error: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        message: data.message || 'Report exported successfully',
      };
    } catch (error) {
      console.error('Failed to export report:', error);
      throw error;
    }
  }

  /**
   * Send email notification via N8N
   */
  async sendNotification(notification: {
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/webhook/notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      if (!response.ok) {
        throw new Error(`Notification Error: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  }

  /**
   * Fetch analytics data
   */
  async fetchAnalytics(params?: {
    startDate?: string;
    endDate?: string;
    appId?: string;
  }): Promise<any> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);
      if (params?.appId) queryParams.append('appId', params.appId);

      const url = `${API_BASE_URL}/webhook/analytics${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Analytics Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;

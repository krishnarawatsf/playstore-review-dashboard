import { useState } from "react";
import { Filter, Mail, Calendar, Download, Star, AlertCircle, Loader } from "lucide-react";
import { ExecutiveSummary } from "./components/ExecutiveSummary";
import { ReviewCard } from "./components/ReviewCard";
import { StatsCharts } from "./components/StatsCharts";
import { ReportPreview } from "./components/ReportPreview";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { useReviews } from "../hooks/useReviews";

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "positive" | "neutral" | "negative"
  >("all");
  const [showReportPreview, setShowReportPreview] = useState(false);
  const { reviews, summary, loading, error } = useReviews();

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : reviews.filter((r) => r.sentiment === selectedFilter);

  const sentimentChartData = summary ? [
    { name: "Positive", value: summary.positive_count, color: "#22c55e" },
    { name: "Neutral", value: summary.neutral_count, color: "#f97316" },
    { name: "Negative", value: summary.negative_count, color: "#ef4444" },
  ] : [];

  const reasonsData = reviews
    .reduce((acc: { reason: string; count: number }[], review) => {
      const existing = acc.find((item) => item.reason === review.reason);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ reason: review.reason, count: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  Play Store
                </span>
                <span className="text-gray-900">Review Analyzer</span>
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                AI-powered sentiment analysis for Leap Scholar
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-full font-semibold">
                <Calendar className="w-4 h-4 mr-2" />
                April 2, 2026
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReportPreview(true)}
                className="rounded-full font-semibold"
              >
                <Mail className="w-4 h-4 mr-2" />
                View Report
              </Button>
              <Button size="sm" className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-semibold shadow-md">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-8">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Loading reviews...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Error Loading Data</h3>
                <p className="text-red-700 text-sm mt-1">{error.message}</p>
                <p className="text-red-700 text-sm mt-2">Using fallback mock data for preview.</p>
              </div>
            </div>
          )}

          {/* Executive Summary */}
          {summary && (
            <ExecutiveSummary
              summary={summary}
              date="Wednesday, April 2, 2026"
            />
          )}

          {/* Charts */}
          <StatsCharts
            sentimentData={sentimentChartData}
            reasonsData={reasonsData}
          />

          {/* Reviews Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Customer Reviews
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredReviews.length} reviews found
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 font-medium mr-1">Filter:</span>
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("all")}
                  className={`rounded-full font-semibold ${
                    selectedFilter === "all"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : ""
                  }`}
                >
                  All
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-white/20 text-current border-0"
                  >
                    {mockReviews.length}
                  </Badge>
                </Button>
                <Button
                  variant={selectedFilter === "positive" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("positive")}
                  className={`rounded-full font-semibold ${
                    selectedFilter === "positive"
                      ? "bg-green-600 hover:bg-green-700"
                      : ""
                  }`}
                >
                  Positive
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-white/20 text-current border-0"
                  >
                    {summaryData.positive_count}
                  </Badge>
                </Button>
                <Button
                  variant={selectedFilter === "neutral" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("neutral")}
                  className={`rounded-full font-semibold ${
                    selectedFilter === "neutral"
                      ? "bg-orange-600 hover:bg-orange-700"
                      : ""
                  }`}
                >
                  Neutral
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-white/20 text-current border-0"
                  >
                    {summaryData.neutral_count}
                  </Badge>
                </Button>
                <Button
                  variant={selectedFilter === "negative" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("negative")}
                  className={`rounded-full font-semibold ${
                    selectedFilter === "negative"
                      ? "bg-red-600 hover:bg-red-700"
                      : ""
                  }`}
                >
                  Negative
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-white/20 text-current border-0"
                  >
                    {summaryData.negative_count}
                  </Badge>
                </Button>
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid gap-5 md:grid-cols-2">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg font-medium">No reviews found for this filter.</p>
              </div>
            )}
          </div>

          {/* Workflow Info */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Automated Workflow
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100">
                <div className="font-bold text-gray-900 mb-3 text-base">
                  📊 Data Collection
                </div>
                <ul className="text-gray-700 space-y-2 text-sm leading-relaxed">
                  <li>• Daily 9 AM trigger</li>
                  <li>• Fetches ~50 reviews via SerpAPI</li>
                  <li>• Deduplicates entries</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100">
                <div className="font-bold text-gray-900 mb-3 text-base">
                  🧠 AI Analysis
                </div>
                <ul className="text-gray-700 space-y-2 text-sm leading-relaxed">
                  <li>• Google Gemini Flash model</li>
                  <li>• Individual sentiment scoring</li>
                  <li>• Sarcasm & complaint detection</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100">
                <div className="font-bold text-gray-900 mb-3 text-base">
                  📢 Distribution
                </div>
                <ul className="text-gray-700 space-y-2 text-sm leading-relaxed">
                  <li>• Email reports (HTML)</li>
                  <li>• Slack notifications</li>
                  <li>• DataTable storage</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rating Banner */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Top rated by aspirants
            </h3>
            <p className="text-gray-600 text-sm">
              Powered by n8n automation workflow • Google Gemini AI • SerpAPI
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2026 Leap Scholar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Report Preview Modal */}
      <ReportPreview
        isOpen={showReportPreview}
        onClose={() => setShowReportPreview(false)}
        summary={summaryData}
        date="Wednesday, April 2, 2026"
      />
    </div>
  );
}

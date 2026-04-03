import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useReviews } from "../hooks/useReviews";

type SentimentFilter = "all" | "positive" | "neutral" | "negative";

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState<SentimentFilter>("all");
  const { reviews, summary, loading, error } = useReviews();

  const counts = useMemo(() => {
    const positive = reviews.filter((r) => r.sentiment === "positive").length;
    const neutral = reviews.filter((r) => r.sentiment === "neutral").length;
    const negative = reviews.filter((r) => r.sentiment === "negative").length;
    return {
      total: reviews.length,
      positive: summary?.positive_count ?? positive,
      neutral: summary?.neutral_count ?? neutral,
      negative: summary?.negative_count ?? negative,
    };
  }, [reviews, summary]);

  const filteredReviews = useMemo(() => {
    if (selectedFilter === "all") return reviews;
    return reviews.filter((r) => r.sentiment === selectedFilter);
  }, [reviews, selectedFilter]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Play Store Review Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Basic and functional view powered by n8n data (with mock fallback).
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {loading && (
          <div className="rounded-lg border bg-white p-6 text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin" />
            <p className="mt-2 text-sm text-gray-600">Loading data...</p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Could not fetch from n8n: {error.message}. Showing fallback data.
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total" value={counts.total} />
          <StatCard label="Positive" value={counts.positive} />
          <StatCard label="Neutral" value={counts.neutral} />
          <StatCard label="Negative" value={counts.negative} />
        </section>

        <section className="rounded-lg border bg-white p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <FilterButton
              label={`All (${counts.total})`}
              active={selectedFilter === "all"}
              onClick={() => setSelectedFilter("all")}
            />
            <FilterButton
              label={`Positive (${counts.positive})`}
              active={selectedFilter === "positive"}
              onClick={() => setSelectedFilter("positive")}
            />
            <FilterButton
              label={`Neutral (${counts.neutral})`}
              active={selectedFilter === "neutral"}
              onClick={() => setSelectedFilter("neutral")}
            />
            <FilterButton
              label={`Negative (${counts.negative})`}
              active={selectedFilter === "negative"}
              onClick={() => setSelectedFilter("negative")}
            />
          </div>

          <p className="mb-3 text-sm text-gray-600">Showing {filteredReviews.length} reviews</p>

          <div className="space-y-3">
            {filteredReviews.map((review) => (
              <article key={review.id} className="rounded-md border p-3">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold">{review.userName}</span>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <p className="text-sm">{review.text}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
                  <span>Rating: {review.rating}/5</span>
                  <span>Sentiment: {review.sentiment}</span>
                  <span>Reason: {review.reason}</span>
                </div>
              </article>
            ))}

            {!loading && filteredReviews.length === 0 && (
              <div className="rounded-md border border-dashed p-6 text-center text-sm text-gray-500">
                No reviews found for this filter.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-3 py-1.5 text-sm ${
        active ? "bg-gray-900 text-white" : "bg-white text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

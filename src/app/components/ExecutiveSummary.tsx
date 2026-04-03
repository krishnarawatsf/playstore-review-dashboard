import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

interface SummaryData {
  total_reviews: number;
  positive_count: number;
  neutral_count: number;
  negative_count: number;
  top_complaints: string[];
  top_features: string[];
  daily_summary: string;
}

interface ExecutiveSummaryProps {
  summary: SummaryData;
  date: string;
}

export function ExecutiveSummary({ summary, date }: ExecutiveSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-7 h-7 text-yellow-300" />
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Review Intelligence Report
          </h1>
        </div>
        <p className="text-indigo-200 text-lg mb-8">{date}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">{summary.total_reviews}</div>
            <div className="text-sm text-indigo-200 font-medium">Total Reviews</div>
          </div>
          <div className="bg-green-500/30 backdrop-blur-sm rounded-xl p-5 border border-green-400/30">
            <div className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
              {summary.positive_count}
            </div>
            <div className="text-sm text-green-100 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Positive
            </div>
          </div>
          <div className="bg-orange-500/30 backdrop-blur-sm rounded-xl p-5 border border-orange-400/30">
            <div className="text-3xl font-bold text-white mb-1">{summary.neutral_count}</div>
            <div className="text-sm text-orange-100 font-medium">Neutral</div>
          </div>
          <div className="bg-red-500/30 backdrop-blur-sm rounded-xl p-5 border border-red-400/30">
            <div className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
              {summary.negative_count}
            </div>
            <div className="text-sm text-red-100 font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Negative
            </div>
          </div>
        </div>

        {/* Summary Text */}
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-3">Executive Summary</h3>
          <p className="text-indigo-50 leading-relaxed text-base">{summary.daily_summary}</p>
        </div>

        {/* Top Complaints & Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-lg">
              <TrendingDown className="w-5 h-5 text-red-300" />
              Top Complaints
            </h4>
            <ol className="space-y-3">
              {summary.top_complaints.map((complaint, idx) => (
                <li key={idx} className="flex items-start gap-3 text-indigo-50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-400/20 text-red-200 flex items-center justify-center text-sm font-semibold">
                    {idx + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{complaint}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-green-300" />
              Top Features
            </h4>
            <ol className="space-y-3">
              {summary.top_features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-indigo-50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-400/20 text-green-200 flex items-center justify-center text-sm font-semibold">
                    {idx + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

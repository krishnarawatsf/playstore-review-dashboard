import { Star, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface ReviewCardProps {
  review: {
    id: string;
    text: string;
    rating: number;
    sentiment: "positive" | "neutral" | "negative";
    score: number;
    reason: string;
    userName?: string;
    date?: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  const getSentimentConfig = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-200",
          icon: <ThumbsUp className="w-3.5 h-3.5" />,
        };
      case "negative":
        return {
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-red-200",
          icon: <ThumbsDown className="w-3.5 h-3.5" />,
        };
      default:
        return {
          bgColor: "bg-orange-50",
          textColor: "text-orange-700",
          borderColor: "border-orange-200",
          icon: <Minus className="w-3.5 h-3.5" />,
        };
    }
  };

  const config = getSentimentConfig(review.sentiment);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border border-gray-200 rounded-xl overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`${config.bgColor} ${config.textColor} ${config.borderColor} font-semibold px-3 py-1`}
            >
              <span className="flex items-center gap-1.5">
                {config.icon}
                <span className="capitalize">{review.sentiment}</span>
              </span>
            </Badge>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700 border-purple-200 capitalize font-medium px-3 py-1"
            >
              {review.reason}
            </Badge>
          </div>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 fill-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-4 text-[15px]">{review.text}</p>
        
        {review.userName && (
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                {review.userName.charAt(0)}
              </div>
              <span className="font-medium text-gray-900 text-sm">{review.userName}</span>
            </div>
            {review.date && (
              <span className="text-xs text-gray-500">{review.date}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Star } from 'lucide-react';
import { Review } from '@/lib/data';

interface ProductReviewsProps {
    reviews: Review[];
    rating: number;
    reviewCount: number;
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={`${star <= Math.round(rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700'
                        }`}
                />
            ))}
        </div>
    );
}

export default function ProductReviews({ reviews, rating, reviewCount }: ProductReviewsProps) {
    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="flex items-center gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="text-4xl font-bold">{rating.toFixed(1)}</div>
                <div>
                    <StarRating rating={rating} size={20} />
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Based on {reviewCount} reviews
                    </p>
                </div>
            </div>

            {/* Review List */}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="pb-6 border-b border-zinc-200 dark:border-zinc-800 last:border-0"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-medium">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium">{review.author}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{review.date}</p>
                                </div>
                            </div>
                            <StarRating rating={review.rating} />
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-300">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { StarRating };

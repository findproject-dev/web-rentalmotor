import React from 'react';
import { Star } from 'lucide-react';

type StarSize = 'sm' | 'md';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: StarSize;
}

const sizeMap: Record<StarSize, number> = {
  sm: 14,
  md: 18,
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  size = 'md',
}) => {
  const dim = sizeMap[size];
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {stars.map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating >= star - 1;
        const fillPercent = partial ? Math.round((rating - (star - 1)) * 100) : 0;

        return (
          <span key={star} className="relative inline-block" style={{ width: dim, height: dim }}>
            {/* Background empty star */}
            <Star
              size={dim}
              strokeWidth={1.5}
              style={{ color: '#D1D5DB', fill: '#D1D5DB', position: 'absolute', top: 0, left: 0 }}
            />
            {/* Filled star or partial */}
            {(filled || partial) && (
              <span
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: filled ? '100%' : `${fillPercent}%` }}
              >
                <Star
                  size={dim}
                  strokeWidth={1.5}
                  style={{ color: '#F47B35', fill: '#F47B35' }}
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;

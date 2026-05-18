'use client';

interface Review {
  text: string;
  author: string;
}

function ReviewBubble({ review }: { review: Review }) {
  return (
    <div className="relative flex-shrink-0 mx-3 my-2" style={{ width: '240px' }}>
      <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
        <p className="text-gray-800 text-sm leading-relaxed break-keep">
          {review.text}
        </p>
        <p className="text-cls-orange text-xs font-bold mt-2 text-right">
          {review.author}
        </p>
      </div>
    </div>
  );
}

export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  // 심리스 루프: 원본 + 복사본, translateX(-50%)로 정확히 한 세트 이동
  const doubled = [...reviews, ...reviews];

  return (
    <div className="mt-6 md:mt-8 overflow-hidden">
      <div
        className="review-marquee-track flex items-start"
        style={{ width: 'max-content' }}
      >
        {doubled.map((review, i) => (
          <ReviewBubble key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

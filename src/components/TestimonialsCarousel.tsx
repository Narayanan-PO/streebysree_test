'use client';

import { useState } from "react";

type Testimonial = {
  id: string | number;
  customer_name: string;
  quote: string; 
  rating: number;
};

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentPage, setCurrentPage] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);

  const currentTestimonials = testimonials.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <span className="mb-3 block text-xs font-medium tracking-[0.3em] text-[#8B5A2B] uppercase">
            Customer Stories
          </span>
          <h2 className="text-3xl font-serif text-stone-900">What They Say</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentTestimonials.map((t) => {
            const safeRating = t.rating || 5; 
            
            return (
              <div key={t.id} className="flex flex-col border border-stone-200 bg-white p-6 rounded-sm shadow-sm h-full">
                
                <div className="mb-4 text-[#D4AF37] text-sm tracking-widest">
                  {"★".repeat(safeRating)}{"☆".repeat(5 - safeRating)}
                </div>
                
                <p className="text-sm font-light leading-relaxed text-stone-600 mb-6 flex-grow line-clamp-6 italic">
                  "{t.quote}"
                </p>
                
                <span className="text-xs font-bold tracking-widest uppercase text-stone-800 border-t border-stone-100 pt-4 mt-auto">
                  - {t.customer_name}
                </span>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentPage === idx 
                    ? "bg-[#8B5A2B] w-8" 
                    : "bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Go to reviews page ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
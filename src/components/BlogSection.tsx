import React, { useState } from 'react';
import { 
  BookOpen, 
  Star, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Car as CarIcon,
  X,
  Share2
} from 'lucide-react';
import { BlogPost, Car } from '../types';
import { BLOG_POSTS } from '../data/blogs';
import { CARS_DATA } from '../data/cars';

interface BlogSectionProps {
  onSelectCar: (car: Car) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectCar }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Comparative Test', 'Import Guide', 'Autobahn EV Analysis'];

  const filteredPosts = activeCategory === 'ALL'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <section id="blog" className="py-16 border-t border-neutral-800 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Frankfurt Editorial Desk • Transatlantic Insights</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              Expert Automotive Reviews & Import Guides
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
              In-depth Autobahn evaluations, §21 StVZO homologation breakdowns, and head-to-head comparisons of Japanese hybrids vs. American muscle vs. German domestic benchmarks.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat === 'ALL' ? 'All Reviews' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-950">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-xs font-semibold text-amber-400">
                    {post.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-amber-500/40 text-xs font-bold text-white font-mono">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{post.ratingScore} / 10</span>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs text-neutral-300">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{post.readTime}</span>
                  </div>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2.5 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Highlights preview */}
                  <div className="mt-4 pt-4 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{post.pros[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-400">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{post.cons[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-neutral-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">{post.author.name}</p>
                      <p className="text-[10px] text-neutral-400 truncate max-w-[140px]">{post.author.role}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                {selectedPost.category}
              </span>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Article Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono leading-tight">
                  {selectedPost.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-800 text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPost.author.avatar}
                      alt={selectedPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-white text-sm">{selectedPost.author.name}</p>
                      <p className="text-neutral-400 text-xs">{selectedPost.author.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold font-mono bg-amber-500/10 px-2 py-1 rounded">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>Rating: {selectedPost.ratingScore} / 10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="aspect-[21/9] rounded-xl overflow-hidden border border-neutral-800">
                <img
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Pros & Cons Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    Tested Strengths & Advantages
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {selectedPost.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">+</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5 font-mono">
                    <XCircle className="w-4 h-4" />
                    Trade-offs & German Limitations
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {selectedPost.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">-</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Article Content Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                {selectedPost.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Related Vehicles in Showroom */}
              {selectedPost.relatedCarIds.length > 0 && (
                <div className="pt-6 border-t border-neutral-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 font-mono">
                    Vehicles Evaluated in this Review (Available in Frankfurt)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedPost.relatedCarIds.map((cId) => {
                      const car = CARS_DATA.find((c) => c.id === cId);
                      if (!car) return null;
                      return (
                        <div
                          key={cId}
                          onClick={() => {
                            setSelectedPost(null);
                            onSelectCar(car);
                          }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 cursor-pointer transition-all group"
                        >
                          <img
                            src={car.images.exteriorFront}
                            alt={car.name}
                            className="w-16 h-12 rounded-lg object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white group-hover:text-amber-400 truncate">
                              {car.name}
                            </p>
                            <p className="text-[11px] text-amber-500 font-mono">
                              €{car.priceEur.toLocaleString('de-DE')} • {car.powerHp} PS
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

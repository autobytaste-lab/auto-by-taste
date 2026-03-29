import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const categoryColors: Record<string, string> = {
  'OpenClaw': 'text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/20',
  'LLM': 'text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20',
  'AI Agent': 'text-[#34d399] bg-[#34d399]/10 border-[#34d399]/20',
  'Hướng dẫn': 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/20',
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export const BlogPreview: React.FC = () => {
  // Sort by date descending, take 3
  const latest = [...blogPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <section className="py-20 px-6 bg-[#000]">
      <div className="max-w-[980px] mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-[#4ade80] text-xs font-medium tracking-wide uppercase">Blog</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Kiến thức AI &{' '}
              <span className="text-[#4ade80]">Hướng dẫn</span>
            </h2>
            <p className="text-[#555] text-base mt-3 max-w-md">
              Bài viết chuyên sâu về AI Agent, LLM, và cách tận dụng OpenClaw.
            </p>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-2 text-sm text-[#555] hover:text-white border border-[#222] hover:border-[#444] px-5 py-2.5 rounded-full transition-all duration-200 flex-shrink-0"
          >
            Xem tất cả
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className={`group block bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#4ade80]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#4ade80]/5 hover:-translate-y-1 ${i === 0 ? 'md:col-span-1' : ''}`}
            >
              {/* Featured badge for first */}
              {i === 0 && (
                <div className="px-5 pt-5">
                  <span className="text-[10px] text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/20 px-2 py-0.5 rounded-full font-semibold">
                    ✦ Mới nhất
                  </span>
                </div>
              )}

              <div className="p-5">
                {/* Category + read time */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-[#555] text-xs flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime} phút
                  </span>
                </div>

                <h3 className="text-white font-bold text-sm leading-snug mb-2.5 group-hover:text-[#4ade80] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[#666] text-xs leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-5 pb-5 flex items-center justify-between">
                <span className="text-[#444] text-xs">{formatDate(post.publishedAt)}</span>
                <span className="text-[#4ade80] text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Đọc
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: View all button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#555] hover:text-white border border-[#222] hover:border-[#444] px-5 py-2.5 rounded-full transition-all duration-200"
          >
            Xem tất cả bài viết
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

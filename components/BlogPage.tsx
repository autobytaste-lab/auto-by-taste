import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, categories } from '../data/blogPosts';

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

export const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');

  const filtered = activeCategory === 'Tất cả'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#000] text-white">
      {/* Header */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-[980px] mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-[#555] hover:text-white text-sm mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Trang chủ
          </Link>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-[#4ade80] text-xs font-medium tracking-wide uppercase">Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Kiến thức AI &<br />
              <span className="text-[#4ade80]">Hướng dẫn thực tế</span>
            </h1>
            <p className="text-[#666] text-lg max-w-xl leading-relaxed">
              Hiểu về AI Agent, LLM, và cách tận dụng OpenClaw để tự động hoá công việc của bạn.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#4ade80] text-white border-[#4ade80] shadow-lg shadow-[#4ade80]/20'
                    : 'border-[#222] text-[#888] hover:text-white hover:border-[#444] bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="pb-20 px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#4ade80]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#4ade80]/5 hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="p-6">
                  {/* Category + Read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                    <span className="text-[#555] text-xs flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime} phút đọc
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-[#4ade80] transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#666] text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-5 flex items-center justify-between">
                  <span className="text-[#444] text-xs">{formatDate(post.publishedAt)}</span>
                  <span className="text-[#4ade80] text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Đọc bài
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Tags */}
                <div className="px-6 pb-5 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] text-[#444] bg-[#111] px-2 py-0.5 rounded-full border border-[#1e1e1e]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-[#444]">
              <p className="text-lg">Không có bài viết nào trong danh mục này.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

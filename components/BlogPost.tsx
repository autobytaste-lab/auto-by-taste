import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';

const categoryColors: Record<string, string> = {
  'OpenClaw': 'text-[#ff5c5c] bg-[#ff5c5c]/10 border-[#ff5c5c]/20',
  'LLM': 'text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20',
  'AI Agent': 'text-[#34d399] bg-[#34d399]/10 border-[#34d399]/20',
  'Hướng dẫn': 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/20',
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/** Parse headings from markdown content for Table of Contents */
function parseHeadings(content: string) {
  const lines = content.split('\n');
  const headings: { id: string; text: string; level: number }[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\*\*/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
      headings.push({ id, text, level });
    }
  }
  return headings;
}

/** Very lightweight markdown → HTML renderer (no external deps) */
function renderMarkdown(content: string): string {
  let html = content;

  // Escape HTML first
  // Code blocks (```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) => {
    const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre class="blog-code" data-lang="${lang}"><code>${escaped.trimEnd()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="blog-inline-code">$1</code>');

  // Tables
  html = html.replace(/((?:\|.+\|\n)+)/g, (block) => {
    const rows = block.trim().split('\n').filter(r => !/^\|[\s-|]+\|$/.test(r));
    const tableRows = rows.map((row, i) => {
      const cells = row.split('|').slice(1, -1).map(c => c.trim());
      const tag = i === 0 ? 'th' : 'td';
      return `<tr>${cells.map(c => `<${tag} class="blog-table-cell">${c}</${tag}>`).join('')}</tr>`;
    });
    return `<div class="blog-table-wrap"><table class="blog-table"><tbody>${tableRows.join('')}</tbody></table></div>`;
  });

  // Headings (with IDs)
  html = html.replace(/^### (.+)$/gm, (_m, t) => {
    const id = t.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
    return `<h3 id="${id}" class="blog-h3">${t}</h3>`;
  });
  html = html.replace(/^## (.+)$/gm, (_m, t) => {
    const id = t.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
    return `<h2 id="${id}" class="blog-h2">${t}</h2>`;
  });
  html = html.replace(/^# (.+)$/gm, (_m, t) => {
    const id = t.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
    return `<h1 id="${id}" class="blog-h1">${t}</h1>`;
  });

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="blog-link" target="_blank" rel="noopener noreferrer">$1</a>');

  // HR
  html = html.replace(/^---$/gm, '<hr class="blog-hr" />');

  // Unordered lists
  html = html.replace(/((?:^[*-] .+$\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(l => `<li class="blog-li">${l.replace(/^[*-] /, '')}</li>`).join('');
    return `<ul class="blog-ul">${items}</ul>`;
  });

  // Numbered lists
  html = html.replace(/((?:^\d+\. .+$\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(l => `<li class="blog-li">${l.replace(/^\d+\. /, '')}</li>`).join('');
    return `<ol class="blog-ol">${items}</ol>`;
  });

  // Paragraphs (lines not starting with HTML tags)
  html = html.replace(/^(?!<[a-zA-Z])(.+)$/gm, (line) => {
    if (line.trim() === '') return '';
    return `<p class="blog-p">${line}</p>`;
  });

  // Remove empty lines between block elements
  html = html.replace(/\n{2,}/g, '\n');

  return html;
}

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeHeading, setActiveHeading] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — AutoByTaste Blog`;
    return () => { document.title = 'AutoByTaste'; };
  }, [post]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );
    if (contentRef.current) {
      contentRef.current.querySelectorAll('h2, h3').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#000] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#555] text-xl mb-4">Bài viết không tìm thấy.</p>
          <Link to="/blog" className="text-[#ff5c5c] hover:underline">← Quay lại Blog</Link>
        </div>
      </div>
    );
  }

  const headings = parseHeadings(post.content);
  const renderedContent = renderMarkdown(post.content);
  const related = getRelatedPosts(post);
  const shareUrl = encodeURIComponent(`https://autobytaste.tech/blog/${post.slug}`);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-[#000] text-white">
      <style>{`
        .blog-h1 { font-size: 2rem; font-weight: 800; color: #ff5c5c; margin: 2rem 0 1rem; line-height: 1.2; }
        .blog-h2 { font-size: 1.5rem; font-weight: 700; color: #ff5c5c; margin: 2.5rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #1a1a1a; line-height: 1.3; }
        .blog-h3 { font-size: 1.15rem; font-weight: 600; color: #e0e0e0; margin: 2rem 0 0.75rem; line-height: 1.4; }
        .blog-p { color: #aaa; line-height: 1.85; margin: 0.9rem 0; font-size: 1rem; }
        .blog-code { background: #0d0d0d; border: 1px solid #222; border-left: 3px solid #ff5c5c; border-radius: 8px; padding: 1rem 1.25rem; overflow-x: auto; margin: 1.25rem 0; font-size: 0.85rem; line-height: 1.6; font-family: 'JetBrains Mono', 'Fira Code', monospace; color: #d4d4d4; }
        .blog-code code { color: #d4d4d4; }
        .blog-inline-code { background: #1a1a1a; border: 1px solid #2a2a2a; color: #ff8080; padding: 0.15em 0.45em; border-radius: 4px; font-size: 0.88em; font-family: 'JetBrains Mono', monospace; }
        .blog-ul, .blog-ol { color: #aaa; padding-left: 1.5rem; margin: 0.75rem 0 1rem; }
        .blog-li { margin: 0.4rem 0; line-height: 1.75; }
        .blog-ul .blog-li { list-style-type: disc; }
        .blog-ol .blog-li { list-style-type: decimal; }
        .blog-hr { border: none; border-top: 1px solid #1e1e1e; margin: 2.5rem 0; }
        .blog-link { color: #ff5c5c; text-decoration: underline; text-decoration-color: #ff5c5c40; text-underline-offset: 3px; transition: color 0.2s; }
        .blog-link:hover { color: #ff8080; }
        .blog-table-wrap { overflow-x: auto; margin: 1.5rem 0; }
        .blog-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        .blog-table-cell { padding: 0.6rem 1rem; border: 1px solid #222; text-align: left; color: #aaa; }
        tr:first-child .blog-table-cell { background: #111; color: #fff; font-weight: 600; border-color: #333; }
        tr:not(:first-child):hover .blog-table-cell { background: #0d0d0d; }
        strong { color: #e0e0e0; font-weight: 600; }
        em { color: #c0c0c0; font-style: italic; }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-20">
        {/* Back link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#555] hover:text-white text-sm mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Tất cả bài viết
        </Link>

        <div className="flex gap-10 items-start">
          {/* === Sidebar TOC === */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-56 flex-shrink-0 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <p className="text-[10px] font-semibold text-[#444] uppercase tracking-widest mb-4">Mục lục</p>
              <nav className="space-y-0.5">
                {headings.map(h => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block text-xs py-1.5 transition-colors duration-200 border-l-2 pl-3 ${
                      h.level === 3 ? 'ml-3' : ''
                    } ${
                      activeHeading === h.id
                        ? 'border-[#ff5c5c] text-[#ff5c5c]'
                        : 'border-[#222] text-[#555] hover:text-white hover:border-[#444]'
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </aside>
          )}

          {/* === Main Content === */}
          <article className="flex-1 max-w-[760px]">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${categoryColors[post.category]}`}>
                {post.category}
              </span>
              <span className="text-[#555] text-xs flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime} phút đọc
              </span>
              <span className="text-[#555] text-xs">{formatDate(post.publishedAt)}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-[#888] text-lg leading-relaxed mb-8 border-l-2 border-[#ff5c5c]/40 pl-4 italic">
              {post.excerpt}
            </p>

            {/* Share buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10 pb-10 border-b border-[#1a1a1a]">
              <span className="text-[#555] text-xs">Chia sẻ:</span>
              <a
                href={`https://zalo.me/share?url=${shareUrl}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d6ae8]/10 border border-[#0d6ae8]/20 text-[#0d6ae8] text-xs font-medium hover:bg-[#0d6ae8]/20 transition-colors"
              >
                <img src="https://img.icons8.com/color/16/zalo.png" alt="Zalo" className="w-3.5 h-3.5" />
                Zalo
              </a>
              <a
                href={`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#229ed9]/10 border border-[#229ed9]/20 text-[#229ed9] text-xs font-medium hover:bg-[#229ed9]/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Telegram
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1877f2]/10 border border-[#1877f2]/20 text-[#1877f2] text-xs font-medium hover:bg-[#1877f2]/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>

            {/* Article Body */}
            <div
              ref={contentRef}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-[#1a1a1a]">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs text-[#555] bg-[#111] border border-[#1e1e1e] px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-[#ff5c5c]/10 to-[#0a0a0a] border border-[#ff5c5c]/20">
              <p className="text-white font-semibold text-base mb-2">Thử OpenClaw miễn phí</p>
              <p className="text-[#888] text-sm mb-4">Triển khai AI Agent cá nhân của bạn trong 10 phút. Kết nối Telegram, Zalo, không cần server.</p>
              <a
                href="https://zalo.me/0337776435"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ff5c5c] hover:bg-[#ff7070] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              >
                Tư vấn miễn phí →
              </a>
            </div>
          </article>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#1a1a1a]">
            <h3 className="text-xl font-bold text-white mb-8">Bài viết liên quan</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(p => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group block bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5 hover:border-[#ff5c5c]/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[p.category]}`}>
                    {p.category}
                  </span>
                  <h4 className="text-white font-semibold text-sm mt-3 mb-2 group-hover:text-[#ff5c5c] transition-colors line-clamp-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-[#555] text-xs">{p.readTime} phút đọc</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to blog */}
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#555] hover:text-white text-sm transition-colors border border-[#222] hover:border-[#444] px-5 py-2.5 rounded-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tất cả bài viết
          </Link>
        </div>
      </div>
    </div>
  );
};

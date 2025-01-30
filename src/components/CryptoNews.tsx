import { useEffect } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spinner } from './Spinner';
import { useAppStore } from '../store/store';
// import type { NewsItem } from '../store/store';

export function CryptoNews() {
  const {
    newsItems,
    newsLoading,
    newsError,
    // hoveredNewsId,
    setHoveredNewsId,
    fetchNews
  } = useAppStore();

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() / 1000) - timestamp);
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-0 rounded-xl p-6 h-[600px] flex flex-col"
      style={{ background: 'rgba(15, 15, 15, 0.3)' }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Latest Crypto News
            </h2>
          </div>
          {newsLoading && <Spinner />}
        </div>

        {newsError && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 p-6">
            <svg className="w-20 h-20 text-purple-500 animate-pulse" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                    fill="none"/>
            </svg>
            <button
              onClick={fetchNews}
              className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M23 4v6h-6M1 20v-6h6"/>
                <path d="M3.5 9a9 9 0 0 1 14.8-3.2L23 10M1 14l4.5 4.5A9 9 0 0 0 20.5 15"/>
              </svg>
              Retry News Feed
            </button>
          </div>
        )}

        <div className="space-y-4 overflow-y-auto h-[500px] pr-2 custom-scrollbar">
          {newsItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/40 backdrop-blur-sm hover:border-purple-400/30 transition-all mb-4 last:mb-0"
              onHoverStart={() => setHoveredNewsId(item.id)}
              onHoverEnd={() => setHoveredNewsId(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex gap-4 flex-col sm:flex-row">
                {item.imageUrl && (
                  <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 pr-6 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{item.body}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{item.source}</span>
                      <span className="mx-2">•</span>
                      <span>{formatTimeAgo(item.publishedAt)}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 

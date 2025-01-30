import { useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spinner } from './Spinner';
import { useAppStore } from '../store/store';
// import type { CryptoProject } from '../store/store';

export function StoriesYouMayLike() {
  const {
    topCryptos,
    topCryptosLoading,
    topCryptosError,
    fetchTopCryptos,
    setHoveredCryptoId
  } = useAppStore();

  useEffect(() => {
    fetchTopCryptos();
    const interval = setInterval(fetchTopCryptos, 60000);
    return () => clearInterval(interval);
  }, [fetchTopCryptos]);

  const formatNumber = (num: number, decimals: number = 2) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
    return `$${num.toFixed(decimals)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 1) return price.toFixed(4);
    if (price < 10) return price.toFixed(3);
    if (price < 100) return price.toFixed(2);
    return price.toFixed(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-0 rounded-xl  p-6 h-[600px] overflow-hidden"
      style={{ background: 'rgba(15, 15, 15, 0.3)' }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Top Performing Crypto
          </h2>
        </div>
        {topCryptosLoading && <Spinner />}
      </div>

      {topCryptosError && (
        <div className="flex flex-col items-center justify-center h-full space-y-4 p-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-20 h-20 text-purple-500 animate-pulse"
          >
            <path 
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              fill="none"
            />
            <path 
              d="M12 22V12" 
              stroke="currentColor" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle 
              cx="12" 
              cy="12" 
              r="2" 
              fill="#ef4444" 
              className="animate-ping"
            />
            <circle cx="18" cy="6" r="1" fill="#34d399" className="animate-pulse" />
            <circle cx="6" cy="18" r="1" fill="#34d399" className="animate-pulse" />
          </svg>

          <button
            onClick={fetchTopCryptos}
            className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.5 9a9 9 0 0 1 14.8-3.2L23 10M1 14l4.5 4.5A9 9 0 0 0 20.5 15"/>
            </svg>
            Retry Feed
          </button>
        </div>
      )}

      {!topCryptosError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar pr-2">
          {topCryptos.map((project) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-lg bg-gray-800/30 border border-gray-700/40 backdrop-blur-sm hover:bg-gray-700/40 transition-all duration-300"
              onHoverStart={() => setHoveredCryptoId(project.id)}
              onHoverEnd={() => setHoveredCryptoId(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h3>
                    <span className="text-sm text-gray-400">{project.symbol}</span>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-lg font-semibold">${formatPrice(project.price)}</div>
                    <div className={`text-sm ${project.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {project.priceChange24h > 0 ? '+' : ''}{project.priceChange24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
                
                <div className="h-20 mb-4">
                  <svg viewBox="0 0 100 20" className="w-full h-full">
                    <path
                      d={project.sparklineData.map((value, index) => {
                        const x = (index / (project.sparklineData.length - 1)) * 100;
                        const y = 20 - ((value - Math.min(...project.sparklineData)) / 
                          (Math.max(...project.sparklineData) - Math.min(...project.sparklineData))) * 20;
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke={project.priceChange24h >= 0 ? '#34D399' : '#F87171'}
                      strokeWidth="0.5"
                      className="transform scale-y-[-1]"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <div className="text-gray-400">Volume 24h</div>
                    <div className="font-medium">{formatNumber(project.volume24h)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Market Cap</div>
                    <div className="font-medium">{formatNumber(project.marketCap)}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
} 
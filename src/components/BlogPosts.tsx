import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, ArrowLeft, Share2, Sparkles, CalendarDays } from 'lucide-react';
import {  memo,  useMemo } from 'react';
import { Popover } from '@headlessui/react';
import { useBlogPosts, useReadingState, useAppStore } from '../store/store';

const BlogPosts = memo(() => {
  const { currentPost, handleManualChange } = useBlogPosts();
  const { isReading, toggleReading } = useReadingState();
  const { posts } = useAppStore();

  const navigationHandlers = useMemo(() => ({
    next: () => {
      const currentIndex = posts.findIndex(post => post.postId === currentPost?.postId);
      handleManualChange((currentIndex + 1) % posts.length);
    },
    prev: () => {
      const currentIndex = posts.findIndex(post => post.postId === currentPost?.postId);
      handleManualChange((currentIndex - 1 + posts.length) % posts.length);
    }
  }), [currentPost?.postId, handleManualChange, posts]);

  const handleReadArticle = () => {
    toggleReading(true);
  };

  const handleBackToArticles = () => {
    toggleReading(false);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
    }),
  };

  const handleShare = (platform: string) => {
    if (!currentPost) return;
    
    const url = window.location.href;
    const text = `Check out this article: ${currentPost.title} - ${url}`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(currentPost.title)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(text);
    }
  };

  // Add vertical pagination controls
  const PaginationButtons = () => (
    <AnimatePresence>
      {!isReading && (
        <div key="prev" className="fixed inset-y-1/2 left-4 -translate-y-1/2 z-30">
          <motion.button
            onClick={navigationHandlers.prev}
            className=" hover:bg-white/10 transition-all"
            whileHover={{
              scale: 1.05,
              
            }}
            whileTap={{ scale: 0.95 }}
           
          >
            <ChevronLeft className="h-6 w-6 top-2 text-white/90 stroke-[1.5]" />
          </motion.button>
        </div>
      )}

      {!isReading && (
        <div key="next" className="fixed inset-y-1/2 right-4 -translate-y-1/2 z-30">
          <motion.button
            onClick={navigationHandlers.next}
            className=" hover:bg-white/10 transition-all"
            whileHover={{
              // scale: 1.05,
              // boxShadow: "0 0 15px rgba(168, 85, 247, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            // style={{
            //   background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%)',
            //   boxShadow: '0 0 12px rgba(99, 102, 241, 0.3)'
            // }}
          >
            <ChevronRight className="h-6 w-6 top-2 text-white/90 stroke-[1.5]" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );

  if (!currentPost || posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div 
      className="relative rounded-xl border-gray-700/20 p-6"
      style={{ 
        background: 'rgba(15, 15, 15, 0.2)',
        backdropFilter: 'blur(12px)'
      }}
    >
      {/* Simplified gradient overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent blur-lg" />
      </div>
      
      <PaginationButtons />
      
      

      <AnimatePresence mode="wait">
        {isReading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative backdrop-blur-sm"
          >
            <button
              onClick={handleBackToArticles}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Articles</span>
            </button>
            <div className="prose prose-invert max-w-none">
              <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>{currentPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{currentPost.readTime}</span>
                </div>
              </div>
              <img
                src={currentPost.imageUrl}
                alt={currentPost.title}
                className="w-full h-[400px] object-cover rounded-xl mb-8"
              />
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {currentPost.content}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="relative overflow-hidden">
            {/* Article Preview with Animation */}
            <AnimatePresence mode="wait" initial={false} custom={1}>
              <motion.div
                key={currentPost?.postId || 'empty'}
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    mass: 0.5
                  },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                className="relative group"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Animated border effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 
                              rounded-xl blur-sm group-hover:blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="relative bg-gray-900/30 backdrop-blur-md rounded-xl overflow-hidden 
                               group-hover:border-white/20 transition-colors">
                  <div className="relative">
                    <img 
                      src={currentPost.imageUrl} 
                      alt={currentPost.title} 
                      className="w-full h-48 md:h-64 object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
                    
                    {/* Add sparkle effect */}
                    <Sparkles className="absolute top-4 right-4 h-5 w-5 text-yellow-400/70 animate-pulse" />
                  </div>

                  <div className="p-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-xs md:text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        <span>{currentPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{currentPost.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mt-4 mb-2">{currentPost.title}</h3>
                    <p className="text-sm md:text-base text-gray-300 mb-4">{currentPost.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={handleReadArticle}
                        className="group relative px-6 py-3 rounded-xl font-semibold overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 
                                    group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300" />
                        <span className="relative flex items-center gap-2">
                          Read Article
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                      <Popover>
                        <Popover.Button 
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
                        >
                          <Share2 className="h-5 w-5" />
                        </Popover.Button>
                        <Popover.Panel className="absolute right-0 bottom-full mb-2 z-[1000] p-2 rounded-xl backdrop-blur-xl border border-white/10 shadow-2xl bg-transparent">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleShare('whatsapp')}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400 hover:text-blue-300">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.471-.149-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.126.549 4.125 1.517 5.858L.057 24l6.23-1.544A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleShare('facebook')}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400 hover:text-blue-300">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleShare('twitter')}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400 hover:text-blue-300">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleShare('telegram')}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400 hover:text-blue-300">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.203-.658-.643.136-.953l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                              </svg>
                            </button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
});

export { BlogPosts }; 
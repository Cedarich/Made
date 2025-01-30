import {  useEffect, memo } from "react";
import { Navbar } from "./components/Navbar";
import { CryptoNews } from "./components/CryptoNews";
import { StoriesYouMayLike } from "./components/StoriesYouMayLike";
import { Stats } from "./components/Stats";
import { BlogPosts } from "./components/BlogPosts";
import { MemoryGame } from "./components/MemoryGame";
import { ProjectRoadmap } from "./components/ProjectRoadmap";
import { PresaleUpdates } from "./components/PresaleUpdates";
import { Footer } from "./components/Footer";
import { StarBackground } from "./components/StarBackground";
import { ErrorBoundary } from "react-error-boundary";
import { BlogSidebar } from "./components/BlogSidebar";
import ErrorFallback from "./components/ErrorFallback";
import { motion } from "framer-motion";
import { useAppStore,  useReadingState } from "./store/store";
import { AffiliatePromos } from "./components/NFTMarketplace";


function App() {
  const { loading, isReading } = useAppStore();
  // const { currentPost } = useBlogPosts();
  const { fetchPosts } = useAppStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const Spinner = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/95 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <svg width="140" height="140" viewBox="0 0 80 80" className="logo-glow">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#6366f1", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#9333ea", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <g transform="translate(10, 10)">
            <motion.path
              d="M0 20 Q10 0 20 20 T40 20 T60 20"
              stroke="url(#logoGradient)"
              strokeWidth="3"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M0 30 Q10 10 20 30 T40 30 T60 30"
              stroke="url(#logoGradient)"
              strokeWidth="3"
              fill="none"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ animationDelay: "0.2s" }}
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );

  return (
    <>
      {loading && <Spinner />}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="min-h-screen text-white relative">
          <StarBackground />
          <div className="relative z-10">
            <Navbar />
            <main className="mx-auto px-4 py-8 max-w-7xl mt-20">
              <Stats />
              <BlogContent />
              {!isReading && <SecondaryContent />}
            </main>
            <Footer />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

const BlogContent = memo(() => {
  const { isReading } = useReadingState();
  
  return (
    <div className="flex flex-col xl:flex-row gap-6 mb-8 w-full">
      <div className={`${isReading ? "w-full" : "xl:w-[65%] w-full"}`}>
        <BlogPosts />
      </div>
      {isReading ? (
        <BlogSidebar />
      ) : (
        <div className="xl:w-[35%] w-full">
          <MemoryGame />
        </div>
      )}
    </div>
  );
});

const SecondaryContent = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="order-2 lg:order-1">
          <CryptoNews />
        </div>
        <div className="order-1 lg:order-2">
          <StoriesYouMayLike />
        </div>
      </div>

      <div className="space-y-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AffiliatePromos />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 h-full">
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <PresaleUpdates className="h-full min-h-[400px]" />
          </motion.div>

          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <ProjectRoadmap className="h-full min-h-[400px]" />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default App;

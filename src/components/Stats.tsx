import { Award, Wallet, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppStore } from "../store/store";
import { formatNumber } from "../utils/formatNumber";

// Helper function to animate counting
const useCountAnimation = (targetValue: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (targetValue > 0) {
      const duration = 500; // Faster counting (0.5 seconds)
      const increment = targetValue / (duration / 16); // 60 FPS

      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= targetValue) {
            clearInterval(interval);
            return targetValue;
          }
          return prev + increment;
        });
      }, 16); // 60 FPS

      return () => clearInterval(interval);
    }
  }, [targetValue]);

  return Math.max(0, Math.floor(count));
};

export function Stats() {
  const { tvl, wallets, rewards, isLoading, error, fetchStats } = useAppStore();

  // Initialize counters for all values
  const animatedTvl = useCountAnimation(tvl);
  const animatedWallets = useCountAnimation(wallets);
  const animatedRewards = useCountAnimation(rewards);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (isLoading) {
    return (
      <div className="text-center py-4 flex items-center justify-center space-x-2">
        <svg
          className="animate-spin h-6 w-6 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="text-blue-400">Syncing with the blockchain...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* TVL Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group rounded-xl border border-gray-700/30"
        style={{ background: 'rgba(15, 15, 15, 0.3)' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-xl border border-green-400/30">
                <Wallet className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Total Value Locked</h3>
            </div>
            <Sparkles className="h-4 w-4 text-green-400/70 animate-pulse" />
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
            {formatNumber(animatedTvl)}
          </p>
          <p className="text-sm text-green-400 mt-2">+15.7% from last week</p>
        </div>
      </motion.div>

      {/* Wallets Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative group rounded-xl border border-gray-700/30"
        style={{ background: 'rgba(15, 15, 15, 0.3)', 
          // zIndex:30,
         

        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Unique Wallets</h3>
            </div>
            <Sparkles className="h-4 w-4 text-blue-400/70 animate-pulse" />
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            {formatNumber(animatedWallets)}
          </p>
          <p className="text-sm text-blue-400 mt-2">+2.3K this month</p>
        </div>
      </motion.div>

      {/* Rewards Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative group rounded-xl border border-gray-700/30"
        style={{ background: 'rgba(15, 15, 15, 0.3)' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-500/20 rounded-xl border border-yellow-400/30">
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Total Rewards</h3>
            </div>
            <Sparkles className="h-4 w-4 text-yellow-400/70 animate-pulse" />
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            {formatNumber(animatedRewards)}
          </p>
          <p className="text-sm text-yellow-400 mt-2">
            +45.2K distributed today
          </p>
        </div>
      </motion.div>
    </div>
  );
}

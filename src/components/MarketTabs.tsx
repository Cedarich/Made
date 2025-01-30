import { motion } from 'framer-motion';

type TabProps = {
  selectedTab: 'trending' | 'sports' | 'crypto';
  setSelectedTab: (tab: 'trending' | 'sports' | 'crypto') => void;
};

export function MarketTabs({ selectedTab, setSelectedTab }: TabProps) {
  const tabs = [
    { id: 'trending', label: 'Trending' },
    { id: 'sports', label: 'Sports' },
    { id: 'crypto', label: 'Crypto' }
  ];

  return (
    <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 relative">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setSelectedTab(tab.id as 'trending' | 'sports' | 'crypto')}
          className={`px-6 py-3 rounded-lg whitespace-nowrap relative ${
            selectedTab === tab.id
              ? 'text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {selectedTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg -z-10"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
} 
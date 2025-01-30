import { createWithEqualityFn } from "zustand/traditional";
import { persist,  createJSONStorage } from "zustand/middleware";
import { shallow } from "zustand/shallow";

interface GameState {
  score: number;
  matchedPairs: number[];
  updateScore: (newScore: number) => void;
  addMatchedPair: (indices: number[]) => void;
  resetGame: () => void;
  resetScore: () => void;
}

interface StatsState {
  tvl: number;
  wallets: number;
  rewards: number;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
}

interface BlogPost {
  postId: number;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl: string;
  date: string;
  readTime: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  body: string;
  publishedAt: number;
  imageUrl: string;
}

export interface CryptoProject {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  imageUrl: string;
  sparklineData: number[];
  presale?: {
    status: 'active' | 'upcoming' | 'ended';
    price: string;
    endDate: string;
    raised: string;
    hardCap: string;
  };
}

type AppState = {
  // Global state
  loading: boolean;
  isReading: boolean;
  
  // Blog state
  posts: BlogPost[];
  currentPost: BlogPost | null;
  error: string | null;

  // Actions
  setLoading: (loading: boolean) => void;
  toggleReading: (state?: boolean) => void;
  fetchPosts: () => Promise<void>;
  handleManualChange: (index: number) => void;

  // New wallet state
  walletAddress: string | null;
  isWalletConnected: boolean;

  // New wallet actions
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;

  // Add news state
  newsItems: NewsItem[];
  newsLoading: boolean;
  newsError: string | null;
  hoveredNewsId: string | null;
  
  // Add news actions
  setNews: (items: NewsItem[]) => void;
  setNewsLoading: (loading: boolean) => void;
  setNewsError: (error: string | null) => void;
  setHoveredNewsId: (id: string | null) => void;
  fetchNews: () => Promise<void>;

  // Add crypto projects state
  topCryptos: CryptoProject[];
  topCryptosLoading: boolean;
  topCryptosError: string | null;
  hoveredCryptoId: string | null;
  
  // Add actions
  fetchTopCryptos: () => Promise<void>;
  setHoveredCryptoId: (id: string | null) => void;
};

interface StoreState extends GameState, StatsState, AppState {}

export const useAppStore = createWithEqualityFn<StoreState>()(
  persist(
    (set, get) => ({
      // GameState properties
      score: 0,
      matchedPairs: [],
      updateScore: (newScore: number) => set({ score: newScore }),
      addMatchedPair: (indices: number[]) =>
        set((state) => ({
          matchedPairs: [...state.matchedPairs, ...indices],
        })),
      resetGame: () => set({ score: 0, matchedPairs: [] }),
      resetScore: () => set({ score: 0 }),

      // StatsState properties
      tvl: 0,
      wallets: 0,
      rewards: 0,
      isLoading: false,

      // Shared actions
      fetchStats: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch("/api/stats");
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          set({ tvl: data.tvl, wallets: data.wallets, rewards: data.rewards, isLoading: false });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : "Failed to fetch stats", isLoading: false });
        }
      },

      // App state properties
      loading: true,
      isReading: false,

      // Blog state properties
      posts: [],
      currentPost: null,
      error: null,

      // Wallet state
      walletAddress: null,
      isWalletConnected: false,

      // Actions
      setLoading: (loading) => set({ loading }),
      toggleReading: (state) => set({ isReading: state ?? !get().isReading }),
      fetchPosts: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('/api/blog-posts');
          if (!response.ok) throw new Error('Failed to fetch blog posts');
          const data = await response.json();
          set({ 
            posts: data,
            currentPost: data[0] || null,
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch posts',
            loading: false 
          });
        }
      },
      handleManualChange: (index) => {
        const { posts, currentPost } = get();
        if (!posts.length) return;
        
        const newIndex = (index + posts.length) % posts.length;
        if (posts[newIndex]?.postId !== currentPost?.postId) {
          set({ currentPost: posts[newIndex] });
        }
      },
      connectWallet: (address) => set({ 
        walletAddress: address,
        isWalletConnected: true 
      }),
      disconnectWallet: () => set({ 
        walletAddress: null,
        isWalletConnected: false 
      }),

      // News state
      newsItems: [],
      newsLoading: true,
      newsError: null,
      hoveredNewsId: null,

      // News actions
      setNews: (items) => set({ newsItems: items }),
      setNewsLoading: (loading) => set({ newsLoading: loading }),
      setNewsError: (error) => set({ newsError: error }),
      setHoveredNewsId: (id) => set({ hoveredNewsId: id }),
      fetchNews: async () => {
        set({ newsLoading: true, newsError: null });
        try {
          const response = await fetch(
            'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'
          );
          
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const data = await response.json();
          
          if (!Array.isArray(data.Data)) {
            throw new Error('Invalid news data format');
          }

          const newsItems = data.Data.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            source: item.source,
            url: item.url,
            body: item.body,
            publishedAt: item.published_on,
            imageUrl: item.imageurl
          }));

          set({ newsItems });
          
        } catch (error) {
          set({ 
            newsError: error instanceof Error ? error.message : 'Failed to fetch news',
            newsItems: []
          });
        } finally {
          set({ newsLoading: false });
        }
      },

      // Add crypto projects state
      topCryptos: [],
      topCryptosLoading: true,
      topCryptosError: null,
      hoveredCryptoId: null,

      // Add actions
      fetchTopCryptos: async () => {
        set({ topCryptosLoading: true, topCryptosError: null });
        try {
          const response = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=6&page=1&sparkline=true&price_change_percentage=24h'
          );

          if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
          const data = await response.json();

          const mapped = data.map((coin: any) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            priceChange24h: coin.price_change_percentage_24h,
            volume24h: coin.total_volume,
            marketCap: coin.market_cap,
            imageUrl: coin.image,
            sparklineData: coin.sparkline_in_7d?.price || [],
          }));

          set({ topCryptos: mapped });
        } catch (error) {
          set({ 
            topCryptosError: error instanceof Error ? error.message : 'Failed to fetch cryptocurrencies',
            topCryptos: []
          });
        } finally {
          set({ topCryptosLoading: false });
        }
      },
      setHoveredCryptoId: (id) => set({ hoveredCryptoId: id }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        posts: state.posts,
        currentPost: state.currentPost,
        walletAddress: state.walletAddress,
        isWalletConnected: state.isWalletConnected,
        newsItems: state.newsItems,
        topCryptos: state.topCryptos,
        score: state.score,
        matchedPairs: state.matchedPairs,
        tvl: state.tvl,
        wallets: state.wallets,
        rewards: state.rewards
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loading = false;
          state.newsLoading = false;
          state.topCryptosLoading = false;
        }
      }
    }
  ),
  shallow
);

// Selectors
export const useScore = () => useAppStore((state) => state.score);
export const useMatchedPairs = () => useAppStore((state) => state.matchedPairs);
export const useGameActions = () =>
  useAppStore((state) => ({
    updateScore: state.updateScore,
    addMatchedPair: state.addMatchedPair,
    resetGame: state.resetGame,
  }));

export const useStats = () =>
  useAppStore(
    (state) => ({
      tvl: state.tvl,
      wallets: state.wallets,
      rewards: state.rewards,
      isLoading: state.isLoading,
    }),
    shallow
  );

export const useStatsActions = () =>
  useAppStore((state) => ({
    fetchStats: state.fetchStats,
  }));

export const useAppLoading = () => useAppStore(state => ({
  loading: state.loading,
  setLoading: state.setLoading
}));

export const useReadingState = () => useAppStore(state => ({
  isReading: state.isReading,
  toggleReading: state.toggleReading
}));

export const useBlogPosts = () => useAppStore(state => ({
  posts: state.posts,
  currentPost: state.currentPost,
  handleManualChange: state.handleManualChange
}), shallow);

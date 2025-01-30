import { motion } from "framer-motion";
import { useAppStore } from "../store/store";

export function FeaturedArticles() {
  const { posts } = useAppStore();
  
  return (
    <div className="relative z-0 mt-16 bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
      <h2 className="text-xl font-bold mb-6">Trending Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.slice(0, 4).map(post => (
          <motion.div 
            key={post.postId}
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gray-900/20 rounded-xl border border-gray-700/30"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold line-clamp-2">{post.title}</h3>
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{post.excerpt}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AffiliatePromos() {
  const affiliateProducts = [
    {
      name: "Ledger Nano X",
      commission: "15% Commission",
      link: "#",
      image: "https://cryptologos.cc/logos/ledger-ledger-logo.png",
      code: "BLOG15",
      chain: "Solana"
    },
    {
      name: "Coinbase Pro",
      commission: "1.5% Fee Kickback",
      link: "#",
      image: "https://cryptologos.cc/logos/coinbase-coin-cb-logo.png",
      code: "BLOG10",
      chain: "Ethereum"
    },
    {
      name: "MetaMask Swaps",
      commission: "20% Fee Discount",
      link: "#",
      image: "https://cryptologos.cc/logos/metamask-logo.png",
      code: "MASK20",
      chain: "Polygon"
    }
  ];

  return (
    <div className="relative z-0 rounded-xl  p-6" style={{ background: 'rgba(15, 15, 15, 0.3)' }}>
      {/* Gradient backdrop updated to green */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(74,222,128,0.1)_0%,transparent_50%)]" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8.5V12l2.5 1.5M12 8.5L9.5 10M12 8.5L14.5 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              Partner Offers
            </h2>
          </div>
          <span className="text-sm text-gray-400">Verified Partners Only</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {affiliateProducts.map((product) => (
            <motion.div 
              key={product.name}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/40 backdrop-blur-sm"
            >
              {/* Updated chain badge color */}
              <div className="absolute top-3 right-3 px-2 py-1 text-xs bg-gray-900/50 rounded-full border border-gray-700/30">
                {product.chain}
              </div>

              <div className="flex flex-col gap-4">
                {/* Updated gradient to green */}
                <div className="w-full h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-auto object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.className = 'w-full h-32 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-lg flex items-center justify-center';
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  {/* Updated commission badge to green */}
                  <div className="flex items-center gap-2 text-sm bg-emerald-900/20 text-emerald-300 px-3 py-1 rounded-full w-fit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span>{product.commission}</span>
                  </div>
                </div>

                {/* Updated code section to green */}
                <div className="flex items-center justify-between bg-gray-800/20 p-3 rounded-lg border border-gray-700/30">
                  <span className="font-mono text-sm text-emerald-300">{product.code}</span>
                  <a 
                    href={product.link}
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
                  >
                    Claim Offer
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 
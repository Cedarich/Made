import { motion } from 'framer-motion';

const presaleStages = [
  // {
  //   title: "Stage 1: Early Access",
  //   status: "Active",
  //   progress: 65,
  //   price: "$0.025",
  //   sold: "850M"
  // },
  {
    title: "Stage 1: Public Sale", 
    status: "Upcoming",
    progress: 0,
    price: "$0.035",
    sold: "0"
  }
];

export function PresaleUpdates({ className }: { className?: string }) {
  return (
    <div className={`relative z-0 rounded-xl p-6 ${className}`} style={{ background: 'rgba(15, 15, 15, 0.3)' }}>
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
          <motion.div 
            // animate={{ rotate: [0, 360] }}
            // transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="p-2.5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent animate-text-shine">
            $Made Presale
          </span>
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Raised', value: '$1.24M', color: 'from-purple-500 to-blue-500' },
            { label: 'Participants', value: '2,842', color: 'from-blue-500 to-cyan-500' },
            { label: 'Days Left', value: '14', color: 'from-green-500 to-emerald-500' },
            { label: 'ROI Forecast', value: '8.4x', color: 'from-yellow-500 to-amber-500' }
          ].map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/40 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className={`font-mono text-xl bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Presale Stages */}
        <div className="space-y-6">
          {presaleStages.map((stage) => (
            <motion.div 
              key={stage.title}
              className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/40 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent">
                  {stage.title}
                </h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-400/30">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-purple-300">{stage.status}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-gray-800/30 rounded-full mb-4 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              {/* Stage Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-800/20 rounded-lg border border-gray-700/30">
                  <div className="text-xs text-gray-400 mb-1">Token Price</div>
                  <div className="font-mono text-sm text-blue-400">{stage.price}</div>
                </div>
                <div className="p-3 bg-gray-800/20 rounded-lg border border-gray-700/30">
                  <div className="text-xs text-gray-400 mb-1">Tokens Sold</div>
                  <div className="font-mono text-sm text-purple-400">{stage.sold}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification Badge */}
        <motion.div 
          className="mt-8 p-4 bg-green-900/20 rounded-xl border border-green-400/30 backdrop-blur-sm flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <div>
              <div className="font-semibold text-green-300">Smart Contract Verified</div>
              <div className="text-xs text-green-400/80">Audited by CertiK</div>
            </div>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}


import { motion } from 'framer-motion';


const roadmapItems = [
  {
    quarter: "Q1 2025",
    status: "In Development",
    milestones: [
      "Project Showcase & Lunch",
      "Application Deployment",
      "Project Whitepaper Release"
    ]
  },
  {
    quarter: "Q2 2025",
    status: "Upcoming",
    milestones: [
      "Community Building Events",
      "Smart Contract Development",
      "NFT Marketplace Deployment"
    ]
  },
  {
    quarter: "Q3 2025",
    status: "Upcoming",
    milestones: [
      "Ecosystem Expansion",
      "Partnership Announcements",
      "Mainnet Launch"
    ]
  },
 
];


export function ProjectRoadmap({ className }: { className?: string }) {
  return (
    <div className={`relative z-0 rounded-xl  p-6 ${className}`}>
      {/* Animated backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg animate-pulse-slow">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            Project Roadmap
          </span>
        </h2>

        <div className="relative pl-6 space-y-6">
          {/* Timeline connector */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500/20 to-cyan-500/20" />

          {roadmapItems.map((item, index) => (
            <motion.div 
              key={item.quarter}
              className="group relative pl-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-glow">
                <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse" />
              </div>

              {/* Card */}
              <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/40 backdrop-blur-sm hover:border-cyan-400/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
                    {item.quarter}
                  </h3>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-900/20 border border-cyan-400/20">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-cyan-300">{item.status}</span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-gray-400">
                  {item.milestones.map((milestone, idx) => (
                    <li 
                      key={idx}
                      className="flex items-center gap-2 hover:text-cyan-100 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-400/80 rounded-full flex-shrink-0" />
                      {milestone}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 
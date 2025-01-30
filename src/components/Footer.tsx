import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-gray-800/40 backdrop-blur-md border-t border-gray-700/50 mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center space-x-2">
            <motion.a
              href="https://discord.gg/bundle"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-lg bg-gray-900/20 hover:bg-blue-500/10 transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.42-.312 8.008 8.008 0 006.114 0l.008.007a.076.076 0 01-.007.127 12.174 12.174 0 01-1.872.892.077.077 0 00-.041.107c.36.698.772 1.363 1.225 1.993a.077.077 0 00.084.027 19.839 19.839 0 005.993-3.03.077.077 0 00.031-.057c.5-5.177-.838-9.673-3.548-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.333-.956 2.419-2.157 2.419z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://x.com/bundle"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-lg bg-gray-900/20 hover:bg-blue-500/10 transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://t.me/bundle"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-lg bg-gray-900/20 hover:bg-blue-500/10 transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.25 1.58-1.32 5.41-1.87 7.19-.14.45-.41.6-.68.6-.47 0-.74-.36-1.15-.7-.64-.56-1-.91-1.62-1.46-.7-.62-.16-.96.11-1.21.24-.22 4.16-3.81 4.24-4.13.01-.03.02-.14-.06-.2s-.37-.06-.52-.04c-.22.04-3.74 2.38-5.23 3.35-.53.34-1.02.51-1.46.5-.5-.01-1.46-.28-2.18-.52-.88-.29-1.58-.45-1.52-.94.03-.27.32-.55.9-.83 3.5-1.6 5.83-2.67 8.56-3.85.68-.29 1.29-.18 1.5.55.17.59.7 2.4.95 3.29z" />
              </svg>
            </motion.a>
          </div>

          {/* Copyright */}
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-right">
            © {new Date().getFullYear()} Gaddaffi. All rights reserved.
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
      </div>
    </footer>
  );
} 
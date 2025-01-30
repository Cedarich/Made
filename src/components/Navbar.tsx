import { LogOut, Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useEffect } from 'react';
import { useAppStore } from '../store/store';

export function Navbar() {
  const { walletAddress, isWalletConnected, connectWallet, disconnectWallet } = useAppStore();
  const { address, connect, disconnect } = useWallet();
  // const [animateWave] = useState(true);

  // Sync wallet state
  useEffect(() => {
    if (address) {
      connectWallet(address);
    }
  }, [address, connectWallet]);

  const handleConnect = async () => {
    await connect();
    if (address) connectWallet(address);
  };

  const handleDisconnect = () => {
    disconnect();
    disconnectWallet();
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm z-50">
      <div className="mx-auto px-4 w-full">
        <div className="flex items-center justify-between h-16">
          {/* Original Logo - Keep heart monitor animation */}
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 250 50" 
              className="h-12 w-40 lg:h-14 lg:w-auto"
            >
              <defs>
                <linearGradient id="navbarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                
                {/* Heart Monitor Wave Animation */}
                <style>
                  {`
                    .wave-path {
                      stroke-dasharray: 120;
                      stroke-dashoffset: 120;
                      animation: draw 3s linear forwards;
                    }
                    @keyframes draw {
                      to { stroke-dashoffset: 0; }
                    }
                    .logo-glow {
                      filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.5));
                    }
                  `}
                </style>
              </defs>

              {/* Logo Design */}
              <g transform="translate(10, 10)">
                <path
                  d="M0 20 Q10 0 20 20 T40 20 T60 20"
                  stroke="url(#navbarGradient)"
                  strokeWidth="3"
                  fill="none"
                  className="wave-path logo-glow"
                />
                <path
                  d="M0 30 Q10 10 20 30 T40 30 T60 30"
                  stroke="url(#navbarGradient)"
                  strokeWidth="3"
                  fill="none"
                  className="wave-path logo-glow"
                  style={{ animationDelay: '0.2s' }}
                />
                
                {/* Text */}
                <text 
                  x="60" 
                  y="30" 
                  fontFamily="'Space Mono', monospace"
                  fontSize="30"
                  fontWeight="700"
                  fill="url(#navbarGradient)"
                  className="logo-glow"
                >
                  Made
                </text>
              </g>
            </svg>
          </div>

          {/* Wallet Connection - Keep original button styles */}
          {isWalletConnected ? (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 bg-gray-800/50 px-4 py-2 rounded-xl">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">Connected Wallet</span>
                  <span className="text-sm font-mono text-gray-300">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </span>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <button
                onClick={handleDisconnect}
                className="flex items-center space-x-2 bg-red-500/90 hover:bg-red-600/90 px-4 py-2 rounded-xl transition-colors text-sm backdrop-blur-sm"
              >
                <LogOut className="h-5 w-5" />
                <span>Disconnect</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl relative overflow-hidden border border-transparent hover:border-gray-600 transition-all text-sm sm:text-base"
              style={{
                background: 'radial-gradient(circle at 50% 50%, #00FFC2 0%, #00B8FF 25%, #0057FF 50%, #8A2BE2 75%, #FF00FF 100%)',
                animation: 'pulseGlow 3s infinite alternate'
              }}
            >
              <div className="absolute inset-0.5 bg-gray-900/90 rounded-xl backdrop-blur-sm"></div>
              <Wallet className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
              <span className="relative z-10 font-medium">Connect</span>
            </button>
          )}
        </div>

       
      </div>
    </header>
  );
} 
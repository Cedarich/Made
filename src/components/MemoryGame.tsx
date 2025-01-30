import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bitcoin,
  Coins,
  Wallet,
  Shield,
  CircleDollarSign,
  Gem,
  Timer,
  Trophy,
  Gamepad2,
  WalletCards,
  LucideIcon,
} from "lucide-react";
import { useAppStore } from "../store/store";

const GAME_CONFIG = {
  gridSize: 3,
  timeLimit: 30,
  flipDuration: 1000,
};

// Add new styles for Web3 elements
const WEB3_STYLES = {
  neonBorder: "1px solid rgba(99, 102, 241, 0.4)",
  glowShadow:
    "0 0 10px rgba(99, 102, 241, 0.6), 0 0 20px rgba(99, 102, 241, 0.4)",
  textGlow: "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #6366f1, 0 0 30px #6366f1",
};

const ICONS = [
  { id: 1, icon: Bitcoin, prize: 150, token: "BTC" },
  { id: 2, icon: CircleDollarSign, prize: 200, token: "DAI" },
  { id: 3, icon: Gem, prize: 250, token: "NFT" },
  { id: 4, icon: Coins, prize: 300, token: "ETH" },
  { id: 5, icon: Wallet, prize: 350, token: "USDC" },
  { id: 6, icon: Shield, prize: 400, token: "LINK" },
];

const ICON_MAP: Record<string, LucideIcon> = {
  BTC: Bitcoin,
  ETH: Coins,
  USDC: Wallet,
  LINK: Shield,
  DAI: CircleDollarSign,
  NFT: Gem,
};

interface GameState {
  cards: { id: number }[];
  flipped: number[];
  matched: number[];
}

export function MemoryGame() {
  const { score, updateScore, resetScore } = useAppStore();
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flipped: [],
    matched: [],
  });
  const [showPrize, setShowPrize] = useState(false);
  const [currentPrize, setCurrentPrize] = useState({ amount: 0, token: "" });
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(GAME_CONFIG.timeLimit);
  const [streak, setStreak] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [lastFlipTime, setLastFlipTime] = useState<number | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);

  const startGame = async () => {
    try {
      const response = await fetch("http://localhost:3000/memory-game/start", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Start Game Response:", data);
      setGameState({ ...gameState, cards: data.cards, flipped: [], matched: [] });
      setTimer(GAME_CONFIG.timeLimit);
      setGameStarted(true);
      setLastFlipTime(null);
      setGameId(data.gameId);
      startTimer();
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Failed to start the game. Please try again.");
    }
  };

  const handleWithdraw = async () => {
    setWithdrawing(true);

    const timeout = setTimeout(() => {
      setWithdrawing(false);
      alert("Withdraw processing timed out. Please try again.");
    }, 2000);

    try {
      const response = await fetch("http://localhost:3000/memory-game/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user-id" }),
      });

      clearTimeout(timeout);
      const data = await response.json();

      resetScore();
      setWithdrawing(false);
      alert(`Successfully withdrew $${data.score}`);
    } catch (error) {
      clearTimeout(timeout);
      setWithdrawing(false);
      console.error("Withdraw error:", error);
      alert("Withdraw failed. Please try again.");
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleGameOver = () => {
    setShowGameOver(true);
    setGameStarted(false);
    resetScore();
    setStreak(0);
    setGameState({
      cards: [],
      flipped: [],
      matched: [],
    });
  };

  const handleCardFlip = async (index: number) => {
    try {
      if (
        gameState.matched.includes(index) ||
        gameState.flipped.includes(index)
      )
        return;

      const newFlipped = [...gameState.flipped, index];
      setGameState((prev) => ({ ...prev, flipped: newFlipped }));

      if (newFlipped.length === 2) {
        const response = await fetch("http://localhost:3000/memory-game/flip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId: gameId,
            cardIds: newFlipped,
          }),
        });

        const data = await response.json();
        setGameState((prev) => ({ ...prev, matched: data.matched || [] }));
        updateScore(data.score || 0);

        if (data.matched?.length === 2) {
          const prize =
            ICONS.find((icon) => icon.id === gameState.cards[newFlipped[0]].id)
              ?.prize || 0;
          setCurrentPrize({
            amount: prize * (streak + 1),
            token:
              ICONS.find(
                (icon) => icon.id === gameState.cards[newFlipped[0]].id
              )?.token || "",
          });
          setShowPrize(true);
          setStreak((prev) => prev + 1);
          setTimeout(() => setShowPrize(false), 1000);
        } else {
          setStreak(0);
        }

        const reshuffleResponse = await fetch("http://localhost:3000/memory-game/reshuffle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameId: gameId }),
        });
        const reshuffleData = await reshuffleResponse.json();

        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            flipped: [],
            cards: reshuffleData.cards,
          }));
        }, GAME_CONFIG.flipDuration);
      }
    } catch (error) {
      console.error("Error flipping card:", error);
    }
  };

  useEffect(() => {
    if (
      lastFlipTime &&
      Date.now() - lastFlipTime > GAME_CONFIG.timeLimit * 1000
    ) {
      handleGameOver();
    }
  }, [lastFlipTime]);

  return (
    <motion.div 
      className="relative z-0 rounded-xl p-4 sm:p-6 flex flex-col" 
      style={{ background: 'rgba(15, 15, 15, 0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      
      <div className="relative z-10 h-[500px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-bold">Made Quest</h2>
          </div>
          {score > 0 && !gameStarted && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWithdraw}
              disabled={withdrawing}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                       rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 
                       disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden text-sm md:text-base"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
              <WalletCards className="h-5 w-5" />
              <span>{withdrawing ? "Processing..." : `Withdraw $${score}`}</span>
              {withdrawing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </motion.button>
          )}
        </div>

        {!gameStarted && !showGameOver ? (
          <div className="text-center space-y-6">
            <div
              className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50"
              style={{
                border: WEB3_STYLES.neonBorder,
                boxShadow: WEB3_STYLES.glowShadow,
              }}
            >
              <h3
                className="text-2xl font-bold mb-2"
                style={{ textShadow: WEB3_STYLES.textGlow }}
              >
                Ready to Play?
              </h3>
              <p className="text-gray-400 mb-4">
                Match pairs to earn crypto rewards
              </p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl 
                         font-bold hover:from-blue-600 hover:to-purple-600 transition-all relative"
                style={{
                  border: WEB3_STYLES.neonBorder,
                  boxShadow: WEB3_STYLES.glowShadow,
                }}
              >
                <span className="relative z-10">Start Game</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity rounded-xl" />
              </button>
            </div>
            {score > 0 && (
              <p className="text-xl font-bold text-blue-400">
                Current Balance: ${score}
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <div className="flex flex-wrap gap-2">
                <div className="bg-gray-800/80 p-2 rounded-lg flex items-center min-w-[100px]">
                  <Timer className="h-5 w-5 text-blue-400" />
                  <span
                    className="ml-2 font-mono"
                    style={{ textShadow: WEB3_STYLES.textGlow }}
                  >
                    {timer.toString().padStart(2, "0")}s
                  </span>
                </div>
                <div className="bg-gray-800/80 p-2 rounded-lg flex items-center min-w-[100px]">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <span
                    className="ml-2 font-mono"
                    style={{ textShadow: WEB3_STYLES.textGlow }}
                  >
                    x{streak}
                  </span>
                </div>
              </div>
              <p className="text-lg md:text-xl font-bold text-blue-400">Won: ${score}</p>
            </div>

            <div className="grid grid-cols-3 gap-1 sm:gap-2 w-full flex-grow p-1 justify-center">
              {gameState.cards.map((item, index) => {
                const iconData = ICONS.find((icon) => icon.id === item.id);
                const Icon = iconData ? ICON_MAP[iconData.token] : null;
                const isFlipped =
                  gameState.flipped?.includes(index) ||
                  gameState.matched?.includes(index);

                return (
                  <motion.div
                    key={index}
                    className="aspect-square rounded-lg cursor-pointer bg-gray-800/30 backdrop-blur-sm border border-gray-700/40 flex items-center justify-center p-1 
                    w-full max-w-[120px] md:max-w-[150px] lg:max-w-[200px] mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardFlip(index)}
                  >
                    {isFlipped && Icon && (
                      <motion.div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8">
                        <Icon className="w-full h-full" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        <AnimatePresence>
          {showGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl p-4"
            >
              <div className="bg-gray-800/30 p-4 md:p-6 lg:p-8 rounded-xl text-center border border-gray-700/40 backdrop-blur-sm w-full max-w-md">
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{ textShadow: WEB3_STYLES.textGlow }}
                >
                  Game Over!
                </h3>
                <div className="mb-6">
                  <p className="text-xl font-semibold mb-2">Total Won:</p>
                  <p className="text-2xl font-bold text-blue-400">${score}</p>
                </div>
                <button
                  onClick={() => {
                    setShowGameOver(false);
                    startGame();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl 
                           font-bold hover:from-blue-600 hover:to-purple-600 transition-all relative w-full"
                  style={{
                    border: WEB3_STYLES.neonBorder,
                    boxShadow: WEB3_STYLES.glowShadow,
                  }}
                >
                  <span className="relative z-10">Play Again</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity rounded-xl" />
                </button>
              </div>
            </motion.div>
          )}

          {showPrize && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <div className="bg-gray-800/30 p-6 rounded-xl text-center border border-gray-700/40 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2">Combo x{streak}! 🎉</h3>
                <p>
                  You won {currentPrize.amount} {currentPrize.token}!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

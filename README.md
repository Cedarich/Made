# Made Quest Platform

A Web3-integrated gaming platform featuring crypto rewards, market analytics, and project tracking.

## Features

- 🎮 **Memory Game with Crypto Rewards**
  - Web3-styled card matching game
  - Real-time score tracking and streak bonuses
  - Crypto token withdrawals (see `handleWithdraw` in `MemoryGame.tsx` lines 95-122)
  - Server-side game state management (see `MemoryGameService` lines 3-78)

- 📈 **Market Analytics**
  - Real-time crypto price tracking
  - Interactive sparkline charts
  - Market cap and volume statistics (implemented in `StoriesYouMayLike.tsx` lines 107-169)

- 🛣️ **Project Roadmap**
  - Interactive timeline with progress tracking
  - Animated milestone components (see `ProjectRoadmap.tsx` lines 58-94)

- 💰 **Presale Tracking**
  - Multi-stage presale progress visualization
  - Smart contract verification status
  - Real-time funding statistics (handled in `PresaleUpdates.tsx` lines 47-129)

## Tech Stack

**Frontend**
- React + TypeScript
- Framer Motion (animations)
- Lucide React (icons)
- Tailwind CSS (styling)
- Zustand (state management)

**Backend**
- NestJS
- REST API (game endpoints in `memory-game.controller.ts` lines 8-26)
- In-memory game state management

## Installation

1. Clone the repository

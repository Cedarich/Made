import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryGameService {
  private gameState: Record<string, any> = {};

  startGame() {
    const gameId = Math.random().toString(36).substring(7);
    this.gameState[gameId] = {
      cards: this.generateCards(),
      flipped: [],
      matched: [],
      score: 0,
    };
    return { gameId, cards: this.gameState[gameId].cards };
  }

  flipCards(gameId: string, cardIds: number[]) {
    const game = this.gameState[gameId];
    if (!game) throw new Error('Game not found');

    game.flipped = cardIds;
    if (cardIds.length === 2) {
      const [card1, card2] = cardIds;
      if (game.cards[card1].id === game.cards[card2].id) {
        game.matched.push(...cardIds);
        game.score += 100; // Example scoring logic
      }
    }
    return { matched: game.matched, score: game.score };
  }

  withdraw(gameId: string) {
    const game = this.gameState[gameId];
    if (!game) throw new Error('Game not found');

    const score = game.score;
    delete this.gameState[gameId];
    return { score };
  }

  reshuffleCards(gameId: string) {
    const game = this.gameState[gameId];
    if (!game) throw new Error('Game not found');

    // Get all unmatched cards
    const unmatchedCards = game.cards.filter((_, index) => !game.matched.includes(index));
    
    // Shuffle unmatched cards with a more complex algorithm
    const shuffledCards = unmatchedCards
      .map(card => ({ card, sort: Math.random() * Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card);

    // Replace unmatched cards with shuffled ones
    let shuffleIndex = 0;
    game.cards.forEach((card, index) => {
      if (!game.matched.includes(index)) {
        game.cards[index] = shuffledCards[shuffleIndex++];
      }
    });

    return { cards: game.cards };
  }

  private generateCards() {
    const icons = [
      { id: 1, icon: 'BTC', prize: 150 },
      { id: 2, icon: 'ETH', prize: 200 },
      { id: 3, icon: 'USDC', prize: 250 },
      { id: 4, icon: 'LINK', prize: 300 }
    ];
    
    // Create pairs for a 3x3 grid (9 cards)
    const cards = [...icons, ...icons, ...icons.slice(0, 1)]; // Add an extra card for odd grid
    return cards.sort(() => Math.random() - 0.5); // Shuffle
  }
}

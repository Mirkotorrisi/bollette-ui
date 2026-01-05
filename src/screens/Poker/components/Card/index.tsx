import React from "react";
import { Card as CardType, Rank, Suit } from "../../types";

interface CardProps {
  card: CardType;
  className?: string;
  style?: React.CSSProperties;
}

// Convert rank number to display value
const getRankDisplay = (rank: Rank): string => {
  switch (rank) {
    case Rank.Jack:
      return "J";
    case Rank.Queen:
      return "Q";
    case Rank.King:
      return "K";
    case Rank.Ace:
      return "A";
    default:
      // Numeric ranks (2-10) are displayed as-is
      return rank.toString();
  }
};

// Get suit symbol
const getSuitSymbol = (suit: Suit): string => {
  switch (suit) {
    case Suit.Hearts:
      return "♥";
    case Suit.Diamonds:
      return "♦";
    case Suit.Clubs:
      return "♣";
    case Suit.Spades:
      return "♠";
    default:
      return "";
  }
};

// Get suit color
const getSuitColor = (suit: Suit): string => {
  return suit === Suit.Hearts || suit === Suit.Diamonds ? "#dc2626" : "#000";
};

export const Card = ({ card, className = "", style }: CardProps) => {
  const rankDisplay = getRankDisplay(card.rank);
  const suitSymbol = getSuitSymbol(card.suit);
  const suitColor = getSuitColor(card.suit);

  return (
    <div 
      className={`bg-white rounded-md shadow-lg border border-black border-opacity-10 flex items-start justify-start p-1 relative ${className}`} 
      style={style}
    >
      <div className="flex flex-col items-center gap-0.5">
        <div className="text-xl font-black leading-none font-sans" style={{ color: suitColor }}>
          {rankDisplay}
        </div>
        <div className="text-base leading-none" style={{ color: suitColor }}>
          {suitSymbol}
        </div>
      </div>
    </div>
  );
};

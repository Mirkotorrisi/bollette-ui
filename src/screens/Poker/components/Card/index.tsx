import React from "react";
import { Card as CardType, Rank, Suit } from "../../types";
import "./index.scss";

interface CardProps {
  card: CardType;
  className?: string;
  style?: React.CSSProperties;
}

// Convert rank number to display value
const getRankDisplay = (rank: Rank): string => {
  switch (rank) {
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    case 14:
      return "A";
    default:
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
    <div className={`mobile-card ${className}`} style={style}>
      <div className="mobile-card__content">
        <div className="mobile-card__rank" style={{ color: suitColor }}>
          {rankDisplay}
        </div>
        <div className="mobile-card__suit" style={{ color: suitColor }}>
          {suitSymbol}
        </div>
      </div>
    </div>
  );
};

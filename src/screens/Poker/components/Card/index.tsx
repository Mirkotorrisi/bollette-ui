import React from "react";
import { Card as CardType } from "../../types";
import { card_image } from "../../assets";

interface CardProps {
  card: CardType;
  className?: string;
  style?: React.CSSProperties;
}

export const Card = ({ card, className = "", style }: CardProps) => {
  const cardImageKey = `${card.suit}${card.rank}`;
  const cardImageUrl = card_image[cardImageKey];

  return (
    <div 
      className={`rounded-md shadow-lg border border-white border-opacity-20 overflow-hidden relative ${className}`}
      style={{
        backgroundImage: `url(${cardImageUrl})`,
        backgroundSize: '300%', // Zoom in to show only corner
        backgroundPosition: 'top left', // Position at top-left corner
        backgroundRepeat: 'no-repeat',
        ...style
      }}
    />
  );
};

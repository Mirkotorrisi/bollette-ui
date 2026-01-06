import React from "react";
import { Card as CardType } from "../../types";
import { card_image } from "../../assets";
import "./index.scss";

interface CardProps {
  card: CardType;
  className?: string;
}

export const Card = ({ card, className = "" }: CardProps) => {
  const cardImageKey = `${card.suit}${card.rank}`;
  const cardImageUrl = card_image[cardImageKey];

  return (
    <div
      className={`card rounded-md shadow-lg relative bg-left-top bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${cardImageUrl})`,
      }}
    />
  );
};

import React from "react";
import { Card as CardType, CHOICE, Player } from "../../types";
import { card_image } from "../../assets";
import { motion, AnimatePresence } from "framer-motion";
import { Card as MobileCard } from "../Card";
import "./index.scss";

interface Props {
  player: Player;
  index: number;
  isDealer: boolean;
  cards?: CardType[];
}
export const PokerPlayer = ({ player, index, cards, isDealer }: Props) => {
  const pos = player.position ?? index;

  const showCards =
    ![CHOICE.FOLD, "WAITING"].includes(player.state) && !player.isFolded;

  return (
    <div
      className={`player flex flex-col p-1 position${pos} ${
        player.isCurrentPlayer ? "active-turn" : ""
      } ${showCards ? "" : "folded"}`}
    >
      <div className="flex items-center gap-3">
        <img
          alt={`${player.name} cat avatar`}
          className="player__avatar rounded-full w-16 h-16 object-cover"
          src={`https://cataas.com/cat?${player.id}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://api.dicebear.com/7.x/avataaars/svg?seed=" + player.name;
          }}
        />

        <div className="flex flex-col">
          <h3 className="player__name">{player.name}</h3>
          <p className="player__chips">${player.chips}</p>
        </div>
      </div>
      {showCards && (
        <div className="player__cards-container">
          <AnimatePresence mode="popLayout">
            {cards?.length ? (
              <>
                {cards.map((c, i) => {
                  const rotation = i === 0 ? -10 : 10;
                  const leftPosition = i === 0 ? '30%' : '45%';
                  const cardAnimation = {
                    initial: {
                      opacity: 0,
                      y: -20,
                      rotate: rotation,
                      scale: 0.5,
                    },
                    animate: {
                      opacity: 1,
                      y: 0,
                      rotate: rotation,
                      scale: 1,
                    },
                    exit: { opacity: 0, y: 120, rotate: 30, scale: 0.5 },
                    transition: {
                      type: "spring" as const,
                      stiffness: 260,
                      damping: 20,
                    },
                  };

                  return (
                    <React.Fragment key={player.id + (c.suit + c.rank) + i}>
                      {/* Desktop: full card image */}
                      <motion.div
                        {...cardAnimation}
                        className="player__card player__card--desktop front"
                        style={{
                          backgroundImage: `url(${card_image[c.suit + c.rank]})`,
                          left: leftPosition,
                        }}
                      />
                      {/* Mobile: simplified card */}
                      <motion.div
                        {...cardAnimation}
                        className="player__card--mobile-wrapper"
                        style={{
                          left: leftPosition,
                        }}
                      >
                        <MobileCard card={c} className="player__card--mobile" />
                      </motion.div>
                    </React.Fragment>
                  );
                })}
              </>
            ) : (
              <>
                <motion.div
                  key={player.id + "-back-0"}
                  initial={{ opacity: 0, y: -20, rotate: -10, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, rotate: -10, scale: 1 }}
                  exit={{ opacity: 0, y: 120, rotate: 30, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="player__card"
                  style={{ backgroundImage: `url(${card_image.cardBack})` }}
                />
                <motion.div
                  key={player.id + "-back-1"}
                  initial={{ opacity: 0, y: -20, rotate: 10, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 10, scale: 1 }}
                  exit={{ opacity: 0, y: 120, rotate: 30, scale: 0.5 }}
                  transition={{ type: "tween", duration: 0.25 }}
                  className="player__card"
                  style={{ backgroundImage: `url(${card_image.cardBack})` }}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      )}

      {player.lastAction && (
        <div className="player__action">{player.lastAction}</div>
      )}

      <AnimatePresence>
        {!!player.bet && (
          <motion.div
            key={`bet-${player.id}`}
            layout
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.2,
              filter: "brightness(2)",
              y: pos < 3 ? 300 : -300,
              x:
                pos === 0 || pos === 5
                  ? 400
                  : pos === 2 || pos === 3
                  ? -400
                  : 0,
            }}
            transition={{
              opacity: { duration: 0.2 },
              layout: { duration: 0.8, ease: "backIn" },
              default: { duration: 0.8, ease: "backIn" },
            }}
            className="player__bet"
          >
            <div className="player__bet__chips" /> <span>${player.bet}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {isDealer && <div className="dealer-token" />}
    </div>
  );
};

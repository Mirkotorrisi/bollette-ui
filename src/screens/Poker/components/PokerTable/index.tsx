import React from "react";
import { Table, CHOICE, ChioceObj, Card as CardType } from "../../types";
import { PokerPlayer } from "../PokerPlayer";
import { GameLogs } from "../GameLogs";
import { Socket } from "socket.io-client";
import { card_image } from "../../assets";
import { motion, AnimatePresence } from "framer-motion";
import { Card as MobileCard } from "../Card";
import "./index.scss";
import BetInput from "../BetInput";

type PlayerAction = (id: string) => void;
type PlayerActionWithAmount = (id: string, amt: number) => void;
interface Props {
  table: Table;
  handleLeave: (id: string) => void;
  socket?: Socket;
  playerId?: string;
  userCards?: CardType[];
  gameLogs?: string[];
  bet: PlayerActionWithAmount;
  call: PlayerAction;
  check: PlayerAction;
  raise: PlayerActionWithAmount;
  fold: PlayerAction;
}
export const PokerTable = ({
  table,
  playerId,
  handleLeave,
  userCards,
  gameLogs,
  bet,
  call,
  check,
  raise,
  fold,
}: Props) => {
  const inGamePlayer = table.players.find((p) => p.id === playerId);

  const leaveTable = () => {
    handleLeave(table.id);
  };

  const choices: {
    [key: string]: ChioceObj;
  } = {
    [CHOICE.BET]: {
      label: "Bet",
      action: (amt) => bet(table.id, Math.floor(amt || table.bigBlind)),
    },
    [CHOICE.CALL]: {
      label: "Call",
      action: () => call(table.id),
    },
    [CHOICE.CHECK]: {
      label: "Check",
      action: () => check(table.id),
    },
    [CHOICE.FOLD]: {
      label: "Fold",
      action: () => fold(table.id),
    },
    [CHOICE.RAISE]: {
      label: "Raise",
      action: (amt) =>
        raise(table.id, Math.floor(amt! || table.highestBet * 2)),
    },
    [CHOICE.ALL_IN]: {
      label: "ALL IN",
      action: () => console.log(table.id, table.bigBlind),
    },
  };

  return (
    <div className="mx-auto w-full relative grid items-center poker-table lg:p-5">
      <h3 className="table-id">{table?.id}</h3>
      <button
        className="form__input leave-table px-2 py-4 absolute right-2 top-0 z-50"
        onClick={leaveTable}
      >
        Leave Table
      </button>
      {gameLogs && gameLogs.length > 0 && <GameLogs logs={gameLogs} />}
      <motion.h2
        key={table?.pot}
        initial={{
          scale: 1.3,
          filter: "brightness(2)",
          textShadow: "0 0 20px rgba(255,255,255,0.8)",
        }}
        animate={{
          scale: 1,
          filter: "brightness(1)",
          textShadow: "0 0 0px rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pot"
      >
        {table?.pot}$
      </motion.h2>
      {table?.players?.map((p, index) => (
        <PokerPlayer
          player={p}
          key={p.id}
          index={index}
          isDealer={p.position === table.dealerPosition}
          cards={p.id === playerId ? userCards : p.hand}
        />
      ))}
      <div className="flex justify-center items-center gap-1 lg:gap-4 community">
        <AnimatePresence mode="popLayout">
          {table.currentRound !== "PRE_FLOP" &&
            table.communityCards?.map((c, i) => (
              <React.Fragment key={c.suit + c.rank + i}>
                {/* Desktop: full card image */}
                <motion.div
                  initial={{ opacity: 0, y: -50, rotateY: 90, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: i * 0.1,
                  }}
                  className="community__card hidden lg:block front"
                  style={{
                    backgroundImage: `url(${card_image[c.suit + c.rank]})`,
                  }}
                />
                {/* Mobile: simplified card */}
                <motion.div
                  initial={{ opacity: 0, y: -50, rotateY: 90, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: i * 0.1,
                  }}
                  className="block lg:hidden"
                >
                  <MobileCard card={c} />
                </motion.div>
              </React.Fragment>
            ))}
        </AnimatePresence>
      </div>

      <div className="gap-4 actions w-full z-50">
        {inGamePlayer?.isCurrentPlayer &&
          inGamePlayer?.availableChoices?.map((choice: CHOICE) =>
            [CHOICE.BET, CHOICE.RAISE].includes(choice) ? (
              <BetInput
                choice={choices[choice]}
                minimum={table.highestBet || table.bigBlind}
                maximum={inGamePlayer.chips}
                pot={table.pot}
                key={choice}
              />
            ) : (
              <button
                className="form__input px-2 py-4 my-auto"
                onClick={() => choices[choice].action()}
                key={choice}
              >
                {choices[choice].label}
              </button>
            )
          )}
      </div>
    </div>
  );
};

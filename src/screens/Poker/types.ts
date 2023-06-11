export enum Actions {
  BET = "bet",
  FOLD = "fold",
  CHECK = "check",
  CALL = "call",
  RAISE = "raise",
  LEAVE = "leave",
  JOIN = "join",
  CREATE_TABLE = "createTable",
  SET_PLAYER = "setPlayer",
  GET_PLAYER = "getPlayer",
  GET_TABLE = "table",
  ALL_TABLES = "allTables",
  ALL_USER_TABLES = "allUserTables",
}

export interface Player {
  id: string;
  chips: number;
  isAllIn: boolean;
  isSitOut: boolean;
  name: string;
  hand?: Card[];
  isCurrentPlayer: boolean;
  isDealer: boolean;
  bet?: number;
  availableChoices: CHOICE[];
  isFolded: boolean;
  position: number;
}

export enum CHOICE {
  FOLD = "FOLD",
  BET = "BET",
  RAISE = "RAISE",
  CALL = "CALL",
  CHECK = "CHECK",
  ALL_IN = "ALL_IN",
}

export interface Table {
  id: string;
  players: Player[];
  currentHand: Hand;
  handsPlayed: number;
  playerToStartIndex: number;
  blind: number;
}

export interface Hand {
  players: Player[];
  communityCards: Card[];
  currentRound: HandRound;
  currentPlayer: number;
  lastPlayer: number;
  pot: number;
  highestBet: number;
  IsHandOver: boolean;
}

export enum HandRound {
  PRE_FLOP = "PRE_FLOP",
  FLOP = "FLOP",
  TURN = "TURN",
  RIVER = "RIVER",
  SHOWDOWN = "SHOWDOWN",
}

export interface Card {
  suit: Suit;
  rank: Rank;
}

export enum Suit {
  Clubs = "clubs",
  Diamonds = "diamonds",
  Hearts = "hearts",
  Spades = "spades",
}

export enum Rank {
  Two = 2,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace,
}

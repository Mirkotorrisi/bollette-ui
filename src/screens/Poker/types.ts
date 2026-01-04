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
  GET_PLAYER_CARDS = "getPlayerCards",
  GET_TABLE = "table",
  ALL_TABLES = "allTables",
  ALL_USER_TABLES = "allUserTables",
  ASK_FOR_CARDS = "askForCards",
  SHOWDOWN = "showdown",
  GAME_LOG = "gameLog",
}

export interface Player {
  bet?: number;
  isCurrentPlayer: boolean;
  isDealer: boolean;
  availableChoices: CHOICE[];
  chips: number;
  id: string;
  name: string;
  hand?: Card[];
  state: string;
  position: number;
  isFolded?: boolean;
  lastAction?: Actions;
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
  maxPlayers: number;
  dealerPosition: number;
  currentRound: string;
  players: Player[];
  pot: number;
  smallBlind: number;
  bigBlind: number;
  communityCards: Card[];
  deck: Card[];
  isHandOver: boolean;
  id: string;
  currentPlayerPosition: number;
  highestBet: number;
  lastPlayerPosition: number;
}

export interface Card {
  suit: Suit;
  rank: Rank;
}

export enum HandRound {
  PRE_FLOP = "PRE_FLOP",
  FLOP = "FLOP",
  TURN = "TURN",
  RIVER = "RIVER",
  SHOWDOWN = "SHOWDOWN",
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

export type ChioceObj = {
  label: string;
  action: (amt?: number) => void;
};

export type PokerState = {
  player?: Player;
  tables?: Table[];
  userTables?: Map<string, Table>;
  userCards?: Map<string, Card[]>;
};

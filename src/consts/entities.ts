import { CHAMPIONSHIPS, MARKETS, outcomes } from "./enums";

export const leagues = [
  {
    key: CHAMPIONSHIPS.PREMIER_LEAGUE,
    label: "Premier League",
    flag: "premierLeague",
  },
  {
    key: CHAMPIONSHIPS.SERIE_A,
    label: "Serie A",
    flag: "serieA",
  },
  {
    key: CHAMPIONSHIPS.SERIE_B,
    label: "Serie B",
    flag: "serieB",
  },
  {
    key: CHAMPIONSHIPS.LIGA_MX,
    label: "Liga Max",
    flag: "ligaMax",
  },
  {
    key: CHAMPIONSHIPS.BUNDESLIGA,
    label: "Bundesliga",
    flag: "bundesliga",
  },
  {
    key: CHAMPIONSHIPS.LA_LIGA,
    label: "La Liga",
    flag: "laLiga",
  },
  {
    key: CHAMPIONSHIPS.PRIMEIRA_LIGA,
    label: "Primeira Liga",
    flag: "primeiraLiga",
  },
  {
    key: CHAMPIONSHIPS.CHAMPIONS_LEAGUE,
    label: "Champions League",
    flag: "championsLeague",
  },
  {
    key: CHAMPIONSHIPS.EUROPA_LEAGUE,
    label: "Europa League",
    flag: "europaLeague",
  },
];

export const markets = [
  {
    key: MARKETS.H2H,
    label: "Head to head",
    outcomes: outcomes[MARKETS.H2H],
  },
  {
    key: MARKETS.TOTALS,
    label: "Over/under 2.5",
    outcomes: outcomes[MARKETS.TOTALS],
  },
  {
    key: MARKETS.BOTH_TEAMS_TO_SCORE,
    label: "Both teams to score",
    outcomes: outcomes[MARKETS.BOTH_TEAMS_TO_SCORE],
  },
];

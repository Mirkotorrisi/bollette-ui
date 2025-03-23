export enum CHAMPIONSHIPS {
  SERIE_A = "serie_a",
  PREMIER_LEAGUE = "premier_league",
  SERIE_B = "serie_b",
  LIGA_MX = "ligamax",
  BUNDESLIGA = "bundesliga",
  LA_LIGA = "la_liga",
  PRIMEIRA_LIGA = "primeira_liga",
  CHAMPIONS_LEAGUE = "champions_league",
  EUROPA_LEAGUE = "europa_league",
}

export enum MARKETS {
  H2H = "h2h",
  TOTALS = "totals",
  BOTH_TEAMS_TO_SCORE = "both_teams_to_score",
}

export enum SIGN {
  HOME = "home",
  VISITOR = "away",
  DRAW = "draw",
  OVER = "over",
  UNDER = "under",
  BOTH_TEAMS_TO_SCORE_YES = "gg",
  BOTH_TEAMS_TO_SCORE_NO = "ng",
}

export const outcomes = {
  [MARKETS.H2H]: [SIGN.HOME, SIGN.DRAW, SIGN.VISITOR],
  [MARKETS.TOTALS]: [SIGN.OVER, SIGN.UNDER],
  [MARKETS.BOTH_TEAMS_TO_SCORE]: [
    SIGN.BOTH_TEAMS_TO_SCORE_YES,
    SIGN.BOTH_TEAMS_TO_SCORE_NO,
  ],
} as const;

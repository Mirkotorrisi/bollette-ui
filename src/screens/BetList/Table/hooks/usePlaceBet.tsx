import { useSelector } from "react-redux";
import {
  addBetToTicket,
  Bet,
  removeBetFromTicket,
  selectTicket,
} from "../../../../redux/tickets";
import { Match } from "../../../../service";
import { useAppDispatch } from "../../../../store";

export const usePlaceBet = (match: Match) => {
  const { ticket } = useSelector(selectTicket);
  const dispatch = useAppDispatch();
  const selectedBet = ticket.find(
    ({ matchId }: Bet) => matchId === match.matchId
  );
  const isSelected = (result: string) => selectedBet?.result === result;

  const submitOrRemoveBet = (result: string) => {
    if (isSelected(result)) {
      dispatch(
        removeBetFromTicket({
          matchId: match.matchId,
        })
      );
      return;
    }

    dispatch(addBetToTicket({ match, result }));
  };

  return { submitOrRemoveBet, isSelected };
};

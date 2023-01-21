import { useSelector } from "react-redux";
import {
  addBetToTicket,
  Bet,
  removeBetFromTicket,
  selectTicket,
} from "../../../../redux/tickets";
import { useAppDispatch } from "../../../../store";

export const usePlaceBet = (selectedMatchId: string) => {
  const { ticket } = useSelector(selectTicket);
  const dispatch = useAppDispatch();
  const selectedBet = ticket.find(
    ({ matchId }: Bet) => matchId === selectedMatchId
  );
  const isSelected = (result: string) => selectedBet?.result === result;

  const submitOrRemoveBet = (result: string) => {
    if (isSelected(result)) {
      dispatch(
        removeBetFromTicket({
          matchId: selectedMatchId,
        })
      );
      return;
    }

    dispatch(addBetToTicket({ matchId: selectedMatchId, result }));
  };

  return { submitOrRemoveBet, isSelected };
};

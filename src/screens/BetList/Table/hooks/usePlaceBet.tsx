import { useSelector } from "react-redux";
import {
  addBetToTicket,
  Bet,
  removeBetFromTicket,
  selectTicket,
} from "../../../../redux/tickets";
import { useAppDispatch } from "../../../../store";

export const usePlaceBet = (quotaTeams: string[], matchNumber: number) => {
  const { ticket } = useSelector(selectTicket);
  const dispatch = useAppDispatch();
  const selectedBet = ticket.find(({ teams }: Bet) =>
    teams.every((val, index) => val === quotaTeams[index])
  );
  const isSelected = (result: string) => selectedBet?.result === result;

  const submitOrRemoveBet = (result: string) => {
    if (isSelected(result)) {
      dispatch(
        removeBetFromTicket({
          matchNumber: ticket.indexOf(selectedBet!),
        })
      );
      return;
    }

    dispatch(addBetToTicket({ matchNumber, result }));
  };

  return { submitOrRemoveBet, isSelected };
};

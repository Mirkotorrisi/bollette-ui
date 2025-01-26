import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { showModal } from "../redux/modals";
import { clearTicket, selectTicket, updateTicketOdds } from "../redux/tickets";
import { updateAccountSum } from "../redux/user";
import { submitCheckout } from "../service";
import { useAppDispatch } from "../store";

const useCheckout = () => {
  const dispatch = useAppDispatch();
  const { ticket, multiplier } = useSelector(selectTicket);
  const [showTotalContainer, setShowTotalContainer] = useState(false);
  const [sum, setSum] = useState(2);
  const [oddsChanged, setOddsChanged] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!ticket.length || !multiplier) return;
    const ticketWithoutPrevOdds = ticket.map((bet) => ({
      ...bet,
      prevOdd: undefined,
    }));
    const res = await submitCheckout(sum, ticketWithoutPrevOdds, multiplier);
    if (res.updatedTicket) {
      setOddsChanged(true);
      dispatch(updateTicketOdds(res.updatedTicket));
    }
    if (res.account_sum) {
      dispatch(clearTicket());
      dispatch(updateAccountSum(res.account_sum));
      dispatch(showModal(res));
      setOddsChanged(false);
    }
  }, [dispatch, sum, ticket, multiplier]);

  return {
    ticket,
    showTotalContainer,
    setShowTotalContainer,
    sum,
    setSum,
    oddsChanged,
    setOddsChanged,
    handleSubmit,
    multiplier,
  };
};

export default useCheckout;

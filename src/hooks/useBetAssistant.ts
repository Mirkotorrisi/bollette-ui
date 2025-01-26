import React, { useState } from "react";
import { Bet, setWholeTicket } from "../redux/tickets";
import { sendBolletteAgentPrompt } from "../service";
import { useAppDispatch } from "../store";
import useCheckout from "./useCheckout";

const useBetAssistant = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useAppDispatch();
  const { handleSubmit: submitCheckout, setSum } = useCheckout();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await sendBolletteAgentPrompt(input, dispatch, session);
    setIsLoading(false);
    if (res.data?.id) setSession(res.data.id);
    setInput("");
    if (res.data?.amount) {
      setSum(res.data.amount);
      submitCheckout();
    } else if (res.data?.payslip) {
      const parsedResuls = res.data?.payslip?.map(
        (bet: Bet & { sign: string }) => ({
          ...bet,
          result: bet.sign,
        })
      );
      dispatch(setWholeTicket(parsedResuls));
    }
    if (res.data?.message) setMessage(res.data.message);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };
  return {
    handleChange,
    handleSubmit,
    handleEnter,
    message,
    input,
    isLoading,
  };
};

export default useBetAssistant;

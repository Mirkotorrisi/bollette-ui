import React from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import useBetAssistant from "../../../hooks/useBetAssistant";

const BetAssistant = () => {
  const { handleChange, handleSubmit, handleEnter, message, input, isLoading } =
    useBetAssistant();
  return (
    <div className="col-span-12 px-2 my-20 flex flex-col items-start gap-2 ">
      <h2 className="text-4xl warning">AI Powered Bet Assistant</h2>
      <p>
        Place your bets effortlessly by chatting with us, just like you would
        with a real betting operator.
      </p>
      <p>
        Note that it could take a while to load, as it's powered by a real AI.
        And of course, it could make mistakes, especially regarding the desired
        result.
      </p>
      <p>When your bet is ready, try to ask AI to checkout your ticket.</p>
      <p>
        If you want to know more about how I built this assistant, click{" "}
        <Link to={"/credits#bet-assistant"}>here</Link>
      </p>
      <input
        type="text"
        placeholder="Place your bet here..."
        className="border px-4 py-2 rounded-lg mt-4 w-full max-w-lg"
        onKeyUp={(e) => handleEnter(e)}
        value={input}
        onChange={handleChange}
      />
      <div className="flex gap-4 items-center">
        <button
          className="checkout__footer__submit rounded px-2 py-1"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {isLoading && <Loader isSmall />}
      </div>
      <p className="text-sm text-gray-500 mt-2">{message}</p>
    </div>
  );
};

export default BetAssistant;

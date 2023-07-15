import React, { useState } from "react";
import { ChioceObj } from "../../types";
import "./index.scss";

interface Props {
  choice: ChioceObj;
  pot: number;
  minimum: number;
  maximum: number;
}

const chips = [
  {
    label: "1/2 pot",
    value: 0.5,
  },
  {
    label: "3/4 pot",
    value: 0.75,
  },
  {
    label: "pot",
    value: 1,
  },
  {
    label: "2 pot",
    value: 2,
  },
];
const BetInput = ({ choice, pot, minimum, maximum }: Props) => {
  const [amount, setAmount] = useState(minimum);
  return (
    <div className="flex bet-input">
      <button
        className="form__input px-2 py-4"
        onClick={() => choice.action(amount)}
      >
        {choice.label}
      </button>
      <div className="flex flex-col">
        <div className="gap-2 flex justify-between">
          {chips.map((c) => (
            <span
              className="amount_chip px-2 py-1"
              onClick={() => setAmount(c.value * pot)}
              key={c.value}
            >
              {c.label}
            </span>
          ))}
          <span className="amount_chip" onClick={() => setAmount(maximum)}>
            All in
          </span>
        </div>
        <input
          type="number"
          className=" amount_input"
          min={minimum}
          max={maximum}
          onChange={(e) => setAmount(+e.target.value)}
          value={amount}
        />
      </div>
    </div>
  );
};

export default BetInput;

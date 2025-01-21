import React from "react";

interface Props {
  sign: string;
  index: number;
  odd?: number;
  isSelected: boolean;
  submitOrRemoveBet: (sign: string) => void;
}

export const BetButton = ({
  sign,
  index,
  odd,
  isSelected,
  submitOrRemoveBet,
}: Props) => {
  return (
    <td
      id={`${sign}-${index}`}
      key={`${sign}-${index}`}
      className={`text-center button_odd${isSelected ? "_clicked" : ""}`}
    >
      <button
        className="w-full py-4 button_odd__text"
        onClick={() => submitOrRemoveBet(sign)}
      >
        {odd}
      </button>
    </td>
  );
};

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
      className={
        isSelected
          ? "p-2 text-center button_odd_clicked"
          : "p-2 text-center button_odd"
      }
    >
      <button
        className="py-2 button_odd__text"
        onClick={() => {
          submitOrRemoveBet(sign);
        }}
      >
        {odd}
      </button>
    </td>
  );
};

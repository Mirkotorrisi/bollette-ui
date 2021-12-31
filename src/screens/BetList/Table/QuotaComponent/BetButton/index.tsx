interface Props {
  sign: string;
  index: number;
  odd: number;
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
    <td id={`${sign}-${index}`} key={`${sign}-${index}`}>
      <button
        className={isSelected ? "button_odd_clicked" : "button_odd"}
        onClick={() => {
          submitOrRemoveBet(sign);
        }}
      >
        {odd}
      </button>
    </td>
  );
};

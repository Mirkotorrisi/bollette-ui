import { Slot } from "../components/Slot";

export const SlotComponent = () => {
  return (
    <div
      style={{
        background: "#e0e0e0",
        alignItems: "center",
        width: "100%",
        maxWidth: "960px",
        height: "50vh",
      }}
    >
      <Slot />
    </div>
  );
};

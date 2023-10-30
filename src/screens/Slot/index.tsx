import React, { useState } from "react";
import * as slotresources from "../../assets/slotresources";
import { spinSlot } from "../../service";
import "./index.scss";
import { useAppDispatch } from "../../store";
import { selectUser, updateAccountSum } from "../../redux/user";
import { useSelector } from "react-redux";

export const Slot = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const { assets, background, height, numOfWheels } =
    slotresources.slotresources;
  const [wheels, setWheels] = useState(
    Array.from({ length: numOfWheels }, () =>
      Math.floor(Math.random() * assets.length)
    )
  );
  const [winAssetIndex, setWinAssetIndex] = useState<number | null>();
  const [sum, setSum] = useState(0);

  const tz = Math.round(height / 2 / Math.tan(Math.PI / assets.length));

  const basicAngle = 360 / assets.length;
  const handleSpin = () => {
    dispatch(updateAccountSum(user.account_sum - 2));
    setWinAssetIndex(null);
    let interval = setInterval(() => {
      setWheels((prev) => prev.map((i) => i + 1));
    }, 50);
    setTimeout(async () => {
      try {
        const res = await spinSlot(2, numOfWheels, assets.length);
        if (res) {
          setWheels(res.results);
          if (res.duplicates.length && res.sum) {
            setWinAssetIndex(res.duplicates[0]);
            setSum(res.sum);
            dispatch(updateAccountSum(user.account_sum + res.sum));
          }
        }
      } catch (error) {
        clearInterval(interval);
      }
      clearInterval(interval);
    }, Math.random() * 5000);
  };

  return (
    <div className="flex items-center w-full justify-center">
      <div className="flex flex-col slot justify-between">
        <button className="slot__spin px-8" onClick={handleSpin}>
          SPIN
        </button>

        <img
          src={"img/" + background.src}
          className="slot__background"
          alt="slot_bg"
        />
        {wheels.map((wheel, i) => (
          <div
            className={`slot__wheel`}
            style={{
              left: 16 + i * 25 + "%",
              transform: `translateZ(-${tz}px) rotateX(${
                (360 / assets.length) * wheel * -1
              }deg)`,
            }}
          >
            {assets &&
              assets.map((img, wheel) => (
                <img
                  src={"img/" + img.src}
                  className={`slot__wheel__img ${
                    winAssetIndex === wheel ? "animate" : ""
                  }`}
                  alt="wheel_img"
                  style={{
                    transform: `rotateX(${
                      basicAngle * wheel
                    }deg) translateZ(${tz}px)`,
                  }}
                />
              ))}
          </div>
        ))}
        <h2 className="slot__name">
          -
          {(winAssetIndex || winAssetIndex === 0) &&
            assets[winAssetIndex].src.split(".")[0] + " - You won " + sum + "$"}
        </h2>
      </div>
    </div>
  );
};

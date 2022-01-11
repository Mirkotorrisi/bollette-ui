import { useEffect, useState, useRef } from "react";
import * as slotresources from "../../assets/slotresources";
import { spinSlot } from "../../service";
import "./index.scss";

let prevTime = 0;
export const Slot = () => {
  const { background, assets, carouselStyle, numOfWheels } =
    slotresources.slotresources;
  const [interacted, setInteracted] = useState(false);
  const [repeat, setRepeat] = useState(0);
  const [angle, setAngle] = useState(0);
  const [wheels, setWheels] = useState(
    Array.from({ length: numOfWheels }, () =>
      Math.floor(Math.random() * assets.length)
    )
  );
  const [final, setFinal] = useState([]);
  const [win, setwin] = useState(null);
  const [sum, setsum] = useState(0);
  const [tick, setTick] = useState(0);

  const tz = Math.round(
    carouselStyle.height / 2 / Math.tan(Math.PI / assets.length)
  );
  const basicAngle = 360 / assets.length;
  useFrameLoop((time) => {
    if (!time) return;
    if (time - prevTime < 50) return;
    prevTime = time;
    setTick(time); // this is my frame rate
  });
  useEffect(() => {
    if (JSON.stringify(wheels) === JSON.stringify(final)) return;
    setWheels(
      wheels.map((wheel, i) =>
        wheel % assets.length !== final[i] ? wheel + 1 : wheel
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);
  const handleSpin = () => {
    setwin(null);
    setFinal([]);
    !interacted && setInteracted(true);
    setTimeout(async () => {
      const res = await spinSlot(2, numOfWheels, assets.length);
      if (res) {
        setFinal(res.results);
        res.duplicates.length > 0 && setwin(res.duplicates[0]);
        res.sum && setsum(res.sum);
      }
    }, Math.random() * 5000);
  };

  useEffect(() => {
    if (!interacted) {
      setTimeout(() => {
        setAngle((360 / assets.length) * 0.4 * -1);
        setTimeout(() => {
          setAngle((360 / assets.length) * -0.4 * -1);
          setTimeout(() => {
            setAngle((360 / assets.length) * 0 * -1);
            setRepeat(repeat + 1);
          }, 600);
        }, 500);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interacted, repeat]);

  return (
    <div className="flex items-center w-screen justify-center">
      <div className="flex flex-col slot justify-between">
        <button onClick={handleSpin}>SPIN</button>
        {(win || win === 0) && (
          <h1
            style={{
              border: "2px solid " + assets[win].color,
              color: assets[win].color,
            }}
            className="slot__name"
          >
            {assets[win].src.split(".")[0]}
          </h1>
        )}
        {(win || win === 0) && (
          <h1
            style={{
              border: "2px solid " + assets[win].color,
              color: assets[win].color,
            }}
            className="slot__sum"
          >
            {sum}$
          </h1>
        )}
        <img
          src={"img/" + background.src}
          className="slot__background"
          alt="slot_bg"
        />
        {wheels.map((wheel, i) => (
          <div
            className="slot__wheel"
            style={{
              left: 16 + i * 25 + "%",

              transform: `translateZ(-${tz}px) rotateX(${
                !interacted ? angle : (360 / assets.length) * wheel * -1
              }deg)`,
            }}
          >
            {assets &&
              assets.map((img, wheel) => (
                <img
                  src={"img/" + img.src}
                  className="slot__wheel__img"
                  alt="wheel_img"
                  style={{
                    transform: `rotateX(${
                      basicAngle * wheel
                    }deg) translateZ(${tz}px)`,
                    background:
                      win === wheel && Math.round(tick) % 2 === 0
                        ? assets[wheel].color
                        : "#f2f2f2",
                  }}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const useFrameLoop = (
  callback: (time?: number, deltaTime?: number) => void
) => {
  const requestID = useRef<number>();
  const previousTime = useRef<number>();

  const loop = (time: number) => {
    if (previousTime.current !== undefined) {
      const deltaTime = time - previousTime.current;
      callback(time, deltaTime);
    }

    previousTime.current = time;
    requestID.current = requestAnimationFrame(loop);
  };
  useEffect(() => {
    requestID.current = requestAnimationFrame(loop);
    return () => {
      callback(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

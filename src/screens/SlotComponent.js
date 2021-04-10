import { useEffect, useState, useRef } from "react";
import * as slotresources from "../assets/slotresources";
let prevTime = 0;

export const SlotComponent = () => {
  const {
    background,
    assets,
    carouselStyle,
    numOfWheels,
    spin,
  } = slotresources.slotresources;
  const [interacted, setInteracted] = useState(false);
  const [repeat, setRepeat] = useState(0);
  const [counter, setCounter] = useState(-1);
  const [angle, setAngle] = useState(0);
  const [wheels, setWheels] = useState(
    Array.from({ length: numOfWheels }, () =>
      Math.floor(Math.random() * assets.length)
    )
  );
  const [win, setwin] = useState(false);
  const [runningWheels, setRunningWheels] = useState(
    new Array(numOfWheels).fill(true)
  );
  const [tick, setTick] = useState(0);
  const [endGame, setEndGame] = useState(false);

  const tz = Math.round(
    carouselStyle.width / Math.tan(Math.PI / assets.length)
  );
  const basicAngle = 360 / assets.length;
  useFrameLoop((time) => {
    if (time - prevTime < 150) return;
    prevTime = time;
    setTick(time); // this is my frame rate
  });
  useEffect(() => {
    if (endGame) return;
    console.log(runningWheels);
    setWheels(
      wheels.map((wheel, i) => {
        return runningWheels[i] ? wheel + 1 : wheel;
      })
    );
    if (!runningWheels.includes(true)) {
      wheels.every(
        (val, i, arr) =>
          ((360 / assets.length) * val) % 360 ===
          ((360 / assets.length) * arr[0]) % 360
      )
        ? setwin(true)
        : console.log("Lose"); // true
      setEndGame(true);
    }
  }, [tick]);
  const handleSpin = () => {
    setwin(false);
    if (endGame) {
      setCounter(0);
      setRunningWheels(new Array(numOfWheels).fill(true));
      setEndGame(false);
    } else {
      !interacted && setInteracted(true);

      setCounter(counter + 1);
      setTimeout(() => {
        let runningCopy = runningWheels;
        runningCopy[counter] = false;
        setRunningWheels(runningCopy);
      }, Math.random() * 2000);
    }
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
  }, [interacted, repeat]);

  return (
    <div>
      <img
        src={"img/" + background.src}
        style={{
          position: "absolute",
          ...background.style,
        }}
      />
      <div
        style={{
          perspective: "50000px",
          position: "absolute",
          zIndex: 100020,
          width: 300,
          left: 0,
          height: 480,
          top: 0,
        }}
      >
        {wheels.map((wheel, i) => {
          return (
            <div
              style={{
                position: "absolute",
                zIndex: 100050,
                ...carouselStyle,
                left: carouselStyle.left + i * carouselStyle.width,
                transform: `translateZ(-${tz}px) rotateX(${
                  !interacted ? angle : (360 / assets.length) * wheel * -1
                }deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 1s",
              }}
            >
              {assets &&
                assets.map((img, wheel) => {
                  return (
                    <img
                      src={"img/" + img.src}
                      style={{
                        transform: `rotateX(${
                          basicAngle * wheel
                        }deg) translateZ(${tz}px)`,
                        background: win ? "#ff00ff" : null,
                        width: carouselStyle.width,
                        height: carouselStyle.height,
                        position: "absolute",
                        zIndex: 10001,
                      }}
                    />
                  );
                })}
            </div>
          );
        })}
      </div>
      <button onClick={() => handleSpin()} style={spin} />
    </div>
  );
};

const useFrameLoop = (callback, setDungeon) => {
  const requestID = useRef();
  const previousTime = useRef();

  const loop = (time) => {
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
  }, []);
};

import { useEffect, useState, useRef } from "react";
import * as slotresources from "../assets/slotresources";
import {spinSlot} from '../service/index'
let prevTime = 0;
export const Slot = () => {
  const {
    background,
    assets,
    carouselStyle,
    numOfWheels,
    spin,
  } = slotresources.slotresources;
  const [interacted, setInteracted] = useState(false);
  const [repeat, setRepeat] = useState(0);
  const [angle, setAngle] = useState(0);
  const [wheels, setWheels] = useState(
    Array.from({ length: numOfWheels }, () =>
      Math.floor(Math.random() * assets.length)
    )
  );
  const [final, setFinal] = useState([])
  const [win, setwin] = useState(null);
  const [sum, setsum] = useState(0);
  const [tick, setTick] = useState(0);

  const tz = Math.round(
    carouselStyle.height / 2 / Math.tan(Math.PI / assets.length) 
  );
  const basicAngle = 360 / assets.length;
  useFrameLoop((time) => {
    if (time - prevTime < 100) return;
    prevTime = time;
    setTick(time); // this is my frame rate
  });
  useEffect(() => {
    console.log("qua??")
    if (JSON.stringify(wheels)==JSON.stringify(final)) return;
    setWheels(
      wheels.map((wheel, i) => 
        wheel%assets.length !== final[i] ? wheel + 1 : wheel)
    );
  }, [tick]);
  const handleSpin = () => {
    setwin(null);  
    setFinal([])
    !interacted && setInteracted(true);
    setTimeout(async ()=>{
      const res = await spinSlot(2, numOfWheels, assets.length)
      if(res){ setFinal(res.results); res.duplicates.length>0 && setwin(res.duplicates[0]); res.sum && setsum(res.sum)}
    }, Math.random()*5000)
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
      <div
        style={{
          perspective: "500px",
        display:"flex",
        }}
      >   
            <button onClick={() => handleSpin()} style={spin} >{"SPIN"}</button>
            { (win || win === 0) &&    
            <h1 style={{  position: "absolute", 
                          top: 327, left:201,
                          background: "#f2f2f2", 
                          border : "2px solid "+assets[win].color , 
                          borderRadius: "10px",
                          fontSize: 48, 
                          color: assets[win].color, 
                          zIndex:1000100}}>
               {assets[win].src.split(".")[0]}
            </h1>
            }
            { (win || win === 0) &&           
            <h1 style={{  position: "absolute",
                          top:-100,left:"20vw", 
                          fontSize: 72,
                          background: "#f2f2f2", 
                          border : "2px solid "+assets[win].color, 
                          borderRadius: "10px",
                          color: assets[win].color, 
                          zIndex:1000100}}>
               {sum}$
            </h1>}
         <img
      src={"img/" + background.src}
      style={{
        ...background.style,
      }}
    />
        {wheels.map((wheel, i) => {
          return (
            <div
              style={{
                position: "absolute",
                left: carouselStyle.left + i*25  + "%",

                transform: `translateZ(-${tz}px) rotateX(${
                  !interacted ? angle : (360 / assets.length) * wheel * -1
                }deg)`,
                transformStyle: "preserve-3d",
                height: carouselStyle.height,

                transition: "transform 1s",
                top: background.style.height/3
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
                        background: win === wheel && Math.round(tick)%2===0 ? assets[wheel].color : "#f2f2f2",
                        width: carouselStyle.width,
                        maxWidth: 192,
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

import React, { useEffect, useMemo } from "react";
import "./index.scss";
import { createSocket } from "../../service/socket";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import { PokerView } from "./PokerView";

const Poker = () => {
  const user = useSelector(selectUser);
  const socket = useMemo(() => createSocket(user.username), [user.username]);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <PokerView socket={socket} />;
};

export default Poker;

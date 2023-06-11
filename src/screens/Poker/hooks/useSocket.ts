import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { rootUrl } from "../../../assets/res";
import { selectUser } from "../../../redux/user";
import { Actions, Player } from "../types";
import { useSelector } from "react-redux";

export const useSocket = () => {
  const user = useSelector(selectUser);
  const [socket, setSocket] = useState<Socket | undefined>();
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    if (!user) return;

    const socket = io(rootUrl, {
      auth: {
        name: user.username,
      },
    });

    socket.on(Actions.SET_PLAYER, (player: Player) => {
      setPlayer(player);
    });

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, [user]);

  return {
    socket,
    player,
  };
};

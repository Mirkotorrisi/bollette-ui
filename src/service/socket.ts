import { io } from "socket.io-client";

export const createSocket = (username: string) =>
  io(process.env.REACT_APP_API_URL || "", {
    auth: {
      name: username,
    },
    // autoConnect: false,
  });

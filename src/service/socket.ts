import { io } from "socket.io-client";

export const createSocket = (username: string) =>
  io(import.meta.env.VITE_APP_API_URL || "", {
    auth: {
      name: username,
    },
    // autoConnect: false,
  });

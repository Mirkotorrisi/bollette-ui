import { Socket } from "socket.io-client";
import { Actions } from "../types";

export const usePokerActions = (socket?: Socket, playerId?: string) => {
  const handleJoinTable = (tableId: string) => {
    socket?.emit(Actions.JOIN, { tableId, playerId });
  };
  const handleBet = (tableId: string, amount: number) => {
    socket?.emit(Actions.BET, { tableId, amount });
  };
  const handleCall = (tableId: string) => {
    socket?.emit(Actions.CALL, tableId);
  };
  const handleRaise = (tableId: string, amount: number) => {
    socket?.emit(Actions.RAISE, { tableId, amount });
  };
  const handleFold = (tableId: string) => {
    socket?.emit(Actions.FOLD, tableId);
  };
  const handleCheck = (tableId: string) => {
    socket?.emit(Actions.CHECK, tableId);
  };
  const handleCreateTable = () => {
    socket?.emit(Actions.CREATE_TABLE, playerId);
  };
  const handleGetTable = () => {
    socket?.emit(Actions.GET_TABLE);
  };

  return {
    handleBet,
    handleCall,
    handleCheck,
    handleCreateTable,
    handleFold,
    handleGetTable,
    handleRaise,
    handleJoinTable,
  };
};

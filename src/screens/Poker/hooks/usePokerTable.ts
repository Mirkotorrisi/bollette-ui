import { useCallback, useEffect, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import { Actions, Card, Player, Table } from "../types";
import { getAxiosInstance } from "../../../service/getAxiosInstance";

export const usePokerTable = (
  socket: Socket,
  selectTable: (id: string) => void
) => {
  const [player, setPlayer] = useState<Player>();
  const [userTables, setUserTables] = useState<Map<string, Table>>(
    new Map<string, Table>([])
  );
  const [userCards, setUserCards] = useState<Map<string, Card[]>>(
    new Map<string, Card[]>([])
  );
  const [tablesArray, setTablesArray] = useState<
    { id: string; players: number }[]
  >([]);
  const [gameLogs, setGameLogs] = useState<Map<string, string[]>>(
    new Map<string, string[]>([])
  );

  const handleUpdateTable = useCallback(
    (action?: Actions) => (table: Table) => {
      setUserTables((prev) => {
        const nextMap = new Map(prev);
        const prevTable = prev.get(table.id);
        const updatedTable = { ...table };

        // Detection of new hand: if isHandOver transitions from true to false
        if (prevTable?.isHandOver && !table.isHandOver) {
          setUserCards((prevCards) => {
            const nextCards = new Map(prevCards);
            nextCards.delete(table.id);
            return nextCards;
          });
          // Request fresh cards for the new hand
          socket.emit(Actions.GET_PLAYER_CARDS, table.id);
        }

        if (action) {
          const position = prevTable?.currentPlayerPosition;
          if (position !== undefined && updatedTable.players[position]) {
            updatedTable.players = [...updatedTable.players];
            updatedTable.players[position] = {
              ...updatedTable.players[position],
              lastAction: action,
            };
          }
        }

        nextMap.set(table.id, updatedTable);
        return nextMap;
      });
    },
    [socket]
  );

  const handleUpdatePlayers = useCallback(
    (table: Table, playerId: string) => {
      setPlayer((currentPlayer) => {
        if (playerId === currentPlayer?.id) return currentPlayer;
        handleUpdateTable(Actions.JOIN)(table);
        return currentPlayer;
      });
    },
    [handleUpdateTable]
  );

  const getUserCards = useCallback(
    ({ tableId, hand }: { tableId: string; hand: Card[] }) => {
      setUserCards((prev) => {
        const nextMap = new Map(prev);
        nextMap.set(tableId, hand);
        return nextMap;
      });
    },
    []
  );

  const handleGameLog = useCallback(
    ({ tableId, logs }: { tableId: string; logs: string[] }) => {
      setGameLogs((prev) => {
        const nextMap = new Map(prev);
        nextMap.set(tableId, logs);
        return nextMap;
      });
    },
    []
  );

  useEffect(() => {
    if (player?.id) {
      userTables.forEach((_, tableId) => {
        socket.emit(Actions.GET_PLAYER_CARDS, tableId);
      });
    }
  }, [player?.id, userTables.size, socket]);

  useEffect(() => {
    socket.on(Actions.SET_PLAYER, (player: Player) => {
      setPlayer(player);
    });
    socket.on(Actions.ALL_TABLES, (tables) => {
      setTablesArray(tables);
    });
    socket.on(Actions.ALL_USER_TABLES, (userTables) => {
      setUserTables(new Map(userTables));
      if (userTables?.length) {
        selectTable(userTables[userTables.length - 1][0]);
      }
    });
    socket.on(Actions.BET, handleUpdateTable(Actions.BET));
    socket.on(Actions.FOLD, handleUpdateTable(Actions.FOLD));
    socket.on(Actions.RAISE, handleUpdateTable(Actions.RAISE));
    socket.on(Actions.CALL, handleUpdateTable(Actions.CALL));
    socket.on(Actions.CHECK, handleUpdateTable(Actions.CHECK));
    socket.on(Actions.JOIN, handleUpdatePlayers);
    socket.on(Actions.LEAVE, handleUpdatePlayers);
    socket.on(Actions.GET_TABLE, handleUpdateTable());
    socket.on(Actions.GET_PLAYER_CARDS, getUserCards);
    socket.on(Actions.ASK_FOR_CARDS, (tableId) => {
      setUserCards((prev) => {
        const next = new Map(prev);
        next.delete(tableId);
        return next;
      });
      setUserTables((prev) => {
        const next = new Map(prev);
        const table = next.get(tableId);
        if (table) {
          next.set(tableId, {
            ...table,
            players: table.players.map((p) => ({ ...p, hand: [] })),
            communityCards: [],
          });
        }
        return next;
      });
      socket.emit(Actions.GET_PLAYER_CARDS, tableId);
    });
    socket.on(Actions.SHOWDOWN, handleUpdateTable(Actions.SHOWDOWN));
    socket.on(Actions.GAME_LOG, handleGameLog);

    return () => {
      [
        Actions.GET_TABLE,
        Actions.BET,
        Actions.FOLD,
        Actions.CALL,
        Actions.RAISE,
        Actions.CHECK,
        Actions.JOIN,
        Actions.LEAVE,
        Actions.GET_PLAYER_CARDS,
        Actions.ASK_FOR_CARDS,
        Actions.ALL_TABLES,
        Actions.ALL_USER_TABLES,
        Actions.SET_PLAYER,
        Actions.SHOWDOWN,
        Actions.GAME_LOG,
      ].forEach((action) => socket.off(action));
    };
  }, [
    socket,
    handleUpdateTable,
    handleUpdatePlayers,
    getUserCards,
    handleGameLog,
    selectTable,
  ]);

  const handleLeave = useCallback(
    (id: string) => {
      if (!player) return;
      socket?.emit(Actions.LEAVE, { tableId: id, playerId: player?.id });
    },
    [player, socket]
  );

  const joinTable = useCallback(
    (tableId: string) => {
      socket?.emit(Actions.JOIN, { tableId, playerId: player?.id });
    },
    [player, socket]
  );

  const createTable = useCallback(() => {
    socket?.emit(Actions.CREATE_TABLE, player?.id);
  }, [player, socket]);

  const spawnBot = useCallback(async (tableId: string) => {
    await getAxiosInstance().post(`/bots/join/${tableId}`);
  }, []);

  const bet = useCallback(
    (tableId: string, amount: number) => {
      socket?.emit(Actions.BET, { tableId, amount });
    },
    [socket]
  );
  const call = useCallback(
    (tableId: string) => {
      socket?.emit(Actions.CALL, tableId);
    },
    [socket]
  );
  const raise = useCallback(
    (tableId: string, amount: number) => {
      socket?.emit(Actions.RAISE, { tableId, amount });
    },
    [socket]
  );
  const fold = useCallback(
    (tableId: string) => {
      socket?.emit(Actions.FOLD, tableId);
    },
    [socket]
  );
  const check = useCallback(
    (tableId: string) => {
      socket?.emit(Actions.CHECK, tableId);
    },
    [socket]
  );

  const actions = useMemo(
    () => ({
      bet,
      call,
      check,
      fold,
      raise,
    }),
    [bet, call, check, fold, raise]
  );

  return {
    player,
    userTables,
    userCards,
    gameLogs,
    createTable,
    handleLeave,
    tablesArray,
    joinTable,
    actions,
    spawnBot,
  };
};

import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Actions, Card, Player, Table } from "../types";
import { useSelector } from "react-redux";
import { rootUrl } from "../../../assets/res";
import { selectUser } from "../../../redux/user";

export const usePokerTable = () => {
  const user = useSelector(selectUser);
  const [socket, setSocket] = useState<Socket | undefined>();
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

  useEffect(() => {
    if (!user) return;

    const socket = io(rootUrl, {
      auth: {
        name: user.username,
      },
    });

    setSocket(socket);

    socket.on(Actions.SET_PLAYER, (player: Player) => {
      setPlayer(player);
    });
    socket.on(Actions.ALL_TABLES, (tables) => {
      setTablesArray(tables);
    });
    socket.on(Actions.ALL_USER_TABLES, (userTables) => {
      setUserTables(new Map(userTables));
    });
    socket.on(Actions.BET, handleUpdateTable(Actions.BET));
    socket.on(Actions.FOLD, handleUpdateTable(Actions.FOLD));
    socket.on(Actions.RAISE, handleUpdateTable(Actions.RAISE));
    socket.on(Actions.CALL, handleUpdateTable(Actions.CALL));
    socket.on(Actions.CHECK, handleUpdateTable(Actions.CHECK));
    socket.on(Actions.JOIN, handleUpdatePlayers);
    socket.on(Actions.LEAVE, handleUpdatePlayers);
    socket.on(Actions.GET_PLAYER_CARDS, getUserCards);
    socket.on(Actions.ASK_FOR_CARDS, (tableId) =>
      socket.emit(Actions.GET_PLAYER_CARDS, tableId)
    );
    socket.on(Actions.GET_TABLE, (data) => {
      console.log(data);
    });

    return () => {
      socket.close();
    };
  }, [user]);

  const handleUpdateTable = (action: Actions) => (table: Table) => {
    const position = userTables.get(table.id)?.currentPlayerPosition;
    if (position !== undefined && table.players[position]) {
      table.players[position].lastAction = action;
    }
    setUserTables(new Map(userTables.set(table.id, table)));
  };

  const handleUpdatePlayers = (table: Table, playerId: string) => {
    if (playerId === player?.id) return;
    handleUpdateTable(Actions.JOIN)(table);
  };

  const handleLeave = (id: string) => {
    if (!player) return;
    socket?.emit(Actions.LEAVE, { tableId: id, playerId: player?.id });
    window?.close();
  };

  const joinTable = (tableId: string) => {
    socket?.emit(Actions.JOIN, { tableId, playerId: player?.id });
  };

  const createTable = () => {
    socket?.emit(Actions.CREATE_TABLE, player?.id);
  };

  const getUserCards = ({
    tableId,
    hand,
  }: {
    tableId: string;
    hand: Card[];
  }) => {
    setUserCards(new Map(userCards.set(tableId, hand)));
  };

  const bet = (tableId: string, amount: number) => {
    socket?.emit(Actions.BET, { tableId, amount });
  };
  const call = (tableId: string) => {
    socket?.emit(Actions.CALL, tableId);
  };
  const raise = (tableId: string, amount: number) => {
    socket?.emit(Actions.RAISE, { tableId, amount });
  };
  const fold = (tableId: string) => {
    socket?.emit(Actions.FOLD, tableId);
  };
  const check = (tableId: string) => {
    socket?.emit(Actions.CHECK, tableId);
  };

  const actions = {
    bet,
    call,
    check,
    fold,
    raise,
  };

  return {
    player,
    userTables,
    userCards,
    createTable,
    handleLeave,
    tablesArray,
    joinTable,
    actions,
  };
};

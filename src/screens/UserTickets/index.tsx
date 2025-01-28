import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { faClasses } from "../../consts/res";
import { selectUser } from "../../redux/user";
import { getTickets } from "../../service";
import "./index.scss";

type betStatus = "won" | "lost" | "ongoing";
interface Ticket {
  ticket_id: string;
  bolletta_status: string;
  max_win: number;
  bet_import: number;
  tickets: {
    team_1: string;
    team_2: string;
    bet_status: betStatus;
    result: string;
    odd: number;
  }[];
}
export const UserTickets = () => {
  const [filtered, setFiltered] = useState<Ticket[]>();
  const [filter, setFilter] = useState<betStatus>("ongoing");
  const user = useSelector(selectUser);
  const filters: betStatus[] = ["ongoing", "lost", "won"];

  const filterTickets = useCallback(async () => {
    const res = await getTickets();
    if (res.data)
      setFiltered(
        res.data.filter(
          ({ bolletta_status }: Ticket) => bolletta_status === filter
        )
      );
  }, [filter]);

  useEffect(() => {
    filterTickets();
  }, [filterTickets]);

  return (
    <section className="flex-1 flex flex-col mb-8 items-center justify-center">
      <h1 className="tickets__title">{user.username} Tickets</h1>
      <div className="filter_buttons">
        {filters.map((i: betStatus) => (
          <button
            key={i}
            className={`mr-2 px-2 table__header__button${
              filter === i ? "--focused" : ""
            }`}
            onClick={() => setFilter(i)}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="tickets_container w-full py-8 md:p-16">
        {filtered?.map(
          ({ ticket_id, bolletta_status, max_win, bet_import, tickets }) => (
            <div className="tickets" key={ticket_id}>
              <table key={ticket_id} className={`tickets__item p-4`}>
                <caption className="tickets__caption">
                  <h4 className={`bet_item--${bolletta_status}`}>
                    {ticket_id}
                  </h4>
                </caption>
                <tbody className={` tickets__item__body--${bolletta_status}`}>
                  {tickets.map(
                    ({ team_1, team_2, bet_status, result, odd }, i) => (
                      <tr className="bet_item " key={i}>
                        <td className="px-4 py-1">{team_1}</td>
                        <td className="px-4 ">{team_2}</td>
                        <td className={`lg:px-4  bet_item--${bet_status}`}>
                          {result}
                        </td>
                        <td className={`lg:px-4 bet_item--${bet_status}`}>
                          [{odd}]
                        </td>
                        <td className={`lg:px-4 bet_item--${bet_status}`}>
                          <i className={faClasses[bet_status]}></i>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <div className="tickets__checkout grid grid-cols-2 w-full">
                <p className="pl-4 py-1">Import</p>
                <span className="pl-4 py-1">{bet_import} $</span>
                <p className="px-4 py-1">Potential win</p>
                <span className="pl-4 py-1">{max_win} $</span>
                <p className="px-4 py-1">Status</p>
                <span className="pl-4 py-1">{bolletta_status}</span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

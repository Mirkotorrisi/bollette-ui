import "./index.scss";
import { useEffect, useState } from "react";
import { getTickets } from "../../service";
import { useSelector } from "react-redux";
import { faClasses, colorClasses, colorNames } from "../../assets/res.json";
import { selectUser } from "../../redux/user";

interface Ticket {
  ticket_id: string;
  bolletta_status: string;
  max_win: number;
  bet_import: number;
  ticket: {
    team_1: string;
    team_2: string;
    bet_status: "won" | "lost" | "ongoing";
    result: string;
    odd: number;
  }[];
}
export const UserTickets = () => {
  const [filtered, setFiltered] = useState<[] | [Ticket] | null>();
  const user = useSelector(selectUser);

  const filterTickets = async (status: string) => {
    setFiltered(null);
    const res = await getTickets();
    if (res.data)
      setFiltered(
        res.data.filter(
          ({ bolletta_status }: Ticket) => bolletta_status === status
        )
      );
  };

  useEffect(() => {
    filterTickets("ongoing");
  }, []);

  return (
    <>
      <section className="tickets_component">
        <h1 className="login_title">{user.username} Tickets</h1>
        <div className="filter_buttons">
          {["ongoing", "lost", "won"].map((i) => (
            <button
              key={i}
              className={
                filtered && filtered[0]?.bolletta_status === i
                  ? "market_button_focused"
                  : "market_buttons_button"
              }
              onClick={() => filterTickets(i)}
            >
              {i}
            </button>
          ))}
        </div>
        <div className="tickets_container">
          {filtered?.map(
            ({ ticket_id, bolletta_status, max_win, bet_import, ticket }) => (
              <table
                key={ticket_id}
                className={`ticket_table--${bolletta_status}`}
              >
                <caption>
                  <h4 className={bolletta_status}>{ticket_id}</h4>
                </caption>
                <tbody>
                  {ticket.map(({ team_1, team_2, bet_status, result, odd }) => (
                    <tr className="bet_item">
                      <td>{team_1}</td> <td>{team_2}</td>
                      <td className={`bet_item--${bet_status}`}>{result}</td>
                      <td>[{odd}]</td>
                      <td className={`bet_item--${bet_status}`}>
                        <i className={faClasses[bet_status]}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tbody className="ticket_checkout">
                  <tr>
                    <td>IMPORT</td> <td>{bet_import} $</td>
                  </tr>
                  <tr>
                    <td>MAX WIN</td> <td>{max_win} $</td>
                  </tr>
                </tbody>
                <caption className={bolletta_status}>{bolletta_status}</caption>
              </table>
            )
          )}
        </div>
      </section>
    </>
  );
};

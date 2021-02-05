import React, { useEffect, useState } from "react";
import { getTickets } from "../service";
import { useSelector } from "react-redux";
import { faClasses, colorClasses, colorNames } from "../assets/res.json";
import Modal from "../components/Modal";

export const TicketsComponent = () => {
  const [filtered, setFiltered] = useState();
  const [modal, setmodal] = useState({ show: false, content: "" });
  const user = useSelector((state) => state.userReducer);

  const filterTickets = async (status) => {
    try {
      setFiltered();
      const res = await getTickets();
      setFiltered(
        res.data
          ? res.data?.filter(
              ({ bolletta_status }) => bolletta_status === status
            )
          : []
      );
    } catch (err) {
      if (err.response)
        setmodal({
          title: "ERROR",
          show: true,
          status: `${err.response.status}`,
          error: `${err.response.data}`,
        });
    }
  };

  useEffect(() => {
    filterTickets("ongoing");
  }, []);

  return (
    <>
      <Modal
        title={modal.title}
        displayModal={modal.show}
        maxwin={modal.maxwin}
        ticketId={modal.ticketId}
        account_sum={modal.account_sum}
        error={modal.error}
        status={modal.status}
        closeModal={() => setmodal({ show: false })}
      />
      <section className="tickets_component">
        <h1 className="login_title">{user.username} Tickets</h1>
        <div className="filter_buttons">
          {["ongoing", "lost", "won"].map((i) => {
            return (
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
            );
          })}
        </div>
        <div className="tickets_container">
          {filtered ? (
            filtered.map(
              ({ ticket_id, bolletta_status, max_win, bet_import, ticket }) => {
                return (
                  <table
                    key={ticket_id}
                    className="ticket_table"
                    style={{ borderColor: colorNames[bolletta_status] }}
                  >
                    <caption>
                      <h4 className={bolletta_status}>{ticket_id}</h4>
                    </caption>
                    <tbody>
                      {ticket.map(
                        ({ team_1, team_2, bet_status, result, odd }) => {
                          return (
                            <tr className="bet_item">
                              <td>{team_1}</td> <td>{team_2}</td>
                              <td className={colorClasses[bet_status]}>
                                {result}
                              </td>
                              <td>[{odd}]</td>
                              <td className={colorClasses[bet_status]}>
                                <i className={faClasses[bet_status]}></i>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                    <tbody className="ticket_checkout">
                      <tr>
                        <td>IMPORT</td> <td>{bet_import} $</td>
                      </tr>
                      <tr>
                        <td>MAX WIN</td> <td>{max_win} $</td>
                      </tr>
                    </tbody>
                    <caption className={bolletta_status}>
                      {bolletta_status}
                    </caption>
                  </table>
                );
              }
            )
          ) : (
            <i className="fas fa-futbol infinite"></i>
          )}
        </div>
      </section>
    </>
  );
};

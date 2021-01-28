import React from "react";
import { RemoveUser } from "../redux/actions";
const Modal = (props) => {
  if (props.error?.includes("Log in")) {
    RemoveUser();
  }
  let divStyle = {
    display: props.displayModal ? "block" : "none",
  };
  const closeModal = (e) => {
    if (props.status == 401) {
      window.location.href = "/login";
    }
    e.stopPropagation();

    props.closeModal();
  };
  return (
    <div className="modal" onClick={closeModal} style={divStyle}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h5 className="close" onClick={closeModal}>
          &times;
        </h5>
        <h2>{props.title}</h2>
        <div className="modal_content">
          {!props.error && (
            <>
              {props.maxwin && (
                <p>
                  Max win <span>{props.maxwin}</span>$
                </p>
              )}
              {props.ticketId && (
                <p>
                  Ticket id <span>{props.ticketId}</span>
                </p>
              )}
              {props.account_sum && (
                <p>
                  Your balance <span>{props.account_sum}</span>$
                </p>
              )}
            </>
          )}
          {props.error && (
            <>
              <h4 className="modal_error_status">{props.status}</h4>
              <p>{props.error}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;

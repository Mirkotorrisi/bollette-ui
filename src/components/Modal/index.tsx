import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { hideModal, selectModal } from "../../redux/modals";
import { logOut } from "../../redux/user";
import { useAppDispatch } from "../../store";
import "./index.scss";

const Modal = () => {
  const modal = useSelector(selectModal);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { error, status, show, title, maxWin, ticket_id, account_sum } = modal;

  const closeModal = (e: { stopPropagation: () => void }) => {
    if (status === 401) {
      history.replace("/login");
      dispatch(logOut());
    }
    dispatch(hideModal());
    e.stopPropagation();
  };
  return (
    <div className={`modal ${show ? "fixed" : "hidden"}`} onClick={closeModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h5 className="close" onClick={closeModal}>
          &times;
        </h5>
        <h2 className="px-4 modal__title">{title || "Bet Placed"}</h2>
        <div className="modal_content flex flex-col gap-4">
          {maxWin && ticket_id && (
            <h4 className="modal__error-status">
              <i className="fas fa-futbol"></i>
            </h4>
          )}

          {maxWin && (
            <p className="modal__paragraph mt-12 mx-auto">Max win: {maxWin}$</p>
          )}
          {ticket_id && (
            <p className="modal__paragraph mx-auto">Ticket id: {ticket_id}</p>
          )}
          {account_sum && (
            <p className="modal__paragraph mx-auto">
              Your balance: {account_sum}$
            </p>
          )}
          {error && (
            <>
              <h4 className="modal__error-status">{status}</h4>
              <p className="modal__paragraph mt-12 mx-auto">{error}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;

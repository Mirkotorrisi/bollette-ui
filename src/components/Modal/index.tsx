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
    <div className={`modal--${show ? "show" : "hide"}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h5 className="close" onClick={closeModal}>
          &times;
        </h5>
        <h2>{title}</h2>
        <div className="modal_content">
          {!error && (
            <>
              {maxWin && (
                <p>
                  Max win <span>{maxWin}</span>$
                </p>
              )}
              {ticket_id && (
                <p>
                  Ticket id <span>{ticket_id}</span>
                </p>
              )}
              {account_sum && (
                <p>
                  Your balance <span>{account_sum}</span>$
                </p>
              )}
            </>
          )}
          {error && (
            <>
              <h4 className="modal_error_status">{status}</h4>
              <p>{error}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;

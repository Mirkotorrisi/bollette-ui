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
    <div className={` modal ${show ? "fixed" : "hidden"}`} onClick={closeModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h5 className="close" onClick={closeModal}>
          &times;
        </h5>
        <h2 className="modal__title">{title}</h2>
        <div className="modal_content flex flex-col gap-4">
          {!error && (
            <>
              {maxWin && (
                <p className="modal__paragraph mt-12 mx-auto">
                  Max win <span>{maxWin}</span>$
                </p>
              )}
              {ticket_id && (
                <p className="modal__paragraph mt-12 mx-auto">
                  Ticket id <span>{ticket_id}</span>
                </p>
              )}
              {account_sum && (
                <p className="modal__paragraph mt-12 mx-auto">
                  Your balance <span>{account_sum}</span>$
                </p>
              )}
            </>
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

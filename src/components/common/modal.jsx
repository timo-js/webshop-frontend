import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

const Modal = ({
  modalTitle,
  modalBody,
  onModalTriggered,
  modalTriggered,
  onSafe,
  safeButton,
}) => {
  const nodeRef = useRef(null);

  return (
    <React.Fragment>
      <div
        className="modal modal-customBackdrop"
        style={{
          display: modalTriggered ? "block" : "none",
        }}
      >
        <CSSTransition
          in={modalTriggered}
          nodeRef={nodeRef}
          timeout={300}
          classNames="offcanvas"
          unmountOnExit
        >
          <div ref={nodeRef} className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onModalTriggered}
                ></button>
              </div>
              <div className="modal-body">
                <span>{modalBody}</span>
              </div>
              {safeButton && (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={onSafe}
                  >
                    {safeButton}
                  </button>
                </div>
              )}
            </div>
          </div>
        </CSSTransition>
      </div>
    </React.Fragment>
  );
};

export default Modal;

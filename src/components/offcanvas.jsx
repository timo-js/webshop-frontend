import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../animations.css";

const Offcanvas = ({ counter, show, close, loggedIn }) => {
  const nodeRef = useRef(null);

  return (
    <React.Fragment>
      <CSSTransition
        in={show}
        nodeRef={nodeRef}
        timeout={300}
        classNames="offcanvas"
        unmountOnExit
      >
        <div
          ref={nodeRef}
          style={{
            position: "absolute",
            zIndex: 100,
            height: "100%",
            minWidth: "350px",
            backgroundColor: "white",
            padding: "1em 2em",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <button
              type="button"
              className="btn-close btn-lg mb-3"
              onClick={close}
            ></button>
            <h5 className="modal-title">Navigation</h5>
            <div className="modal-body">
              {loggedIn ? (
                <>
                  <Link
                    to="/article"
                    className="btn btn-light mb-3"
                    style={{ width: "100%", backgroundColor: "#ced4da" }}
                    onClick={close}
                  >
                    Artikel
                  </Link>
                  <Link
                    to="/shoppingcart"
                    className="btn btn-light"
                    style={{ width: "100%", backgroundColor: "#ced4da" }}
                    onClick={close}
                  >
                    Warenkorb{" "}
                    {counter > 0 && (
                      <span className="badge rounded-pill bg-secondary">
                        {counter}
                      </span>
                    )}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-light mb-3"
                    style={{ width: "100%", backgroundColor: "#ced4da" }}
                    onClick={close}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
      <div
        style={{
          position: "absolute",
          display: show ? "block" : "none",
          zIndex: 99,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,.5)",
        }}
        onClick={close}
      ></div>
    </React.Fragment>
  );
};

export default Offcanvas;

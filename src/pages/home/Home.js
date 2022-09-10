import React, { useState, useEffect, useRef, useContext } from "react";
import IdleTimer from "react-idle-timer";
import { LookupContext } from "../../context/data/LookupContext";
import { LiveEditContext } from "../../context/translation/LiveEditContext";

import Header from "../../components/header/Header";
import { navigate } from "@reach/router";
import TimeoutModal from "../../components/timeoutModal/TimeoutModal";
import { TIME, FULLPATH_TO, LK } from "../../utils/constants";
import { getI18n } from "../../i18n";

const Home = props => {
  const { lookupAction } = useContext(LookupContext);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const { getLiveEditState } = useContext(LiveEditContext);

  useEffect(() => {
    lookupAction({ method: "refresh", type: LK.HITCAT });
    lookupAction({ method: "refresh", type: LK.COUNTRY });
    lookupAction({ method: "refresh", type: LK.CARRIER });
    lookupAction({ method: "refresh", type: LK.AIRPORT });
    lookupAction({ method: "refresh", type: LK.CCTYPE });
    lookupAction({ method: "refresh", type: LK.ROLE });
    lookupAction({ method: "refresh", type: LK.NOTETYPE });

    const loaded = getLiveEditState().dataloaded;

    if (!loaded) {
      getI18n();
    }
  }, []);

  const idleTimer = useRef(null);

  const onAction = e => {
    // if (!idleTimer?.current) return;
    // console.log("onAction - time remaining", idleTimer.current.getRemainingTime());
  };

  const onActive = e => {
    // if (!idleTimer?.current) return;
    // console.log("time remaining", idleTimer.current.getRemainingTime());
  };

  const onIdle = e => {
    if (!idleTimer) return;
    // console.log("last active", new Date(idleTimer.current.getLastActiveTime()));

    idleTimer.current.pause();
    toggleModal();
  };

  const reset = () => {
    if (!idleTimer) return;

    setShowTimeoutModal(false);
    idleTimer.current.reset();
  };

  const logout = () => {
    navigate(FULLPATH_TO.LOGIN);
  };

  const toggleModal = () => {
    setShowTimeoutModal(!showTimeoutModal);
  };

  useEffect(() => {
    if (!idleTimer.current) return;
    idleTimer.current.reset();
  }, []);

  const activeEvents = [
    "keydown",
    "wheel",
    "DOMMouseScroll",
    "mousewheel",
    "mousedown",
    "touchstart",
    "touchmove",
    "MSPointerDown",
    "MSPointerMove",
    "visibilitychange"
  ];

  return (
    <div>
      <Header></Header>
      <IdleTimer
        ref={idleTimer}
        element={document}
        onActive={onActive}
        onIdle={onIdle}
        onAction={onAction}
        debounce={250}
        timeout={TIME.MINUTE_25}
        events={activeEvents}
      />
      {showTimeoutModal && (
        <TimeoutModal
          idleTime={() => idleTimer.current.getLastActiveTime()}
          show={showTimeoutModal}
          reset={reset}
          logout={logout}
        ></TimeoutModal>
      )}
      {props.children}
    </div>
  );
};

export default Home;

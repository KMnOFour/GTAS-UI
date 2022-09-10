
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "./Seat.scss";
import { hasData } from "../../../utils/utils";
import SeatInfoModal from "./SeatInfoModal";

const Seat = ({ seatInfo, selected, className, seatNumber }, ref) => {
  const reserved = hasData(seatInfo);
  const [showModal, setShowModal] = useState(false);
  const selectedSeatClass = selected ? "selected-seat" : "";
  const hasHitClass = seatInfo?.hasHits ? "has-hit" : "";
  return (
    <>
      <Button
        ref={ref}
        variant="light"
        className={`seat ${selectedSeatClass} ${hasHitClass} ${className}`}
        disabled={!reserved}
        onClick={() => setShowModal(true)}
      >
        {seatNumber}
      </Button>
      <SeatInfoModal
        seatInfo={seatInfo}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};
Seat.propTypes = {
  seatNumber: PropTypes.string,
  seatInfo: PropTypes.any,
  selected: PropTypes.bool,
  className: PropTypes.string
};

const forwardedSeat = React.forwardRef(Seat);
export default forwardedSeat;

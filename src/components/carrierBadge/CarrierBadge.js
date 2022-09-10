
import React from "react";
import { hasData } from "../../utils/utils";
import LazyImage from "../lazyImage/LazyImage";
import { LK } from "../../utils/constants";
import "./CarrierBadge.scss";

const CarrierBadge = props => {
  const src = props.src;

  if (!hasData(src)) return <></>;

  return (
    <div className="carrier-badge">
      <LazyImage val={src} type={LK.CARRIER} size="45"></LazyImage>
    </div>
  );
};

export default CarrierBadge;

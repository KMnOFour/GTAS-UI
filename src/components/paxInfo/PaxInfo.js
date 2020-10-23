import React from "react";
import FlightBadge from "../flightBadge/FlightBadge";
import { Table } from "react-bootstrap";
import { hasData } from "../../utils/utils";
import "./PaxInfo.scss";

const PaxInfo = props => {
  const pax = props.pax || [];
  const badgeprops = props.badgeprops || {};

  const tableRows = pax.reduce((acc, { label, value }) => {
    //don't display label with a null value (a good example is last apis/pnr recieved)
    if (hasData(value)) {
      const row = (
        <tr key={label.props?.xid} className="pax-info-row">
          <td className="left-label">{label}</td>
          <td className="right-label">{value}</td>
        </tr>
      );
      acc.push(row);
    }
    return acc;
  }, []);

  return (
    <>
      <FlightBadge {...badgeprops}></FlightBadge>
      <Table size="sm" borderless>
        <tbody>{tableRows}</tbody>
      </Table>
    </>
  );
};

export default PaxInfo;

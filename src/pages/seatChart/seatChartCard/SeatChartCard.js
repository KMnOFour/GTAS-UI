
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";

const SeatChartCard = props => {
  return (
    <Container className="m-1">
      {props.data &&
        props.data?.map((item, index) => (
          <Row key={index}>
            <Col>
              <b>{item.label}:</b>
            </Col>
            <Col>
              <LabelledInput alt="Flight" inputtype="label" inputval={item.value} />
            </Col>
          </Row>
        ))}

      <div>{props.link}</div>
    </Container>
  );
};

export default SeatChartCard;

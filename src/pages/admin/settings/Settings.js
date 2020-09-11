import React from "react";
import { settingsinfo } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { Container, Col } from "react-bootstrap";
import Title from "../../../components/title/Title";

const Settings = ({ name }) => {
  const onChange = (status, result) => {};
  const cb = function() {};

  return (
    <Container fluid>
      <Title title="Settings"></Title>
      <br></br>
      <Container>
        <Col lg={{ span: 4, offset: 4 }}>
          <Form
            getService={settingsinfo.get}
            submitService={settingsinfo.put}
            callback={onChange}
            title=""
            action="edit"
            shouldConfirm={true}
          >
            <LabelledInput
              datafield
              labelText="Matching Threshold"
              inputType="number"
              name="matchingThreshold"
              callback={cb}
              alt="nothing"
            />
            <LabelledInput
              datafield
              labelText="Maximum Passenger Query Results"
              inputType="number"
              name="maxPassengerQueryResult"
              callback={cb}
              alt="nothing"
            />
            <LabelledInput
              datafield
              labelText="Maximum Flight Query Results"
              inputType="number"
              name="maxFlightQueryResult"
              callback={cb}
              alt="nothing"
            />
            <LabelledInput
              datafield
              labelText="Maximum Rule Hits Allowed Per Run on Rule"
              inputType="number"
              name="maxRuleHit"
              callback={cb}
              alt="nothing"
            />
            <LabelledInput
              datafield
              labelText="APIS Only Flag"
              inputType="select"
              options={[
                { value: "TRUE", label: "TRUE" },
                { value: "FALSE", label: "FALSE" }
              ]}
              name="apisOnlyFlag"
              callback={cb}
              alt="nothing"
            />
          </Form>
        </Col>
      </Container>
    </Container>
  );
};

export default Settings;

import React, { useEffect, useState } from "react";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import { loaderStats } from "../../../services/serviceWrapper";
import { Container, Col } from "react-bootstrap";
import Title from "../../../components/title/Title";
import { hasData, localeDate } from "../../../utils/utils";

const LoaderStats = ({ name }) => {
  const cb = function(result) {};
  const onChange = function(result) {};
  const [data, setData] = useState();
  const [key, setKey] = useState(0);

  useEffect(() => {
    loaderStats.get().then(res => {
      const parsedData = {
        ...res,
        lastMessageAnalyzedByDrools: localeDate(res?.lastMessageAnalyzedByDrools),
        lastMessageInSystem: localeDate(res?.lastMessageInSystem),
        mostRecentRuleHit: localeDate(res?.mostRecentRuleHit)
      };
      setData(parsedData);
      setKey(key + 1);
    });
  }, []);

  return (
    <Container fluid>
      <Title title={<Xl8 xid="ls001">Loader Statistics</Xl8>}></Title>
      <br></br>
      <Container>
        <Col lg={{ span: 4, offset: 4 }}>
          <Form
            data={data}
            key={key}
            title=""
            callback={cb}
            submitText={<Xl8 xid="ls008">Refresh</Xl8>}
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls004">Last message received:</Xl8>}
              inputType="text"
              name="lastMessageInSystem"
              alt="Last message received"
              readOnly
              callback={onChange}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls002">Last message analyzed:</Xl8>}
              inputType="text"
              name="lastMessageAnalyzedByDrools"
              callback={onChange}
              readOnly
              alt="Last message analyzed"
            />
            <LabelledInput
              datafield
              labelText={
                <Xl8 xid="ls003">Most recent rule hit (Partial excluded) timestamp:</Xl8>
              }
              inputType="text"
              name="mostRecentRuleHit"
              callback={onChange}
              readOnly
              alt="Most recent rule hit (Partial excluded) timestamp"
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls005">Passengers Count from past 500 messages:</Xl8>}
              inputType="text"
              name="passengerCount"
              callback={onChange}
              readOnly
              alt="Passengers Count from past 500 messages"
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls006">Loading/Parsing errors past 500 messages:</Xl8>}
              inputType="text"
              name="totalLoadingParsingErrors"
              callback={onChange}
              readOnly
              alt="Loading/Parsing errors past 500 messages"
            />

            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls007">Rule errors last 500 messages:</Xl8>}
              inputType="text"
              name="totalRuleErros"
              callback={onChange}
              readOnly
              alt="Rule errors last 500 messages"
            />
          </Form>
        </Col>
      </Container>
    </Container>
  );
};

export default LoaderStats;

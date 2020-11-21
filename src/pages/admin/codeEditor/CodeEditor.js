import React, { useState, useEffect } from "react";
import Title from "../../../components/title/Title";
import Main from "../../../components/main/Main";
import Xl8 from "../../../components/xl8/Xl8";
import { Tabs, Tab } from "react-bootstrap";
import { navigate } from "@reach/router";
import { getEndpoint } from "../../../utils/utils";

import "./CodeEditor.css";

const CodeEditor = props => {
  const endpoint = getEndpoint(props.location?.pathname);
  const startTab = endpoint === "codeeditor" ? "country" : endpoint;
  const tabcontent = props.children.props.children;
  const [tab, setTab] = useState(startTab);

  function tabHandler(ev) {
    const tabname = ev
      .split("-")
      .pop()
      .toLowerCase();

    setTab(tabname);
  }

  useEffect(() => {
    navigate(`/gtas/admin/codeeditor/${tab}`);
  }, [tab]);

  const headerTabs = (
    <Tabs defaultActiveKey="country" id="codeTabs" className="gtas-tabs">
      <Tab
        eventKey="country"
        title={
          <Xl8 xid="app022" id="codeTabs-tab-country">
            Country
          </Xl8>
        }
      ></Tab>
      <Tab
        eventKey="airport"
        title={
          <Xl8 xid="app023" id="codeTabs-tab-airport">
            Airport
          </Xl8>
        }
      ></Tab>
      <Tab
        eventKey="carrier"
        title={
          <Xl8 xid="app024" id="codeTabs-tab-carrier">
            Carrier
          </Xl8>
        }
      ></Tab>
      <Tab
        eventKey="cctype"
        title={
          <Xl8 xid="app035" id="codeTabs-tab-cctype">
            Credit Card Type
          </Xl8>
        }
      ></Tab>
    </Tabs>
  );

  let tabMap = {};
  tabcontent.forEach(function(tab) {
    tabMap[tab.props.path] = tab.props.name;
  });

  return (
    <Main className="full bg-white">
      <Title
        title={<Xl8 xid="app020">Code Editor</Xl8>}
        leftChild={headerTabs}
        leftCb={tabHandler}
        style="stacker title"
      />
      <div className="grid-container">{props.children}</div>
    </Main>
  );
};

export default CodeEditor;

import React from "react";
import Table from "../../../components/table/Table";
import { users } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";

const QuickQuery = () => {
  const cb = () => {};

  return (
    <div className="container">
      <Title title="QuickQuery"></Title>

      <div className="columns">
        <div className="top">
          <Table service={users.get.getAllNonArchived} id="foo" callback={cb}></Table>
        </div>
      </div>
    </div>
  );
};

export default QuickQuery;

import React from "react";
import { Table, Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import "./sale.scss";

export function Sale() {
  return (
    <div className="sale-container">
      <div className="add-sale-button">
        <Button variant="primary">
          <AiOutlinePlus />
          New item
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>番号</th>
            <th>ID</th>
            <th>割引コード</th>
            <th>コード数</th>
            <th>割引額</th>
            <th>最小額</th>
            <th>開始時間</th>
            <th>アクション</th>
          </tr>
        </thead>
        {/*  */}
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>none</td>
            <td>none</td>
            <td>none</td>
            <td>none</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>none</td>
            <td>none</td>
            <td>none</td>
            <td>none</td>
          </tr>
          {/*  */}
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>none</td>
            <td>none</td>
            <td>none</td>
            <td>none</td>
            <td>none</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

const mockdata = {};

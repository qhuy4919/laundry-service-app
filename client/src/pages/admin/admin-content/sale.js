import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from "react-icons/ai";

import "./sale.scss";

export function Sale() {
  const [discountData, setdiscountData] = useState(mockData);
  return (
    <div className="sale-container">
      <div className="add-sale-button">
        <Button variant="primary">
          <AiOutlinePlus />
          New item
        </Button>
      </div>
      <Table striped bordered hover responsive="lg" className="sale-table">
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
          {(discountData ?? []).map((item, index) => (
            <tr key={index.toString()}>
              <td>{index}</td>
              <td>{item.id}</td>
              <td>{item.code}</td>
              <td>{item.amount}</td>
              <td>{item.percent}</td>
              <td>{item.min_percent}</td>
              <td>{item.create_date}</td>
              <td className="sale-action">
                <button className="update button">
                  <AiFillEdit />
                  update
                </button>
                <button className="delete button">
                  <AiFillDelete />
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
const mockData = [
  {
    id: "001",
    code: "abcxyz001",
    amount: 100,
    percent: "20%",
    min_percent: "5%",
    create_date: "10/10/2022",
  },
  {
    id: "002",
    code: "abcxyz001",
    amount: 100,
    percent: "20%",
    min_percent: "5%",
    create_date: "10/10/2022",
  },
  {
    id: "003",
    code: "abcxyz001",
    amount: 100,
    percent: "20%",
    min_percent: "5%",
    create_date: "10/10/2022",
  },
  {
    id: "004",
    code: "abcxyz001",
    amount: 100,
    percent: "20%",
    min_percent: "5%",
    create_date: "10/10/2022",
  },
  {
    id: "005",
    code: "abcxyz001",
    amount: 100,
    percent: "20%",
    min_percent: "5%",
    create_date: "10/10/2022",
  },
];

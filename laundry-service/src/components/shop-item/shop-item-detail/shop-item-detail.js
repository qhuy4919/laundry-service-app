import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { Query } from "../../../api/query-api";
import { Spinner } from "react-bootstrap";

import "./shop-item-detail.scss";

export function ShopItemDetail(props) {
  const { categoryId } = props;
  const [itemList, setItemList] = useState(DATA[categoryId]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItemList(DATA[categoryId]);
  }, [categoryId]);

  // useEffect(() => {
  //   const fetchItemList = async () => {
  //     try {
  //       const response = await Query.item.list({ categoryId });
  //       if (response) {
  //         setItemList(response);
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.log("fetch item list fail");
  //     }
  //   };
  //   fetchItemList();
  // }, [categoryId]);

  return (
    <div className="item-list-container">
      {isLoading ? (
        <div className="spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="item-list-header">
            <p>カテゴリ {categoryId}</p>
          </div>
          <div className="item-list__card">
            {itemList.map((item, index) => (
              <div key={index} className="item-card">
                <div className="left">
                  <div className="card-info">
                    <h2>{item.item_name}</h2>
                  </div>
                  <Accordion className="card-content">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>説明</Accordion.Header>
                      <Accordion.Body>
                        Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh
                        Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc
                        đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!!
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <div className="card-price">
                    <p>Price: </p>
                    <div className="item-price">
                      <p>{item.item_price} đồng</p>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div>
                    <AiOutlinePlus className="plus-icon" />
                    <p>追加</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const DATA = [
  [
    {
      item_name: "Giặt đặc biệt",
      item_price: "69,000 VNĐ",
    },
  ],
  [
    {
      item_name: "Giặt nhẹ",
      item_price: "10,000 VNĐ",
    },
    {
      item_name: "Giặt vừa",
      item_price: "15,000 VNĐ",
    },
  ],
  [
    {
      item_name: "Giặt tất 1 chiéc",
      item_price: "5,000 VNĐ",
    },
    {
      item_name: "Giặt tất 3 chiếc",
      item_price: "13,000 VNĐ",
    },
  ],
];

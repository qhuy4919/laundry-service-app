import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { Query } from "../../../api/query-api";
import { Spinner } from "react-bootstrap";

import "./shop-item-detail.scss";

export function ShopItemDetail(props) {
  const { categoryId } = props;
  const [itemList, setItemList] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const response = await Query.item.list({ categoryId });
        if (response) {
          setItemList(response);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("fetch item list fail");
      }
    };
    fetchItemList();
  }, [categoryId]);
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
          <div className="item-list-header">カテゴリ1</div>
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
                        đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh
                        rứa bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa
                        bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa
                        bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa
                        bây!!!!Anh Phúc đỉnh rứa bây!!!!
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

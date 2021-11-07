import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { itemListSelector, addToCart } from "../../../store/itemSlice";

import "./shop-item-detail.scss";

function getItemById(itemList, itemId) {
  const res = itemList.filter((i) => {
    return i.item_id == itemId;
  });
  return res[0];
}
export function ShopItemDetail(props) {
  const { categoryId, categoryItem } = props;
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemInCart = useSelector(itemListSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    if (categoryItem)
      setItemList(categoryItem.items);
  }, [categoryId]);

  function addItem(itemId) {
    const chossenItem = getItemById(categoryItem.items, itemId);
    dispatch(addToCart(chossenItem));
  }

  return (
    <div className="item-list-container">
      {isLoading ? (
        <div className="spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
          itemList.length === 0
          ?
          <>
            <div className="item-list-header">
              <p>カテゴリ {categoryId}</p>
            </div>
            <div className="item-list__card-empty">
              このカテゴリはアイテムがありません
            </div>
          </>
          :
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
                      <span className="item-price-trans">Price:</span>
                      <span className="item-price currency_vnd"> {item.item_price} </span>
                    </div>
                  </div>
                  <div className="right" onClick={() => addItem(item.item_id)}>
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

// const DATA = [
//   [
//     {
//       item_name: "Giặt đặc biệt",
//       item_price: "69,000 VNĐ",
//     },
//   ],
//   [
//     {
//       item_name: "Giặt nhẹ",
//       item_price: "10,000 VNĐ",
//     },
//     {
//       item_name: "Giặt vừa",
//       item_price: "15,000 VNĐ",
//     },
//   ],
//   [
//     {
//       item_name: "Giặt tất 1 chiéc",
//       item_price: "5,000 VNĐ",
//     },
//     {
//       item_name: "Giặt tất 3 chiếc",
//       item_price: "13,000 VNĐ",
//     },
//   ],
// ];

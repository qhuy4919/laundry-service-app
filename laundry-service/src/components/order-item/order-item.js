import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { itemListSelector } from "../../store/itemSlice";
import "./order-item.scss";
export function OrderItem() {
  const addToCartItem = useSelector(itemListSelector);
  const [orderItemList, setItemOrderList] = useState([]);
  useEffect(() => {
    setItemOrderList(Object.keys(addToCartItem.item));
  }, [addToCartItem]);
  console.log(addToCartItem);
  console.log(orderItemList);
  return (
    <div>
      <Table borderless hover responsive>
        <thead>
          <tr>
            <th>サービス名</th>
            <th>価格</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody>
          {orderItemList.length > 0 &&
            orderItemList.map((element) => (
              <tr key={element}>
                <td>
                  <p className="description">
                    {addToCartItem.item[element].detail.item_name}
                  </p>
                </td>
                <td id="price">$24.99</td>
                <td>
                  <div className="counter">
                    <input
                      id="qty"
                      value="0"
                      value={addToCartItem.item[element].count}
                    />
                  </div>
                </td>
              </tr>
            ))}
          {/* <tr>
            <td>
              <p className="description">Giặt nhanh</p>
            </td>
            <td id="price">$24.99</td>
            <td>
              <div className="counter">
                <input id="qty" value="0" />
              </div>
            </td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
}

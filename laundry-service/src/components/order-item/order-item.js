import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { itemListSelector } from "../../store/itemSlice";
import { Link } from "react-router-dom";
import { ITEM_IN_CART } from "../../const/local-storage-key";

import "./order-item.scss";
export function OrderItem(props) {
  // Fix case where OrderItem is in another form, which is invalid HTML
  console.log("Outer:", props);
  return (
    <form action="" className="order-list">
      <OrderItemInner props={props} />
    </form>
  );
}

export function OrderItemInner(props) {
  // console.log("Inner:", props)
  const { closeNextButton, shopId } = props;
  const addToCartItem = useSelector(itemListSelector);
  const [orderItemList, setItemOrderList] = useState([]);
  const [totalAmmount, setTotalAmmount] = useState(null);

  useEffect(() => {
    setItemOrderList(Object.keys(addToCartItem.item));
    let total = 0;
    for (let key of Object.keys(addToCartItem.item)) {
      const tmp = addToCartItem.item[key];
      if (!isNaN(parseFloat(tmp.detail.item_price)))
        total += tmp.count * parseFloat(tmp.detail.item_price);
    }
    setTotalAmmount(total);
  }, [addToCartItem]);

  function saveChoosenItem() {
    localStorage.setItem(ITEM_IN_CART, JSON.stringify(addToCartItem.item));
  }
  // console.log('Inner', shopId)

  return (
    <>
      <Table
        borderless
        hover
        responsive
        style={{ borderBottom: "1px solid black" }}
      >
        <thead>
          {orderItemList.length > 0 ? (
            <tr>
              <th>サービス名</th>
              <th>価格</th>
              <th>数量</th>
            </tr>
          ) : (
            <></>
          )}
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
                <td id="price" className="currency_vnd">
                  {addToCartItem.item[element].detail.item_price}
                </td>
                <td>
                  <div className="counter">
                    <input
                      id="qty"
                      value={addToCartItem.item[element].count}
                      disabled
                    />
                  </div>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan="2">
              <input
                type="text"
                className="sale-code-input input"
                placeholder="割引コード"
              />
            </td>
            <td>
              <Button variant="secondary">Ok</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      {orderItemList.length === 0 ? (
        <p>現在カートにアイテムはありません</p>
      ) : (
        <>
          <div className="order-quantity">
            <>
              <span className="order-quantity__label">総量</span>
              <span className="order-quantity__value currency_vnd">
                {totalAmmount}
              </span>
            </>
          </div>
          {!closeNextButton && (
            <Link
              to={`/payment/`}
              onClick={() => saveChoosenItem()}
              className="submit-btn-row"
            >
              <Button variant="secondary" type="submit" className="submit-btn">
                次
              </Button>
            </Link>
          )}
        </>
      )}
    </>
  );
}

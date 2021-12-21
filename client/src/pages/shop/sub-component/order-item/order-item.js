import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { itemListSelector } from "../../../../store";
import { Link } from "react-router-dom";
import { ITEM_IN_CART, APPLIED_COUPON, SHOP_INFO } from "../../../../const/local-storage-key";

import { DiscountAPI } from "../../../../api/discount"

import "./order-item.scss";
export function OrderItem(props) {
  // Fix case where OrderItem is in another form, which is invalid HTML
  // console.log("Outer:", props);
  return (
    <form action="" className="order-list">
      <OrderItemInner props={props} />
    </form>
  );
}

export function OrderItemInner(props) {
  const { closeNextButton, shopId } = (props.props ? props.props : props);
  const addToCartItem = useSelector(itemListSelector);
  const [orderItemList, setItemOrderList] = useState([]);
  const [totalAmmount, setTotalAmmount] = useState(0.0);
  const [origTotalAmmount, setOTA] = useState(0.0);

  const tmp_coupon = (localStorage.getItem(APPLIED_COUPON) ? 
    JSON.parse(localStorage.getItem(APPLIED_COUPON)) :
    {percentage: 0.0});
  const [coupon, setCoupon] = useState( tmp_coupon );
  const [discountCode, setDiscountCode] = useState( tmp_coupon.discount_code ?? "" );

  const checkDiscountCode = async () => {
    if (! discountCode) {
      alert("Please input a coupon code");
      return false;
    }
    const res = await DiscountAPI.get(discountCode, origTotalAmmount);
    if (res && res.data && res.data.length > 0) {
      setCoupon(res.data[0]);
      alert("Applying Coupon ["+res.data[0].discount_code+"]");
      return true;
    } else {
      alert("No valid Coupon");
      return false;
    }
  }

  //
  useEffect(() => {
    setItemOrderList(Object.keys(addToCartItem.item));
    let total = 0;
    for (let key of Object.keys(addToCartItem.item)) {
      const tmp = addToCartItem.item[key];
      if (!isNaN(parseFloat(tmp.detail.item_price)))
        total += tmp.count * parseFloat(tmp.detail.item_price);
    }
    setOTA(total);
    if (coupon.percentage > 0.0) {
      total *= (1 - coupon.percentage);
    }
    setTotalAmmount(total);
  }, [addToCartItem, coupon]);

  function saveChoosenItem() {
    localStorage.setItem(ITEM_IN_CART, JSON.stringify(addToCartItem.item));
    localStorage.setItem(APPLIED_COUPON, JSON.stringify(coupon));
    localStorage.setItem(SHOP_INFO, JSON.stringify({shop_id : shopId}));
  }

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
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                required
              />
            </td>
            <td>
              <Button variant="secondary"
                onClick={(e) => checkDiscountCode()}
              >OK</Button>
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
                {totalAmmount.toFixed(2)}
              </span>
              { coupon.percentage > 0.0 ?
                <span className="order-quantity__coupon-off">
                  {`(-${(coupon.percentage*100).toFixed(2)}%)`}
                </span>
                :
                <></>
              }

              { coupon.percentage > 0.0 ?
                <p className="order-quantity__coupon-msg"
                >Currently using [{coupon.discount_code}] coupon</p> 
                : <></> 
              }
            </>
          </div>
          {!closeNextButton && (
            <>
            <Link
              to={`/payment/`}
              onClick={() => saveChoosenItem()}
              className="submit-btn-row"
            >
              <Button variant="secondary" type="submit" className="submit-btn">
                Next
              </Button>
            </Link>
            </>
          )}
        </>
      )}
    </>
  );
}

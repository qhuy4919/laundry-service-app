import {
  ShopItem,
  ShopInfo,
  ShopItemDetail,
  ShopFeedback,
  OrderItem,
} from "../../components/index";

import { Button } from "react-bootstrap";

import "./shop.scss";
export default function Shop() {
  return (
    <div className="shop-container">
      <div className="left-panel">
        <ShopInfo />
        <div className="shop-item">
          <div className="shop-item__title">
            <ShopItem />
          </div>
          <div className="shop-item__detail">
            <ShopItemDetail />
          </div>
        </div>
        <div className="shop-feedback">
          <ShopFeedback />
        </div>
      </div>
      <div className="right-panel">
        <div className="right-panel-header">ご注文</div>
        <div>
          <form action="" className="order-list">
            <OrderItem />
            <div className="order-quantity">
              <div className="order-quantity__label">総量</div>
              <div className="order-quantity__value">10</div>
            </div>
            <Button variant="secondary" type="submit" className="submit-btn">
              次
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

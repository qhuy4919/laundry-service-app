import {
  ShopItem,
  ShopInfo,
  ShopItemDetail,
  ShopFeedback,
} from "../../components/index";

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
      <div className="right-panel">ご注文</div>
    </div>
  );
}

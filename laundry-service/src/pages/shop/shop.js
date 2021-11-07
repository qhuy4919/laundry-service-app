import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ShopItem,
  ShopInfo,
  ShopItemDetail,
  ShopFeedback,
  OrderItem,
} from "../../components/index";
import { Query } from "../../api/query-api";
import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { itemListSelector } from "../../store/itemSlice";
import "./shop.scss";

export default function Shop() {
  const { id } = useParams();
  //mock_data
  const [shopInfor, setShopInfo] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const { itemInCart } = useSelector(itemListSelector);
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await Query.shop.item({ id });
        if (response) {
          setShopInfo(response.data);
          setIsloading(false);
        }
      } catch (error) {
        console.log("fetch fail");
      }
    };
    fetchShop();
  }, []);

  const handleFetchItem = (categoryId) => {
    setCategoryId(categoryId);
  };
  return (
    <div className="">
      {isLoading ? (
        <div className="spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="shop-container">
          <div className="left-panel">
            <ShopInfo Information={shopInfor} />
            <div className="shop-item">
              <div className="shop-item__title">
                <ShopItem
                  shopId={shopInfor.id}
                  categoryItem={shopInfor.categories}
                  handleFetchItem={handleFetchItem}
                />
              </div>
              <div className="shop-item__detail">
                {categoryId && (
                  <ShopItemDetail
                    categoryId={categoryId}
                    categoryItem={shopInfor.categories[categoryId - 1]}
                  />
                )}
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
                <Button
                  variant="secondary"
                  type="submit"
                  className="submit-btn"
                >
                  次
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

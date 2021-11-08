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
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getShopName } from "../../store/itemSlice";
import "./shop.scss";

export default function Shop() {
  const { id } = useParams();
  //mock_data
  const [shopInfor, setShopInfo] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await Query.shop.item({ id });
        if (response) {
          setShopInfo(response.data);
          setIsloading(false);
          dispatch(getShopName(response.data.shop_name));
        }
      } catch (error) {
        console.log(error);
        console.log("Fetch fail");
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
              {categoryId ? (
                <div className="shop-item__detail">
                  <ShopItemDetail
                    categoryId={categoryId}
                    categoryItem={shopInfor.categories[categoryId - 1]}
                  />
                </div>
              ) : (
                <div className="shop-item__none-selected">
                  ← カテゴリを1つ選択してください
                </div>
              )}
            </div>
            <div className="shop-feedback">
              <ShopFeedback />
            </div>
          </div>
          <div className="right-panel">
            <div className="right-panel-header">ご注文</div>
            <div>
              <OrderItem closeNextButton={false} shopId={shopInfor.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Query } from "../../api/query-api";
import { ShopItemDetail } from "../shop-item/shop-item-detail/shop-item-detail";
import "./shop-item.scss";
export function ShopItem(props) {
  const { shopId, handleFetchItem } = props;
  const [category, setCategory] = useState([
    {
      id: 0,
      shop_id: 1,
      category_name: "Normal Clothes",
    },
    {
      id: 1,
      shop_id: 1,
      category_name: "Sneaker",
    },
    {
      id: 2,
      shop_id: 1,
      category_name: "Jean",
    },
  ]);
  const [isLoading, setIsloading] = useState(false);
  const handleCategoryId = (categoryId) => {
    if (handleFetchItem) {
      handleFetchItem(categoryId);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await Query.category.list({ shopId });
        if (response) {
          setCategory(response);
          setIsloading(false);
        }
      } catch (error) {
        console.log("fetch category fail");
      }
    };
    fetchCategory();
  }, [shopId]);
  return (
    <>
      {!isLoading &&
        category.map((item, index) => (
          <div
            key={index}
            className="category-title"
            onClick={() => handleCategoryId(item.id)}
          >
            {item.category_name}
          </div>
        ))}
    </>
  );
}

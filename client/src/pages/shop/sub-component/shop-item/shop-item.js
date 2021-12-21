import { useState, useEffect } from "react";
import "./shop-item.scss";
export function ShopItem(props) {
  const { shopId, categoryItem, handleFetchItem } = props;
  // console.log("Shop-item@", categoryItem)

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
    try {
      setCategory(categoryItem);
    } catch (error) {
      console.log(error);
    }
  }, [shopId]);
  return (
    <>
      {!isLoading &&
        category.map((item, index) => (
          <div
            key={index}
            className="category-title"
            onClick={() => handleCategoryId(item.category_id)}
          >
            {item.category_name}
          </div>
        ))}
    </>
  );
}

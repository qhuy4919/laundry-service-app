import { useState } from "react";

import "./shop-item.scss";
export function ShopItem() {
  const [caterory, setCaterory] = useState([
    "カテゴリ1",
    "カテゴリ2",
    "カテゴリ3",
  ]);
  return (
    <>
      {caterory.map((item) => (
        <div className="category-title">{item}</div>
      ))}
    </>
  );
}

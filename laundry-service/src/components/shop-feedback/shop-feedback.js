import { useState } from "react";
import { ShopFeedbackDetail } from "./shop-feedback-detail/shop-feedback-detail";

import "./shop-feedback.scss";
export function ShopFeedback() {
  const [feedBack, setFeedbacl] = useState([
    {
      shop_name: "Txp",
      item_name: "giat do lot em gai",
      when: "12:00 pm",
      rating: 10,
    },
  ]);
  return (
    <div>
      <div className="feedback-header">フィードバック</div>
      <div className="feedback_detail">
        {feedBack.map((item) => (
          <ShopFeedbackDetail feedBack={item} />
        ))}
      </div>
    </div>
  );
}

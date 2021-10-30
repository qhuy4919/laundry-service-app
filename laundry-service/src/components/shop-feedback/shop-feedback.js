import { useState } from "react";
import { ShopFeedbackDetail } from "./shop-feedback-detail/shop-feedback-detail";

import "./shop-feedback.scss";
export function ShopFeedback() {
  const [feedBack, setFeedbacl] = useState([
    {
      user_name: "Tran Xuan Phuc",
      item_name: "giat do lot em gai",
      when: "12:00 pm",
      rating: 10,
      content: "Mong shop hãy giặt thật kỹ nhưng vẫn giữ lại mùi hương!!!!",
    },
  ]);
  return (
    <div>
      <div className="feedback-header">フィードバック</div>
      <div className="feedback-detail">
        {feedBack.map((item) => (
          <ShopFeedbackDetail feedBack={item} />
        ))}
      </div>
    </div>
  );
}

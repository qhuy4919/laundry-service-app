import { useState } from "react";
import { ShopFeedbackDetail } from "./shop-feedback-detail/";

import "./shop-feedback.scss";
export function ShopFeedback() {
  const [feedBack, setFeedback] = useState([
    {
      user_name: "txphuc",
      item_name: "普通洗濯",
      when: "12:00 pm",
      rating: 7,
      content: "とても速くてとてもきれいです、また戻ってきます。",
    },
    {
      user_name: "pvtanh",
      item_name: "色がなくなる洗濯",
      when: "15:09 pm",
      rating: 6,
      content:
        "私は今、たくさんの白いシャツを持っています。 ショップありがとうございます。",
    },
    {
      user_name: "ntd70",
      item_name: "普通洗濯",
      when: "08:31 pm",
      rating: 10,
      content:
        "とても良いサービス。 今年は現在70歳以上ですが、こんなものは見たことがありません。",
    },
  ]);
  return (
    <div>
      <div className="feedback-header">フィードバック</div>
      <div className="feedback-detail-container">
        {feedBack.map((item, index) => (
          <ShopFeedbackDetail key={index} feedBack={item} />
        ))}
      </div>
    </div>
  );
}

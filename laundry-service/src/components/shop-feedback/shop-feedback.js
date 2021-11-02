import { useState } from "react";
import { ShopFeedbackDetail } from "./shop-feedback-detail/shop-feedback-detail";

import "./shop-feedback.scss";
export function ShopFeedback() {
  const [feedBack, setFeedback] = useState([
    {
      user_name: "txphuc",
      item_name: "Giặt đồ lót",
      when: "12:00 pm",
      rating: 5,
      content: "Shop giặt rất kỹ nhưng vẫn giữ lại mùi hương!!!",
    },{
      user_name: "pvtanh",
      item_name: "Giặt trường sinh",
      when: "15:09 pm",
      rating: 10,
      content: "Từ khi giặt tại shop, mình đã có nhiều áo trắng hơn. Xin cảm ơn shop rất nhiều.",
    },{
      user_name: "ntd69",
      item_name: "Giặt thường",
      when: "11:31 pm",
      rating: 6,
      content: "Lúc gửi là quần 2 ống mà lúc nhận lại là quần 3 ống. Tôi năm nay hơn 69 tuổi rồi mà tôi chưa thấy trường hợp nào như trường hợp này",
    }
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

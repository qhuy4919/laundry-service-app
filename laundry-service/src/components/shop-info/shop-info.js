import { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineUpload } from "react-icons/ai";
import "./shop-info.scss";

export function ShopInfo(props) {
  // const { Information } = props;
  const [avatar, setAvatar] = useState(null);

  // useEffect(() => {
  //   if (Information) {
  //     setAvatar(Information.shop_profile_pic);
  //   }
  // }, [Information]);
  const Information = {
    "shop_address": "123 Nguyễn Lương Bằng, Đà Nẵng, Việt Nam",
    "working_time": "8h-20h ngày trong tuần, 9h-15h thứ 7",
    "shop_detail": "Giặt cực nhanh, giặt cực sạch, giặt bay màu",
    "follower": "97",
    "rating": "4.67"
  }

  return (
    <div className="shop-infor-container">
      <div className="avatar-container">
        <div className="avatar-wrapper">
          {avatar === null ? (
            <AiOutlineUser className="profile-pic" />
          ) : (
            <img className="profile-pic" src={`${process.env.REACT_APP_API_SERVER}/profile-pic/default.png`} />
          )}
          <div className="upload-button">
            <AiOutlineUpload className="fa-arrow-circle-up" />
          </div>
          <input className="file-upload" type="file" accept="image/*" />
        </div>
        {/* shop information panel */}
        <div className="shop-info">
          <div className="shop-info-name">Lightning Laundry Shop ⚡</div>
          <hr/>
          <div className="shop-info-details">
            {[
              ["shop_address", "ショップ住所"],
              ["working_time", "労働時間"],
              ["shop_detail", "ショップ説明"],
              ["follower", "フォロワー数"],
              ["rating", "レーティング"],
            ].map((item, index) => (
              <div className="shop-info__body" key={index}>
                <div className="shop-info__title">{item[1]}</div>
                <div className="shop-info__content">{Information[item[0]]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

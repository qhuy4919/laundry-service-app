import { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineUpload } from "react-icons/ai";
import "./shop-info.scss";

export function ShopInfo(props) {
  const { Information } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (Information) {
      setAvatar(Information.shop_profile_pic);
    }
  }, [Information]);
  return (
    <div className="shop-infor-container">
      <div className="avatar-container">
        <div className="avatar-wrapper">
          {avatar === null ? (
            <AiOutlineUser className="profile-pic" />
          ) : (
            <img className="profile-pic" src={avatar} />
          )}
          <div className="upload-button">
            <AiOutlineUpload className="fa-arrow-circle-up" />
          </div>
          <input className="file-upload" type="file" accept="image/*" />
        </div>
        <div className="avatar-name">Shop's name</div>
      </div>
      {/* shop information panel */}
      <div className="shop-info">
        {[
          ["shop_address", "ショップ住所"],
          ["working_time", "労働時間"],
          ["shop_detail", "ショップ説明"],
          ["follower", "フォロワー数"],
          ["rating", "レーティング"],
        ].map((item, index) => (
          <div className="shop-info__body" key={index}>
            <div className="shop-info__title">
              <p>{item[1]}</p>
            </div>
            <div className="shop-info__content">{Information[item[0]]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

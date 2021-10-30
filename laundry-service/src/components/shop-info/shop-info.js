import { useState } from "react";
import { AiOutlineUser, AiOutlineUpload } from "react-icons/ai";
import "./shop-info.scss";

export function ShopInfo() {
  const [avatar, setAvatar] = useState(null);
  return (
    <div className="shop-infor-container">
      <div className="avatar-container">
        <div className="avatar-wrapper">
          {avatar === null ? (
            <AiOutlineUser className="profile-pic" />
          ) : (
            <img className="profile-pic" src="" />
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
          "ショップ住所",
          "労働時間",
          "ショップ説明",
          "フォロワー数",
          "レーティング",
        ].map((item) => (
          <div className="shop-info__body">
            <div className="shop-info__title">
              <p>{item}</p>
            </div>
            <div className="shop-info__content">hiu</div>
          </div>
        ))}
      </div>
    </div>
  );
}

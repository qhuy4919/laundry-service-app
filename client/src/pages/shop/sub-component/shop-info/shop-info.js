import { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineUpload } from "react-icons/ai";
import { Card, Form } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import { AiFillSave } from "react-icons/ai";
import {MdOutlineChangeCircle} from 'react-icons/md'
import { CommandShopAvatar } from "../../../../api/shop";
import "./shop-info.scss";


export function ShopInfo(props) {
  var userData = JSON.parse(localStorage.getItem("signed_in_user_data")) || null; // TODO what if userData is null?
  if (userData){
    userData = userData.data.user
  }

  const shop_info = props.Information;
  const [avatar, setAvatar] = useState(null);
  const [selectFile, setSelectFile] = useState();

  useEffect(() => {
    if (shop_info) {
      setAvatar(shop_info.shop_profile_pic);
    }
  }, [shop_info]);


  const onChangeUploadFile = (e) => {
    setSelectFile(e.target.files[0]);
  };

  const handleUploadFile = () => {
    if (selectFile) {
      const formData = new FormData();
      formData.append("shop_pic", selectFile);
      const updateAvatar = async () => {
        const response = await CommandShopAvatar.avatar(formData, shop_info.id);
        if (response) {
          setAvatar(response.data);
          setSelectFile(null);
          window.location.reload();
        }
      };
      updateAvatar();
    } else {
      alert("Please select an image file");
      return false;
    }
  };

  return (
    <div className="shop-infor-container">
      <div className="avatar-container">
        <Card className="profile-pic clear-fix">
          <Card.Img
            src={`${process.env.REACT_APP_API_SERVER}/profile-pic/${avatar}`}
          />
        </Card>
        {
          userData && (userData.role === 'admin' || userData.id === shop_info.user_id) 
          &&
          <Form className="profile-pic-controll">
            <label htmlFor="apply" className="avatar-btn">
              <input
                type="file"
                name=""
                id="apply"
                accept="image/*"
                key={"file-upload" + (selectFile || "none")}
                onChange={(e) => onChangeUploadFile(e)}
              />
              {selectFile?<MdOutlineChangeCircle/>:<BsUpload/>}
            </label>
            {
              selectFile &&
              <label htmlFor="submitbtn" className="avatar-btn">
                <input
                  id="submitbtn"
                  type="button"
                  onClick={() => handleUploadFile()}
                />
                <AiFillSave />
              </label>
            }
          </Form>
        }
      </div>
      {/* shop information panel */}
      <div className="shop-info">
        <div className="shop-info-name">{shop_info.shop_name}</div>
        <hr />
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
              <div className="shop-info__content">
                {render_shop_info(shop_info[item[0]])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function render_shop_info(data) {
  if (!data)
    return (
      <span style={{ fontStyle: "italic", color: "lightgray" }}>利用不可</span>
    );
  if (typeof data !== "object") return <span>{data}</span>;

  return (
    <ul>
      {Object.keys(data).map((key) => (
        <li>
          {capitalize(key)}: {data[key]}
        </li>
      ))}
    </ul>
  );
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

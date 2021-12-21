import { useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Form } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import { AiFillSave } from "react-icons/ai";
import { MdOutlineChangeCircle } from "react-icons/md";
import { CommandProfile } from "../../../api/account/profile";
import "./sidebar.scss";

export function AdminSidebar(props) {
  const setTab = props.setTab;
  const user = props.user ?? tmpUser;
  console.log(user)
  const [avatar, setAvatar] = useState(profile.img);
  const [selectFile, setSelectFile] = useState();

  const onChangeUploadFile = (e) => {
    setSelectFile(e.target.files[0]);
  };

  const handleUploadFile = () => {
    if (selectFile) {
      const formData = new FormData();
      formData.append("profile_pic", selectFile);
      const updateAvatar = async () => {
        const response = await CommandProfile.avatar(formData);
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
    <div className="admin-sidebar">
      <div className="sidebar-header">
          <Card className="profile-pic clear-fix">
            <div className="admin-profile-section">
              <Card.Img
                src={`${process.env.REACT_APP_API_SERVER}/profile-pic/${user.profile_pic}`}
              />
              <Form className="avatar-upload-form">
                <label htmlFor="apply" className="avatar-btn">
                  <input
                    type="file"
                    name=""
                    id="apply"
                    accept="image/*"
                    key={"file-upload" + (selectFile || "none")}
                    onChange={(e) => onChangeUploadFile(e)}
                  />
                  {selectFile ? <MdOutlineChangeCircle /> : <BsUpload />}
                </label>
                {selectFile && (
                  <label htmlFor="submitbtn" className="avatar-btn">
                    <input
                      id="submitbtn"
                      type="button"
                      onClick={() => handleUploadFile()}
                    />
                    <AiFillSave />
                  </label>
                )} 
                <span className="admin-username">{user.nickname}</span>
              </Form> 
            </div>
          </Card>
      </div>
      <div className="sidebar-content">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <a
            className="nav-link active"
            id="v-pills-home-tab"
            data-toggle="pill"
            href="#v-pills-home"
            role="tab"
            aria-selected="false"
            onClick={() => setTab("statistics")}
          >
            統計
          </a>
          {/*  */}
          <a
            className="nav-link "
            id="v-pills-home-tab"
            data-toggle="pill"
            href="#v-pills-home"
            role="tab"
            aria-selected="false"
            onClick={() => setTab("shops")}
          >
            ショップのリスト
          </a>
          {/*  */}
          <a
            className="nav-link"
            id="v-pills-profile-tab"
            data-toggle="pill"
            href="#v-pills-profile"
            role="tab"
            aria-selected="false"
            onClick={() => setTab("users")}
          >
            ユーザーリスト
          </a>
          {/*  */}
          <a
            className="nav-link"
            id="v-pills-messages-tab"
            data-toggle="pill"
            href="#v-pills-messages"
            role="tab"
            aria-selected="false"
            onClick={() => setTab("orders")}
          >
            注文のリスト
          </a>
          {/*  */}
          <a
            className="nav-link"
            id="v-pills-settings-tab"
            data-toggle="pill"
            href="#v-pills-settings"
            role="tab"
            aria-selected="false"
            onClick={() => setTab("discounts")}
          >
            割引のリスト
          </a>
          {/*  */}
          <Link
            className="nav-link"
            id="v-pills-settings-tab"
            data-toggle="pill"
            // href="#v-pills-settings"
            role="tab"
            aria-selected="false"
            to='/'
            // onClick={() => setTab("default")}
          >
            TOPページ
          </Link>
        </div>
      </div>
    </div>
  );
}

const tmpUser = {
  active: true,
  address: "84 oik",
  birthday: "1999-09-04",
  deleted_at: null,
  email: "quanghuy4919@gmail.com",
  gender: "undisclosed",
  id: 17,
  is_persistent: false,
  name: null,
  nickname: "qhuy4919",
  phone_number: "0935750383",
  profile_pic: "profile_pic-1638101441965.jpg",
  role: "User",
  token: "211e3494d9451163c15cbc256f4869e322b26d738d8a04ec892d22ff3274594f",
  token_created_at: "2021-11-28T12:09:38.060Z",
  updated_at: "2021-11-01T12:59:21.941Z",
};

const profile = {
  name: "Ông tổ giặt ủi",
  // img: "https://picsum.photos/200/200",
  img: "https://cdn4.iconfinder.com/data/icons/user-people-2/48/6-512.png",
};
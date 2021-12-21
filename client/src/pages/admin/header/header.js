import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import { AiFillSave } from "react-icons/ai";
import { MdOutlineChangeCircle } from "react-icons/md";
import { CommandProfile } from "../../../api/account/profile";
import "./header.scss";

export function AdminHeader() {
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
    <div className="navbar-container">
      <Card className="profile-header-container">
        <Card.Body className="profile-header">
          <Card className="profile-pic clear-fix">
            <div className="admin-profile-section">
              <Card.Img
                src={`${process.env.REACT_APP_API_SERVER}/profile-pic/${user.info.profile_pic}`}
              />
              <Form>
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
              </Form>
            </div>
            <Card.Title>{user.info.nickname}</Card.Title>
          </Card>

        </Card.Body>
      </Card>
    </div>
  );
}

const user = {
  following: [],
  info: {
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
  },
  order: [],
};

const profile = {
  name: "Ông tổ giặt ủi",
  // img: "https://picsum.photos/200/200",
  img: "https://cdn4.iconfinder.com/data/icons/user-people-2/48/6-512.png",
};

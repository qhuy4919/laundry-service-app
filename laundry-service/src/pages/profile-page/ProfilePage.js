import { useState, useEffect } from "react";

import ProfileInformation from "./subcomponent/ProfileInformation";
import ProfileHeader from "./subcomponent/ProfileHeader";
import ProfileOrderSection from "./subcomponent/ProfileOrderSection";
import { Container } from "react-bootstrap";
import { Query } from "../../api/query-api";

import "./ProfilePage.css";

const userData = JSON.parse(localStorage.getItem("signed_in_user_data"));

function ProfilePage() {
  const [userProfile, setUserProfile] = useState();

  const handleUpdateProfile = (data) => {
    setUserProfile(data);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Query.profile.userProfile();
        if (response) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.log("fetch profile fail");
      }
    };
    fetchProfile();
  }, []);
  return (
    <>
      {userProfile && (
        <Container className="page-container profile-container scroll-bar-style">
          <ProfileHeader user={userProfile} />
          <ProfileInformation
            user={userProfile}
            handleUpdateProfile={handleUpdateProfile}
          />
          <ProfileOrderSection user={userProfile} />
        </Container>
      )}
    </>
  );
}
export default ProfilePage;

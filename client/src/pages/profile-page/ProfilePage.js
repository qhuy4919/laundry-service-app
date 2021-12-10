import { useState, useEffect } from "react";

import ProfileInformation from "./subcomponent/ProfileInformation";
import ProfileHeader from "./subcomponent/ProfileHeader";
import ProfileOrderSection from "./subcomponent/ProfileOrderSection";
import { Container } from "react-bootstrap";
import { Query } from "../../api/query-api";

import "./ProfilePage.css";

const userData = JSON.parse(localStorage.getItem("signed_in_user_data")); // TODO what if userData is null?

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
        console.log("Fetch profile fail:", error);
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
          <ProfileOrderSection orders={userProfile.order} />
        </Container>
      )}
    </>
  );
}
export default ProfilePage;

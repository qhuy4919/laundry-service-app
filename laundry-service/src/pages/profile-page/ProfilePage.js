import ProfileInformation from "./subcomponent/ProfileInformation";
import ProfileHeader from "./subcomponent/ProfileHeader";
import ProfileOrderSection from "./subcomponent/ProfileOrderSection";
import { Container } from 'react-bootstrap';

import "./ProfilePage.css"

function ProfilePage() {
  return (
		<Container className='page-container profile-container scroll-bar-style'>
        <ProfileHeader/>
        <ProfileInformation/>
        <ProfileOrderSection/>
    </Container>
  );
}
export default ProfilePage;

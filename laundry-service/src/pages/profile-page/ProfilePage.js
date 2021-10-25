import { Container, Row } from "react-bootstrap";
import InforUser from "./subcomponent/InforUser";
import ProfileHeader from "./subcomponent/ProfileHeader";
import ProfileOrderSection from "./subcomponent/ProfileOrderSection";
function ProfilePage() {
  return (
    <Container>
      <Row><ProfileHeader/></Row>
      <Row><InforUser/></Row>
      <Row><ProfileOrderSection/></Row>
    </Container>
  );
}
export default ProfilePage;

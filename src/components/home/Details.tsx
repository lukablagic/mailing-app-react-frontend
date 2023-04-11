import { apple, bill, google } from "../../assets";
import Outline from "./Outline";
import { Container} from "react-bootstrap";

const Details = () => (
  <Outline>
    <h1>Details</h1>
    <Container className="justify-content-center py-1 py-md-0">
      <h4>Please select an email to read!</h4>
    </Container>
  </Outline>
);

export default Details;
import { useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { logoutUser } from "../../api/Auth";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../common/ToastContext";
import { AuthContext } from "../common/AuthContext";

const Header = () => {
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const {showToast}  = useContext(ToastContext);
  const { token ,setAuth,setToken } = useContext(AuthContext);


  const handleLogout = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
       await logoutUser(token);
     
      setAuth(false);
      showToast('Logout successful!');
    } catch (error) {
      console.error(error);
     showToast('Logout failed!');
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand href="#">MailingApp</Navbar.Brand>
          <Container className="justify-content-end">
            <Form className="d-flex ">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item >Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item  onClick={handleLogout} variant="success" >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Container>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { logoutUser } from "../../api/Auth";
import { AuthContext } from "../../utility/contexts/AuthContext";
import { ToastContext } from "../../utility/contexts/ToastContext";


const Header = () => {
  
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const {showToast}                                 = useContext(ToastContext);
  const { token ,setAuth,setToken }                 = useContext(AuthContext);


  const handleLogout = async () => {
    event.preventDefault();
    try {
       await logoutUser(token);

      setAuth(false);
      showToast("success",'Logout successful!');
    } catch (error) {
      console.error(error);
     showToast("danger",'Logout failed!');
    }
  };
  
  return (
    <div className='  flex-grow: 1;'>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand >MailingApp</Navbar.Brand>


            <Form className="d-flex w-100">
              <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
              <Button onClick={handleLogout} variant="danger" >
                Logout
              </Button>
            </Form>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

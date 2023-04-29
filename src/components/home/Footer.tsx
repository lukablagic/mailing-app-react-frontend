import { Container, Nav, NavItem } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container>
      <footer className="py-3 my-4">
        <Nav className="justify-content-center border-bottom pb-3 mb-3">
          <NavItem>
            <Nav.Link href="#" className="px-2 text-body-secondary">Home</Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link href="#" className="px-2 text-body-secondary">Features</Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link href="#" className="px-2 text-body-secondary">Pricing</Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link href="#" className="px-2 text-body-secondary">FAQs</Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link href="#" className="px-2 text-body-secondary">About</Nav.Link>
          </NavItem>
        </Nav>
        <p className="text-center text-body-secondary">&copy; 2023 Mailing App, Inc</p>
      </footer>
    </Container>
  );
};

export default Footer;


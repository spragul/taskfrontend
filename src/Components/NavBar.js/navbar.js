import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Navbartop({ children }) {
  const navigate = useNavigate();
  //logout
  function logout() {
    sessionStorage.clear();
    navigate("/login");
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-success">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/" style={{color:"black"}}>Task</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Button
                variant="outline-warning"
                className="nav-btn-Participant"
                onClick={() => {
                  navigate("/addtask");
                }}
              >
                Add TAsk
              </Button>
              <Button
                variant="outline-warning"
                className="nav-btn-Tournament"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Task List
              </Button>
            </Nav>
            <Nav>
              {" "}
              <Button
                variant="outline-warning"
                className="nav-btn-out"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>{children}</main>
    </div>
  );
}

export default Navbartop;

import React, {useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import axios from "axios";
import {useAuth} from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const {isLoggedIn,setIsLoggedIn,logout} = useAuth();

  const navigate = useNavigate();

  const handleClickUserLogOut = async () => {
    try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/logout",
          {
            headers: {
                'accessToken': localStorage.getItem('token'),
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data'
            }
          }
        );
        const data = response.data
        if (data.code == 200){
          localStorage.removeItem("token");
          navigate("/login")
          logout()
        }
        else{
          alert(data.message)
        }
    } catch (error) {
      console.error(error);
    }
  }

  if (!isLoggedIn)
  {
    return(
      <>
        <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Nav.Link href="/"><img src="./download.jpeg" style={{ maxWidth: 40 }} alt=""/></Nav.Link>
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
      </>
    ) 
  }
  else{
    return(
      <>
        <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Nav.Link href="/"><img src="./download.jpeg" style={{ maxWidth: 40 }} alt=""/></Nav.Link>
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/products">User Products</Nav.Link>
              <Nav.Link onClick={handleClickUserLogOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
      </>
    ) 
  }
}

export default Header
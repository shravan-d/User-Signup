import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap';
import './NavBar.css'
import 'bootstrap/dist/css/bootstrap.css'
import logo from '../../media/logo.png'
import back from '../../media/back.png'

const NavBar = ({prevPage, page}) => {
  return (
    <div className='nav-bar'>
      <Navbar>
        <Nav.Link onClick={prevPage} className={page===1?"d-none":"d-block"}>
          <img src={back} width="23px" height="18px" alt="back"></img>
        </Nav.Link>
        <Navbar.Brand>
          <img src={logo} width="207px" height="38px" alt="logo"></img>
        </Navbar.Brand>
        <Container id="container-nav">  
          <Navbar.Text id={page>=1?"page-num-active":"page-num"}>1</Navbar.Text>
          <Navbar.Text className={page===1?"d-block":"d-none"} style={{color: "black", margin:"5px"}}>
            <div style={{fontSize:"8px", textAlign:"left", marginBottom:"-6px"}}>USER</div>
            <div style={{fontSize:"23px", textAlign:"left"}}>Phone Number</div>
          </Navbar.Text>
          <Navbar.Text id={page>1?"hr-active":"hr"}><hr></hr></Navbar.Text>
          <Navbar.Text id={page>=2?"page-num-active":"page-num"}>2</Navbar.Text>
          <Navbar.Text className={page===2?"d-block":"d-none"} style={{color: "black", margin:"5px"}}>
            <div style={{fontSize:"8px", textAlign:"left", marginBottom:"-6px"}}>USER</div>
            <div style={{fontSize:"23px", textAlign:"left"}}>Email</div>
          </Navbar.Text>
          <Navbar.Text id={page>2?"hr-active":"hr"}><hr></hr></Navbar.Text>
          <Navbar.Text id={page>=3?"page-num-active":"page-num"}>3</Navbar.Text>
          <Navbar.Text className={page===3?"d-block":"d-none"} style={{color: "black", margin:"5px"}}>
            <div style={{fontSize:"8px", textAlign:"left", marginBottom:"-6px"}}>USER</div>
            <div style={{fontSize:"23px", textAlign:"left"}}>Name</div>           
          </Navbar.Text>
          <Navbar.Text id={page>3?"hr-active":"hr"}><hr></hr></Navbar.Text>
          <Navbar.Text id={page===4?"page-num-active":"page-num"}>4</Navbar.Text>
          <Navbar.Text className={page===4?"d-block":"d-none"} style={{color: "black", margin:"5px"}}>
            <div style={{fontSize:"8px", textAlign:"left", marginBottom:"-6px"}}>USER</div>
            <div style={{fontSize:"23px", textAlign:"left"}}>Location</div>  
          </Navbar.Text>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
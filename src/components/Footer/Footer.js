import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import './Footer.css'
import 'bootstrap/dist/css/bootstrap.css'

const Footer = () => {
  return (
    <div className='footer'>
      <Navbar fixed='bottom' className="justify-content-center">
        <Nav>
          <Nav.Link href="#">Contact Us</Nav.Link>
          <Nav.Link href="#">Legal Terms</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  )
}

export default Footer
import { Col, Container, Row } from "react-bootstrap"
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
export const Footer =() =>{
    return (
        <footer className="footer">
            <Container>
                <Row className="align-item-center">
                <Col sm={6}>
                    <img src={logo} alt="logo"/>

                </Col>
                <Col sm={6} className="text-center text-sm-end">
                  <div className="social-icon">
                  <a href="https://www.linkedin.com/in/anurag-jaiswal21"><img src={navIcon1} alt="Linkdn"/></a>
                    <a href="https://www.facebook.com/anurag.jaiswal.507464/"><img src={navIcon2} alt="Facebook"/></a>
                    <a href="https://www.instagram.com/_anurag.jaiswal_/"><img src={navIcon3} alt="Instagram"/></a>
                  </div>
                  <p> Copyrights 2023. All Rights Reserved</p>
                </Col>
                </Row>
            </Container>
        </footer>
    )
}
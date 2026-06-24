import { Col, Container, Row } from "react-bootstrap";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer pt-5 pb-4 border-top border-secondary" style={{ borderColor: 'rgba(255,255,255,0.08) !important' }}>
      <Container>
        <Row className="align-items-center">
          <Col sm={6} className="text-center text-sm-start mb-3 mb-sm-0">
            <span className="font-monospace fw-bold text-cyan" style={{ fontSize: '1.4rem', letterSpacing: '1px' }}>
              AJ_SRE
            </span>
            <p className="mt-1" style={{ fontSize: '0.85rem', color: '#8e8e93' }}>
              Designed & Engineered for High Availability.
            </p>
          </Col>
          <Col sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/anurag-jaiswal21" target="_blank" rel="noreferrer">
                <img src={navIcon1} alt="LinkedIn" />
              </a>
              <a href="https://www.facebook.com/anurag.jaiswal.507464/" target="_blank" rel="noreferrer">
                <img src={navIcon2} alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/_anurag.jaiswal_/" target="_blank" rel="noreferrer">
                <img src={navIcon3} alt="Instagram" />
              </a>
            </div>
            <p className="mt-2" style={{ fontSize: '0.8rem', color: '#6e6e73' }}>
              &copy; {new Date().getFullYear()} Anurag Jaiswal. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
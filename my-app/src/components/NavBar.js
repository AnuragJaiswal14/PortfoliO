import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const NavBar = ({ homeRef, skillsRef, experienceRef, projectsRef }) => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (ref, sectionName) => {
    setActiveLink(sectionName);
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home" onClick={(e) => { e.preventDefault(); scrollToSection(homeRef, 'home'); }}>
          <div className="d-flex align-items-center gap-2">
            <span className="font-monospace fw-bold text-cyan" style={{ fontSize: '1.4rem', letterSpacing: '1px' }}>
              AJ_SRE
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="#home"
              className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
              onClick={(e) => { e.preventDefault(); scrollToSection(homeRef, 'home'); }}
            >
              Mission Control
            </Nav.Link>
            <Nav.Link
              href="#skills"
              className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'}
              onClick={(e) => { e.preventDefault(); scrollToSection(skillsRef, 'skills'); }}
            >
              Tech Telemetry
            </Nav.Link>
            <Nav.Link
              href="#experience"
              className={activeLink === 'experience' ? 'active navbar-link' : 'navbar-link'}
              onClick={(e) => { e.preventDefault(); scrollToSection(experienceRef, 'experience'); }}
            >
              Deep Space Logs
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}
              onClick={(e) => { e.preventDefault(); scrollToSection(projectsRef, 'projects'); }}
            >
              Orbital Deployments
            </Nav.Link>
          </Nav>
          <span className="navbar-text">
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
            <a href="mailto:anujaiswal9087@gmail.com">
              <button className="vvd">
                <span>Comm Link</span>
              </button>
            </a>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
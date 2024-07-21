import { useEffect, useState,useRef } from "react";
import {Navbar, Container,Nav} from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import logo1 from "../assets/img/AJ.gif";

export const NavBar = () =>{
    const [activeLink,setActiveLink] = useState('home');
    const [scrolled,setScrolled] = useState(false);
    const homeRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);


    useEffect(()=>{
        const onScroll = () =>{
            if(window.scrollY > 50){
                setScrolled(true);
            }else{
                setScrolled(true);
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    },[])

    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
   
    const onUpdateActiveLink = (value) =>{
             setActiveLink(value);
    }

    return (
        <Navbar expand="lg" className={scrolled? "scrolled":""}>
            <Container>
                <Navbar.Brand href="#home">
                    <img src={logo} alt="Logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toogler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link':'navbar-link'} onClick={() => 
                   { onUpdateActiveLink('home'); scrollToSection(homeRef); }}> Home </Nav.Link>
                  <Nav.Link href="#link" className={activeLink === 'skills'? 'active navbar-link':'navbar-link'} onClick={() =>
                    { onUpdateActiveLink('skills');  scrollToSection(skillsRef);}}> Skills </Nav.Link>
                   <Nav.Link href="#projects" className={activeLink === 'projects'? 'active navbar-link':'navbar-link'} onClick={() => 
                   {onUpdateActiveLink('projects');  scrollToSection(projectsRef);}}>Projects</Nav.Link> 
                  </Nav>    
                  <span className="navbar-text">
                    <div className="social-icon">
                    <a href="https://www.linkedin.com/in/anurag-jaiswal21"><img src={navIcon1} alt="Linkdn"/></a>
                    <a href="https://www.facebook.com/anurag.jaiswal.507464/"><img src={navIcon2} alt="Facebook"/></a>
                    <a href="https://www.instagram.com/_anurag.jaiswal_/"><img src={navIcon3} alt="Instagram"/></a>
                    
                    </div>
                    <button className="vvd" onClick={() => console.log('connect')}><span>Let's connect</span></button> 
                  </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
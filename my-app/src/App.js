import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import {Banner} from './components/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import IconCloud from './components/Globe.tsx';
function App() {

  const homeRef = React.useRef(null);
  const skillsRef = React.useRef(null);
  const projectsRef = React.useRef(null);

  const iconSlugs = [
    "java",
    "python",
    "javascript",
    "postgresql",
    "mysql",
    "typescript",
    "html5",
    "xml",
    "json",
    "css3",
    "node-dot-js",
    "react",
    "spring",
    "express",
    "bootstrap",
    "tailwindcss",
    "git",
    "docker",
    "kubernetes",
    "octopus-deploy",
    "swagger",
    "postman",
    "jenkins",
    "ansible",
    "aws"
  ];
  return (
    <div className="App">
    <NavBar
     homeRef={homeRef} 
     skillsRef={skillsRef} 
     projectsRef={projectsRef}/>
    <Banner  ref={homeRef}/>
    <Skills ref={skillsRef}/>
    <IconCloud iconSlugs={iconSlugs} />
    <Projects ref={projectsRef}/>
    <Contact/>
    <Footer/>
    </div>
  );
}

export default App;

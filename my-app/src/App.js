import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Starfield } from './components/Starfield';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import IconCloud from './components/Globe.tsx';

function App() {
  const homeRef = React.useRef(null);
  const skillsRef = React.useRef(null);
  const experienceRef = React.useRef(null);
  const projectsRef = React.useRef(null);

  const iconSlugs = [
    "kubernetes",
    "docker",
    "terraform",
    "amazonwebservices",
    "argocd",
    "jenkins",
    "prometheus",
    "grafana",
    "dynatrace",
    "opensearch",
    "rabbitmq",
    "apache",
    "git",
    "github",
    "sonarqube",
    "linux",
    "gnubash",
    "mysql",
    "postgresql",
    "node-dot-js",
    "react",
    "next-dot-js",
    "java",
    "spring"
  ];

  return (
    <div className="App">
      {/* Dynamic star background */}
      <Starfield />
      
      <NavBar
        homeRef={homeRef} 
        skillsRef={skillsRef} 
        experienceRef={experienceRef}
        projectsRef={projectsRef}
      />
      
      <Banner ref={homeRef} />
      
      <Skills ref={skillsRef} />
      
      {/* Interactive SRE Icon Cloud Hub */}
      <div className="orbital-hub-section py-5 text-center">
        <h3 className="orbit-title font-monospace mb-2" style={{ color: '#00f0ff', letterSpacing: '2px', fontSize: '1.5rem' }}>
          &lt; GRAVITATIONAL TECH CORE &gt;
        </h3>
        <p className="text-muted font-monospace" style={{ fontSize: '0.9rem' }}>
          A live rotating cloud showing primary engineering elements. Hover to hold focus.
        </p>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <IconCloud iconSlugs={iconSlugs} />
        </div>
      </div>
      
      <Experience ref={experienceRef} />
      
      <Projects ref={projectsRef} />
      
      <Contact />
      
      <Footer />
    </div>
  );
}

export default App;

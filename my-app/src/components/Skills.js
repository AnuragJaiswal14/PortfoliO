import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Skills = React.forwardRef((props, ref) => {
  const skillDomains = [
    {
      title: "Orchestration & Containers",
      subtitle: "SYSTEM CORE ORBITS",
      techs: [
        { name: "Kubernetes", value: 95 },
        { name: "Docker Containerization", value: 90 },
        { name: "Helm Chart Management", value: 85 }
      ]
    },
    {
      title: "Pipelines & GitOps",
      subtitle: "WARP DRIVE DELIVERY",
      techs: [
        { name: "ArgoCD (CD Pipelines)", value: 90 },
        { name: "Jenkins (CI Pipelines)", value: 92 },
        { name: "Git Version Control", value: 95 },
        { name: "Security (SAST/DAST)", value: 80 }
      ]
    },
    {
      title: "IaC & Scripting Automation",
      subtitle: "GRAVITATIONAL CONTROL",
      techs: [
        { name: "Terraform (IaC)", value: 88 },
        { name: "Linux Server Admin", value: 92 },
        { name: "Bash Scripting", value: 90 }
      ]
    },
    {
      title: "Cloud & Observability",
      subtitle: "TELEMETRY SENSOR MATRIX",
      techs: [
        { name: "AWS Services", value: 90 },
        { name: "Dynatrace / Prometheus / Grafana", value: 88 },
        { name: "Database Optimization (MySQL, RDS)", value: 85 }
      ]
    }
  ];

  return (
    <section className="skill" id="skills" ref={ref}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="skill-bx">
              <h2>Tech Telemetry</h2>
              <p className="mb-5" style={{ color: '#b0adc2' }}>
                Operational capability overview. Each sector represents loaded tooling metrics, core infrastructure competencies, and automation configurations.
              </p>
              
              <Row className="skills-grid g-4 text-start">
                {skillDomains.map((domain, index) => (
                  <Col md={6} key={index}>
                    <div className="skill-domain-card glassmorphic-panel p-4">
                      <span className="text-cyan font-monospace mb-1 d-block" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>
                        {"// "}{domain.subtitle}
                      </span>
                      <h4 className="text-white mb-4" style={{ fontSize: '1.25rem' }}>{domain.title}</h4>
                      
                      <ul className="skill-list-tech font-monospace">
                        {domain.techs.map((tech, techIdx) => (
                          <li key={techIdx}>
                            <div className="skill-meta text-muted">
                              <span className="text-white">{tech.name}</span>
                              <span className="text-cyan">{tech.value}%</span>
                            </div>
                            <div className="skill-progress-orbit">
                              <div 
                                className="skill-progress-bar" 
                                style={{ width: `${tech.value}%` }}
                              ></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Experience = React.forwardRef((props, ref) => {
  const [activeMission, setActiveMission] = useState(0);

  const missions = [
    {
      company: "Deutsche Telekom Digital Labs",
      role: "Site Reliability Engineer",
      duration: "Dec 2024 - Present",
      location: "Gurgaon, Haryana",
      sector: "SRE CORE SYSTEMS",
      telemetry: {
        status: "ACTIVE",
        uptime: "99.99%",
        clusters: "AWS EKS Clusters",
        pipeline: "GitOps (ArgoCD & Jenkins)"
      },
      skills: ["AWS EKS", "Jenkins", "ArgoCD", "Secrets Manager", "Dynatrace", "OpenSearch", "Grafana", "Zenduty", "RabbitMQ", "NiFi"],
      logs: [
        "Designed, deployed, and managed scalable, high-availability workloads across AWS EKS Kubernetes clusters, building GitOps-driven delivery pipelines using Jenkins, ArgoCD, and AWS Secrets Manager.",
        "Built comprehensive observability and alerting ecosystems using Dynatrace, OpenSearch, Grafana, Pingdom, and Kubestate metrics; automated incident escalation via Zenduty IVR.",
        "Led proactive monitoring, root cause analysis (RCA), post-incident reviews, and capacity scaling for systems including RabbitMQ and NiFi during high-traffic events.",
        "Developed and maintained automation frameworks and platform-level tooling for patching and upgrading GitHub, SonarQube, and Nexus.",
        "Enforced SRE best practices including SLIs/SLOs, error budgets, and operational runbook improvements."
      ]
    },
    {
      company: "Omnifi AI Pvt Ltd",
      role: "DevOps Engineer - II",
      duration: "Jan 2024 - Dec 2024",
      location: "Kolkata, West Bengal",
      sector: "INFRASTRUCTURE SECURITY & CI/CD",
      telemetry: {
        status: "COMPLETED",
        pipelinesCount: "12+ Live Pipelines",
        securityRating: "A+ Compliance",
        monitoring: "AWS CloudWatch"
      },
      skills: ["AWS", "Next.js", "Java", "CodePipeline", "CodeDeploy", "API Gateway", "AWS KMS", "CloudWatch"],
      logs: [
        "Designed and implemented end-to-end CI/CD pipelines for Node.js, React, Next.js, and Java applications using AWS CodeCommit, CodeBuild, CodePipeline, and CodeDeploy.",
        "Strengthened platform security by implementing API whitelisting via AWS API Gateway and enforcing encryption of sensitive logs using AWS KMS for secure key management.",
        "Enhanced operational visibility and compliance by configuring AWS CloudWatch for centralized logging and monitoring, enabling proactive detection of anomalies."
      ]
    },
    {
      company: "Omnifi AI Pvt Ltd",
      role: "DevOps Engineer - I",
      duration: "Jan 2023 - Dec 2023",
      location: "Kolkata, West Bengal",
      sector: "DATABASE & FINOPS",
      telemetry: {
        status: "COMPLETED",
        costSaving: "12.5% Reduction",
        dbUptime: "100.0%",
        deployments: "EC2 Clusters"
      },
      skills: ["Amazon RDS", "MySQL", "AWS EC2", "CloudWatch", "AWS SNS", "Cost Optimization"],
      logs: [
        "Orchestrated zero-downtime MySQL database upgrades on Amazon RDS, ensuring data consistency through automated snapshots, rollback mechanisms, and rigorous testing.",
        "Streamlined EC2-based Java and Node.js applications deployments, improving deploy speeds and rollback times.",
        "Automated AWS cost and usage report delivery and implemented CloudWatch + SNS budget alerts, achieving a 12.5% cost reduction through resource right-sizing and scheduling."
      ]
    },
    {
      company: "Mitacs Globalink Research Internship",
      role: "Research Intern",
      duration: "May 2022 - Aug 2022",
      location: "Vancouver, Canada (Remote/Hybrid)",
      sector: "AUTOMATION RESEARCH",
      telemetry: {
        status: "COMPLETED",
        domain: "NLP & Server Config",
        hosting: "DigitalOcean",
        nlpModel: "Pegasus Transformer"
      },
      skills: ["Linux Server Config", "Moodle", "DigitalOcean", "HuggingFace", "NLP", "Python"],
      logs: [
        "Worked in the domain of automating assessment of programming assignments.",
        "Gained hands-on experience of working with server configuration, Moodle, and DigitalOcean.",
        "Leveraged Pegasus transformers from the HuggingFace community and NLP algorithms for automated evaluation workflows."
      ]
    }
  ];

  return (
    <section className="experience" id="experience" ref={ref}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="section-header text-center mb-5">
              <span className="tagline">CHRONOLOGICAL FLIGHT PATH</span>
              <h2>Deep Space Logs</h2>
              <p>Telemetry record of my professional deployment history across cloud systems and platform operations.</p>
            </div>
          </Col>
        </Row>

        <Row className="experience-box py-4">
          {/* Mission Nodes (Vertical Sidebar Selector) */}
          <Col md={4} className="mission-selector mb-4 mb-md-0">
            <div className="mission-nav">
              {missions.map((mission, index) => (
                <button
                  key={index}
                  className={`mission-tab-btn ${activeMission === index ? "active" : ""}`}
                  onClick={() => setActiveMission(index)}
                >
                  <div className="node-indicator">
                    <div className="inner-node"></div>
                  </div>
                  <div className="mission-btn-meta">
                    <span className="mission-company">{mission.company}</span>
                    <span className="mission-duration">{mission.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </Col>

          {/* Detailed Telemetry Terminal */}
          <Col md={8} className="mission-terminal-col">
            <div className="mission-terminal glassmorphic-panel">
              <div className="terminal-topbar">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="terminal-title">LOGBOOK_ENTRY_0{activeMission + 1}.log</div>
                <div className="terminal-status">SYS_OK</div>
              </div>
              <div className="terminal-body font-monospace text-start p-4">
                <div className="terminal-header-meta mb-4">
                  <div className="meta-line">
                    <span className="text-cyan">MISSION:</span> {missions[activeMission].role.toUpperCase()}
                  </div>
                  <div className="meta-line">
                    <span className="text-purple">SECTOR:</span> {missions[activeMission].sector}
                  </div>
                  <div className="meta-line">
                    <span className="text-gold">LOCATION:</span> {missions[activeMission].location}
                  </div>
                  <div className="meta-line">
                    <span className="text-green">TIMELINE:</span> {missions[activeMission].duration}
                  </div>
                </div>

                <div className="terminal-telemetry-grid mb-4">
                  <div className="row g-2">
                    {Object.entries(missions[activeMission].telemetry).map(([key, val]) => (
                      <div key={key} className="col-6 col-sm-3">
                        <div className="telemetry-stat-card">
                          <span className="stat-label text-muted">{key.toUpperCase()}</span>
                          <span className="stat-value text-white">{val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="terminal-log-content">
                  <p className="text-cyan mb-2">{"// DETAILED FLIGHT PARAMETERS & OUTCOMES:"}</p>
                  <ul className="terminal-bullets">
                    {missions[activeMission].logs.map((log, idx) => (
                      <li key={idx} className="mb-2">
                        <span className="bullet-prompt">&gt;</span> {log}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="terminal-skills-footer mt-4 pt-3 border-top border-secondary">
                  <span className="text-purple d-block mb-2">{"// PROPULSION & TOOLING:"}</span>
                  <div className="tech-pills">
                    {missions[activeMission].skills.map((skill, idx) => (
                      <span key={idx} className="tech-pill-badge">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});

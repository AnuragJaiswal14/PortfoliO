import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";

export const Projects = () => {
  // Trivy Scan Simulator State
  const [scanHistory, setScanHistory] = useState([
    { text: "STATION: READY FOR CVE STACK SCAN", type: "info" },
    { text: "Click 'LAUNCH AUDIT' to execute container image scan.", type: "info" }
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const scanBodyRef = useRef(null);

  // K8s Telemetry Simulator State
  const [metrics, setMetrics] = useState({
    cpu: 34,
    ram: 56,
    pods: 4,
    latency: 85
  });
  const [outageActive, setOutageActive] = useState(false);
  const [outageStep, setOutageStep] = useState(0); // 0: None, 1: Spiked, 2: Scaling, 3: Resolved
  const [isInjecting, setIsInjecting] = useState(false);

  // Scroll scan logs to bottom
  useEffect(() => {
    if (scanBodyRef.current) {
      scanBodyRef.current.scrollTop = scanBodyRef.current.scrollHeight;
    }
  }, [scanHistory]);

  // Wiggle telemetry metrics in normal state
  useEffect(() => {
    const interval = setInterval(() => {
      if (outageActive) return; // don't wiggle randomly during outage flow
      
      setMetrics(prev => ({
        cpu: Math.max(15, Math.min(60, prev.cpu + (Math.random() * 8 - 4))),
        ram: Math.max(45, Math.min(75, prev.ram + (Math.random() * 4 - 2))),
        pods: 4,
        latency: Math.max(40, Math.min(130, prev.latency + (Math.random() * 20 - 10)))
      }));
    }, 1200);

    return () => clearInterval(interval);
  }, [outageActive]);

  // Trivy Scan Run
  const runTrivyScan = () => {
    setIsScanning(true);
    setScanHistory([{ text: "Initializing Security Compliance Scan Engine...", type: "warn" }]);

    const logs = [
      { text: "$ trivy image backend-service:latest --severity HIGH,CRITICAL", type: "command", delay: 400 },
      { text: "Loading local vulnerability database (github.com/aquasecurity/trivy-db)... Done.", type: "info", delay: 900 },
      { text: "Scanning container image OS layers (Debian GNU/Linux 11)...", type: "info", delay: 1400 },
      { text: "[CRITICAL] CVE-2023-4911 (glibc) found in libc6@2.31-13+deb11u6. CVSS 9.8", type: "error", delay: 2000 },
      { text: "[HIGH]     CVE-2023-38545 (curl) found in libcurl4@7.74.0-1.3+deb11u10. CVSS 8.1", type: "warn", delay: 2500 },
      { text: "[HIGH]     CVE-2023-45853 (zlib) found in zlib1g@1:1.2.11.dfsg-2+deb11u2. CVSS 8.2", type: "warn", delay: 3000 },
      { text: "Audit Summary: 1 CRITICAL, 2 HIGH, 14 MEDIUM/LOW vulnerabilities detected.", type: "error", delay: 3500 },
      { text: "Triggering Terraform automated patch manifest execution...", type: "warn", delay: 4100 },
      { text: "Terraform: Applying ECR security groups, updating base image to alpine:3.18...", type: "info", delay: 4800 },
      { text: "Terraform: IAM access control policies optimized (revoking wildcards)...", type: "info", delay: 5400 },
      { text: "Rescanning updated docker image base...", type: "warn", delay: 6100 },
      { text: "[CRITICAL] 0 vulnerabilities found.", type: "success", delay: 6800 },
      { text: "[HIGH]     0 vulnerabilities found.", type: "success", delay: 7200 },
      { text: "[MEDIUM]   2 vulnerabilities found (libraries: axios, semver).", type: "info", delay: 7600 },
      { text: "STATUS COMPLIANCE: PASSED. Vulnerability count reduced by 60%.", type: "success", delay: 8200 },
      { text: "SYS_CHECK: STACK IS SECURE // AUDIT LOG END", type: "success", delay: 8700 }
    ];

    logs.forEach(log => {
      setTimeout(() => {
        setScanHistory(prev => [...prev, { text: log.text, type: log.type }]);
        if (log.text.includes("AUDIT LOG END")) {
          setIsScanning(false);
        }
      }, log.delay);
    });
  };

  // K8s Spiker / Autoscale Run
  const triggerOutageSim = () => {
    setIsInjecting(true);
    setOutageActive(true);
    setOutageStep(1);

    // Step 1: Resource Spikes (OOM scenario)
    setMetrics({
      cpu: 98,
      ram: 94,
      pods: 4,
      latency: 4850
    });

    // Step 2: Scale up pods after 3.5 seconds
    setTimeout(() => {
      setOutageStep(2);
      setMetrics(prev => ({
        ...prev,
        pods: 12 // Horizontal Pod Autoscaler scales pods
      }));
    }, 3500);

    // Step 3: Load balances, metrics stabilize
    setTimeout(() => {
      setOutageStep(3);
      setMetrics({
        cpu: 41,
        ram: 68,
        pods: 12,
        latency: 110
      });
    }, 7000);

    // Step 4: Outage finished
    setTimeout(() => {
      setOutageActive(false);
      setOutageStep(0);
      setIsInjecting(false);
      // scale back pods gradually
      setMetrics(prev => ({
        ...prev,
        pods: 4
      }));
    }, 11000);
  };

  return (
    <section className="project" id="projects">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={10}>
            <div className="section-header mb-5">
              <span className="tagline">ORBITAL SYSTEMS DEPLOYMENTS</span>
              <h2>DevOps Core Projects</h2>
              <p>Execute live simulations of security audits and container scaling telemetry dashboards below.</p>
            </div>

            <Tab.Container id="projects-tabs" defaultActiveKey="security">
              <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                <Nav.Item>
                  <Nav.Link eventKey="security">Security & Compliance scans</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="monitoring">K8s Monitoring & Observability</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                {/* Security Scanning Project */}
                <Tab.Pane eventKey="security">
                  <Row className="align-items-center g-4 text-start">
                    <Col lg={5}>
                      <h3 className="text-white mb-3" style={{ fontFamily: 'Orbitron', fontWeight: 600 }}>
                        Automated Security & Compliance Scans
                      </h3>
                      <p style={{ color: '#b0adc2' }}>
                        Built an automated pipeline utilizing Docker containers, Trivy compliance scanner, and Terraform to guarantee container image integrity.
                      </p>
                      <p style={{ color: '#b0adc2' }}>
                        <strong>Outcome:</strong> Automatically detects critical package CVEs and AWS IAM access permission leaks, executing policy patches that reduced stack vulnerabilities by 60%.
                      </p>
                      <div className="tech-pills mt-3">
                        <span className="tech-pill-badge">Docker</span>
                        <span className="tech-pill-badge">Trivy</span>
                        <span className="tech-pill-badge">Terraform</span>
                        <span className="tech-pill-badge">AWS IAM</span>
                        <span className="tech-pill-badge">ECR</span>
                      </div>
                    </Col>
                    
                    <Col lg={7}>
                      <div className="simulator-panel font-monospace">
                        <div className="simulator-topbar">
                          <span className="text-white">{"// SECURITY_AUDIT_CONSOLE"}</span>
                          <div className="simulator-actions">
                            <button 
                              className="simulator-btn"
                              onClick={runTrivyScan}
                              disabled={isScanning}
                            >
                              {isScanning ? "SCANNING..." : "LAUNCH AUDIT"}
                            </button>
                          </div>
                        </div>
                        <div className="simulator-body text-start p-3" ref={scanBodyRef}>
                          {scanHistory.map((log, idx) => {
                            let typeClass = "info";
                            if (log.type === "command") typeClass = "info text-muted";
                            if (log.type === "success") typeClass = "success";
                            if (log.type === "warn") typeClass = "warn";
                            if (log.type === "error") typeClass = "error";
                            
                            return (
                              <div key={idx} className={`log-item ${typeClass}`}>
                                {log.type === "command" ? "" : "> "}{log.text}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Tab.Pane>

                {/* Kubernetes Monitoring Project */}
                <Tab.Pane eventKey="monitoring">
                  <Row className="align-items-center g-4 text-start">
                    <Col lg={5}>
                      <h3 className="text-white mb-3" style={{ fontFamily: 'Orbitron', fontWeight: 600 }}>
                        K8s Monitoring & Observability
                      </h3>
                      <p style={{ color: '#b0adc2' }}>
                        Enforced centralized cluster instrumentation using Prometheus, Grafana metrics dashboard, and an ELK Stack logging aggregator.
                      </p>
                      <p style={{ color: '#b0adc2' }}>
                        <strong>Outcome:</strong> Implemented real-time load triggers and automated paging alerts, shrinking cluster Mean Time to Resolution (MTTR) by 40% during outages.
                      </p>
                      <div className="tech-pills mt-3">
                        <span className="tech-pill-badge">Kubernetes</span>
                        <span className="tech-pill-badge">Prometheus</span>
                        <span className="tech-pill-badge">Grafana</span>
                        <span className="tech-pill-badge">ELK Stack</span>
                        <span className="tech-pill-badge">Zenduty IVR</span>
                      </div>
                    </Col>

                    <Col lg={7}>
                      <div className="simulator-panel">
                        <div className="simulator-topbar">
                          <span className="text-cyan font-monospace">{"// GRAFANA_TELEMETRY_PORTAL"}</span>
                          <div className="simulator-actions">
                            <button 
                              className="simulator-btn"
                              style={{ borderColor: '#ff4d4d', color: '#ff4d4d', background: 'rgba(255,77,77,0.1)' }}
                              onClick={triggerOutageSim}
                              disabled={isInjecting}
                            >
                              {isInjecting ? "HEALING SYSTEM..." : "INJECT OUTAGE"}
                            </button>
                          </div>
                        </div>
                        <div className="simulator-body p-4 text-start font-monospace text-white">
                          
                          {outageStep === 1 && (
                            <div className="grafana-alert-banner mb-3">
                              [CRITICAL ALERT] OOM Spike on ingress controllers! Network Latency critical. Paging on-call SRE via Zenduty!
                            </div>
                          )}

                          {outageStep === 2 && (
                            <div className="grafana-alert-banner mb-3" style={{ background: 'rgba(255, 170, 0, 0.15)', borderColor: '#ffaa00', color: '#ffd480' }}>
                              [AUTO_HEAL] Kubernetes HPA triggered. Scaling replicas count from 4 to 12. Distributing ingress queue.
                            </div>
                          )}

                          {outageStep === 3 && (
                            <div className="grafana-alert-banner mb-3" style={{ background: 'rgba(57, 255, 20, 0.15)', borderColor: '#39ff14', color: '#a3ffa3' }}>
                              [RESOLVED] Traffic balanced. Node loads nominal. Latency back inside SLA limit. MTTR: 15s (40% below baseline).
                            </div>
                          )}

                          <div className="chart-container">
                            {/* CPU Load Metric */}
                            <div className="chart-bar-group">
                              <div className="chart-bar-header">
                                <span>AWS EKS Cluster CPU Load</span>
                                <span className={metrics.cpu > 90 ? "text-red" : metrics.cpu > 70 ? "text-gold" : "text-cyan"}>
                                  {Math.round(metrics.cpu)}%
                                </span>
                              </div>
                              <div className="chart-bar-track">
                                <div 
                                  className={`chart-bar-fill ${metrics.cpu > 90 ? "danger" : metrics.cpu > 70 ? "warning" : "normal"}`}
                                  style={{ width: `${metrics.cpu}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Memory Metric */}
                            <div className="chart-bar-group">
                              <div className="chart-bar-header">
                                <span>Node Cluster RAM Usage</span>
                                <span className={metrics.ram > 90 ? "text-red" : "text-cyan"}>
                                  {Math.round(metrics.ram)}%
                                </span>
                              </div>
                              <div className="chart-bar-track">
                                <div 
                                  className={`chart-bar-fill ${metrics.ram > 90 ? "danger" : "normal"}`}
                                  style={{ width: `${metrics.ram}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Latency Metric */}
                            <div className="chart-bar-group">
                              <div className="chart-bar-header">
                                <span>Ingress Endpoint Latency</span>
                                <span className={metrics.latency > 1000 ? "text-red" : "text-cyan"}>
                                  {Math.round(metrics.latency)}ms
                                </span>
                              </div>
                              <div className="chart-bar-track">
                                <div 
                                  className={`chart-bar-fill ${metrics.latency > 1000 ? "danger" : "normal"}`}
                                  style={{ width: `${Math.min(100, metrics.latency / 50)}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Running Replicas Pods */}
                            <div className="chart-bar-group">
                              <div className="chart-bar-header">
                                <span>Active Ingress Replicas (HPA Pods)</span>
                                <span className={metrics.pods > 4 ? "text-green font-weight-bold" : "text-white"}>
                                  {metrics.pods} Nodes
                                </span>
                              </div>
                              <div className="chart-bar-track">
                                <div 
                                  className="chart-bar-fill normal"
                                  style={{ width: `${(metrics.pods / 12) * 100}%`, background: 'linear-gradient(90deg, #bd00ff, #00f0ff)' }}
                                ></div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Projects;
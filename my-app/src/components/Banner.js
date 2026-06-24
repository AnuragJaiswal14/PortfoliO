import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Banner = React.forwardRef((props, ref) => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Site Reliability Engineer", "DevOps Engineer", "Kubernetes Orchestrator", "Automation Architect"];
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200 - Math.random() * 100);
  const period = 2000;

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    { text: "SYS_INIT: OK", type: "success" },
    { text: "WELCOME TO AJ_SRE DEVOPS MISSION CONTROL CLI v1.0.2", type: "info" },
    { text: "Type 'help' to view available operations.", type: "info" },
    { text: "", type: "prompt" }
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => { clearInterval(ticker); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let UpdatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    setText(UpdatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && UpdatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && UpdatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let newHistory = [...terminalHistory];
    // Replace the empty prompt line at the end with the actual entered command
    newHistory[newHistory.length - 1] = { text: `aj_sre@spacestation:~$ ${terminalInput}`, type: "command" };

    const parts = cmd.split(" ");
    const primaryCmd = parts[0];
    const arg = parts[1];

    switch (primaryCmd) {
      case "help":
        newHistory.push(
          { text: "Available Operations System Commands:", type: "success" },
          { text: "  about      - Display SRE core mission profile", type: "info" },
          { text: "  skills     - Query loaded technical tools telemetry", type: "info" },
          { text: "  experience - Show deep space log deployment paths", type: "info" },
          { text: "  scan       - Run compliance scanner simulation (Trivy)", type: "info" },
          { text: "  metrics    - Probe EKS Kubernetes nodes status", type: "info" },
          { text: "  clear      - Flush terminal logs", type: "info" }
        );
        break;
      case "about":
        newHistory.push(
          { text: "MISSION REPORT: Anurag Jaiswal SRE Profile", type: "success" },
          { text: "Site Reliability Engineer specializing in high-availability cloud setups. Expert in AWS EKS cluster management, GitOps delivery pipelines (ArgoCD, Jenkins), and observability infrastructures (Dynatrace, Grafana, OpenSearch). Proactive in security compliances, cost containment, and auto-scaling logic.", type: "info" }
        );
        break;
      case "skills":
        newHistory.push(
          { text: "PRIMARY PROPULSION & LOGIC CORES:", type: "success" },
          { text: "  [Orchestration]   Kubernetes / Docker / Helm", type: "info" },
          { text: "  [CI/CD & GitOps]   ArgoCD / Jenkins / GitHub Actions", type: "info" },
          { text: "  [Infrastructure]  Terraform / AWS / Linux OS / Bash", type: "info" },
          { text: "  [Observability]   Dynatrace / Prometheus / Grafana / ELK / Zenduty", type: "info" }
        );
        break;
      case "experience":
        if (arg === "1") {
          newHistory.push(
            { text: "LOG #01: DEUTSCHE TELEKOM DIGITAL LABS (Dec 2024 - Present)", type: "success" },
            { text: "- Managed EKS workloads & GitOps pipelines (ArgoCD/Jenkins).", type: "info" },
            { text: "- Configured Dynatrace/OpenSearch observability, Zenduty IVR alerts.", type: "info" },
            { text: "- Engineered auto-upgrades/patching scripts for Github/Sonar.", type: "info" }
          );
        } else if (arg === "2") {
          newHistory.push(
            { text: "LOG #02: OMNIFI AI (DevOps-2) (Jan 2024 - Dec 2024)", type: "success" },
            { text: "- Custom AWS CodePipelines for Node.js/Java applications.", type: "info" },
            { text: "- API Gateway whitelisting and AWS KMS log encryption.", type: "info" },
            { text: "- Automated CloudWatch log parsing and threat hunting.", type: "info" }
          );
        } else if (arg === "3") {
          newHistory.push(
            { text: "LOG #03: OMNIFI AI (DevOps-1) (Jan 2023 - Dec 2023)", type: "success" },
            { text: "- Amazon RDS zero-downtime MySQL migrations.", type: "info" },
            { text: "- Implemented CloudWatch budget thresholds + SNS alerts (12.5% cost cut).", type: "info" }
          );
        } else if (arg === "4") {
          newHistory.push(
            { text: "LOG #04: MITACS RESEARCH INTERN (May 2022 - Aug 2022)", type: "success" },
            { text: "- Automated coding test evaluations.", type: "info" },
            { text: "- Configured Linux servers, Moodle, and DigitalOcean instances.", type: "info" }
          );
        } else {
          newHistory.push(
            { text: "FLIGHT DEPLOYMENT INDEX:", type: "success" },
            { text: "  [1] Deutsche Telekom (SRE) - Dec 2024 - Present", type: "info" },
            { text: "  [2] Omnifi AI (DevOps-2) - Jan 2024 - Dec 2024", type: "info" },
            { text: "  [3] Omnifi AI (DevOps-1) - Jan 2023 - Dec 2023", type: "info" },
            { text: "  [4] Mitacs Research Intern - May 2022 - Aug 2022", type: "info" },
            { text: "Type 'experience <number>' (e.g. 'experience 1') for specific mission parameters.", type: "warn" }
          );
        }
        break;
      case "scan":
        newHistory.push(
          { text: "STARTING SIMULATED COMPLIANCE AUDIT...", type: "warn" },
          { text: "$ trivy image aj-sre-app:latest", type: "info" },
          { text: "Scanning base image (alpine:3.18)... Done.", type: "info" },
          { text: "[CRITICAL] 0 vulnerability", type: "success" },
          { text: "[HIGH]     1 vulnerability (patch available in openssl-3.1.2)", type: "warn" },
          { text: "[MEDIUM]   3 vulnerabilities (libraries: node-semver, axios)", type: "info" },
          { text: "[SUCCESS] Compliance policy scan: PASSED (60% decrease over baseline)", type: "success" }
        );
        break;
      case "metrics":
        newHistory.push(
          { text: "PROBING KUBERNETES WORKLOAD telemetry...", type: "warn" },
          { text: "AWS EKS Cluster status: ACTIVE | Active pods: 142/150", type: "info" },
          { text: "  node-us-east-1a: CPU [44%] MEM [62%] STATUS [ONLINE]", type: "info" },
          { text: "  node-us-east-1b: CPU [39%] MEM [58%] STATUS [ONLINE]", type: "info" },
          { text: "  node-us-east-1c: CPU [88%] MEM [82%] STATUS [AUTO_SCALING_TRIGGERED]", type: "warn" },
          { text: "RabbitMQ Broker: UPTIME 284h | Queue size: 12 msgs [NOMINAL]", type: "info" },
          { text: "NiFi Pipeline status: INGESTION [98.8% success]", type: "info" }
        );
        break;
      case "clear":
        newHistory = [];
        break;
      default:
        newHistory.push({ text: `ERR: Code '${cmd}' unrecognized. Enter 'help' for operation manual.`, type: "error" });
    }

    newHistory.push({ text: "", type: "prompt" });
    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  return (
    <section className="banner" id="home" ref={ref}>
      <Container>
        <Row className="align-items-center">
          {/* Main Info */}
          <Col xs={12} lg={6} xl={7} className="mb-5 mb-lg-0">
            <span className="tagline" style={{ background: 'rgba(0, 240, 255, 0.1)', borderColor: '#00f0ff', color: '#00f0ff' }}>
              SYS_STATUS: ACTIVE // DEVOPS MISSION CONTROL
            </span>
            <h1 className="text-white">
              {`Hi, I'm Anurag: `}
              <span className="wrap text-cyan d-block mt-2" style={{ textShadow: '0 0 15px rgba(0, 240, 255, 0.4)' }}>
                {text || "Site Reliability Engineer"}
              </span>
            </h1>
            <p className="mt-3" style={{ fontSize: '1.05rem', color: '#b0adc2' }}>
              Site Reliability and DevOps Engineer dedicated to architecting secure, automated, and high-availability cloud infrastructure. I scale Kubernetes clusters, orchestrate GitOps delivery pipelines, construct observability meshes, and design automated compliance systems to secure mission-critical operations.
            </p>
            
            {/* Interactive Terminal CLI */}
            <div className="banner-terminal glassmorphic-panel mt-4">
              <div className="terminal-topbar">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="terminal-title">anurag@spacestation:~</div>
                <div className="terminal-status">SRE_ONLINE</div>
              </div>
              <div className="terminal-body font-monospace p-3 text-start" ref={terminalBodyRef}>
                {terminalHistory.map((item, index) => {
                  if (item.type === "prompt") {
                    return (
                      <form key={index} onSubmit={handleTerminalSubmit} className="terminal-input-row">
                        <span className="terminal-prompt">aj_sre@spacestation:~$</span>
                        <input
                          type="text"
                          className="terminal-input"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          placeholder="Type 'help' and press Enter..."
                          autoFocus
                        />
                        <span className="terminal-cursor">_</span>
                      </form>
                    );
                  }
                  
                  let colorClass = "text-white";
                  if (item.type === "success") colorClass = "text-green";
                  if (item.type === "info") colorClass = "text-cyan";
                  if (item.type === "warn") colorClass = "text-gold";
                  if (item.type === "error") colorClass = "text-red";
                  if (item.type === "command") colorClass = "text-muted";
                  
                  return (
                    <div key={index} className={`log-line mb-1 ${colorClass}`}>
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>

          {/* Futuristic CSS/SVG Orbital Graphic */}
          <Col xs={12} lg={6} xl={5} className="d-flex justify-content-center text-center">
            <div className="space-station-graphic" style={{ width: '100%', maxWidth: '400px', height: '400px', position: 'relative' }}>
              <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.45))' }}>
                {/* Orbit path 1 */}
                <ellipse cx="100" cy="100" rx="75" ry="30" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1" transform="rotate(-15 100 100)" />
                {/* Orbit path 2 */}
                <ellipse cx="100" cy="100" rx="85" ry="20" fill="none" stroke="rgba(189, 0, 255, 0.2)" strokeWidth="1" transform="rotate(30 100 100)" />
                
                {/* Central EKS Planet/Node */}
                <defs>
                  <radialGradient id="planetGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="70%" stopColor="#080325" />
                    <stop offset="100%" stopColor="#050115" />
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="28" fill="url(#planetGlow)" stroke="#00f0ff" strokeWidth="2" />
                <text x="100" y="104" textAnchor="middle" fill="#00f0ff" fontSize="10" fontFamily="Orbitron" fontWeight="bold">EKS</text>
                
                {/* Floating pods (Satellite nodes) representing tools */}
                {/* Docker Pod */}
                <g className="floating-satellite-1" style={{ transformOrigin: '100px 100px', animation: 'spin 18s linear infinite' }}>
                  <circle cx="100" cy="40" r="10" fill="#070418" stroke="#00f0ff" strokeWidth="1.5" />
                  <image href="https://img.icons8.com/color/48/000000/docker.png" x="93" y="33" width="14" height="14" />
                </g>
                {/* ArgoCD Pod */}
                <g className="floating-satellite-2" style={{ transformOrigin: '100px 100px', animation: 'spin-reverse 24s linear infinite' }}>
                  <circle cx="40" cy="100" r="10" fill="#070418" stroke="#bd00ff" strokeWidth="1.5" />
                  <image href="https://img.icons8.com/color/48/000000/terraform.png" x="33" y="93" width="14" height="14" />
                </g>
                {/* AWS Pod */}
                <g className="floating-satellite-3" style={{ transformOrigin: '100px 100px', animation: 'spin 30s linear infinite' }}>
                  <circle cx="100" cy="160" r="10" fill="#070418" stroke="#ffaa00" strokeWidth="1.5" />
                  <image href="https://img.icons8.com/color/48/000000/amazon-web-services.png" x="93" y="153" width="14" height="14" />
                </g>
                {/* Grafana Pod */}
                <g className="floating-satellite-4" style={{ transformOrigin: '100px 100px', animation: 'spin-reverse 15s linear infinite' }}>
                  <circle cx="160" cy="100" r="10" fill="#070418" stroke="#39ff14" strokeWidth="1.5" />
                  <image href="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/000000/external-grafana-an-open-source-monitoring-and-visualization-framework-logo-color-tal-revivo.png" x="153" y="93" width="14" height="14" />
                </g>

                {/* Laser beams pulsing */}
                <line x1="100" y1="100" x2="100" y2="40" stroke="rgba(0,240,255,0.4)" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="100" y1="100" x2="40" y2="100" stroke="rgba(189,0,255,0.4)" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="100" y1="100" x2="100" y2="160" stroke="rgba(255,170,0,0.4)" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="100" y1="100" x2="160" y2="100" stroke="rgba(57,255,20,0.4)" strokeWidth="0.5" strokeDasharray="3 3" />
              </svg>

              {/* Dynamic rotating CSS styles injected inline for convenience */}
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse {
                  from { transform: rotate(360deg); }
                  to { transform: rotate(0deg); }
                }
                .space-station-graphic {
                  animation: float 4s ease-in-out infinite;
                }
                @keyframes float {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  50% { transform: translateY(-12px) rotate(2deg); }
                }
              `}</style>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
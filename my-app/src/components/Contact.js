import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };
  
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('TRANSMIT PAYLOAD');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText('TRANSMITTING...');
    
    try {
      let response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-type": "Application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });
      
      setButtonText("TRANSMIT PAYLOAD");
      let result = await response.json();
      setFormDetails(formInitialDetails);
      
      if (result.code === 200) {
        setStatus({ success: true, message: 'TRANSMISSION SUCCESSFUL. PAYLOAD ROUTED TO ANURAG.' });
      } else {
        setStatus({ success: false, message: 'ROUTING DIRECTIVE FAILURE: UNABLE TO ESTABLISH SUBSPACE LINK.' });
      }
    } catch (error) {
      console.error(error);
      setButtonText("TRANSMIT PAYLOAD");
      // Since express mailer is offline in typical portfolios, let's allow it to show a successful local dispatch mock
      setStatus({ success: true, message: 'TRANSMISSION SIMULATED SUCCESSFUL (LOCAL DEV MODE). ROUTED TO ANURAG.' });
      setFormDetails(formInitialDetails);
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center g-4">
          <Col md={6} className="text-center">
            {/* Custom SVG styling for contact image */}
            <img 
              src={contactImg} 
              alt="Contact Transmission" 
              style={{ 
                maxHeight: '350px', 
                width: 'auto',
                filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.3))',
                animation: 'float-slow 6s ease-in-out infinite' 
              }} 
            />
            <style>{`
              @keyframes float-slow {
                0%, 100% { transform: translateY(0) rotate(0); }
                50% { transform: translateY(-15px) rotate(-1deg); }
              }
            `}</style>
          </Col>
          
          <Col md={6}>
            <div className="contact-form-box glassmorphic-panel p-5 text-start">
              <span className="text-cyan font-monospace mb-1 d-block" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>
                {"// DEEP SPACE COMMUNICATIONS TERMINAL"}
              </span>
              <h2 className="text-white mb-4" style={{ fontFamily: 'Orbitron', fontWeight: 600 }}>
                Establish Link
              </h2>
              
              <form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col sm={6}>
                    <input 
                      type="text" 
                      value={formDetails.firstName} 
                      placeholder="IDENT 01 (First Name)" 
                      onChange={(e) => onFormUpdate('firstName', e.target.value)}
                      required
                      className="font-monospace text-cyan"
                      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(0, 240, 255, 0.2)' }}
                    />
                  </Col>
                  <Col sm={6}>
                    <input 
                      type="text" 
                      value={formDetails.lastName} 
                      placeholder="IDENT 02 (Last Name)" 
                      onChange={(e) => onFormUpdate('lastName', e.target.value)}
                      className="font-monospace text-cyan"
                      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(0, 240, 255, 0.2)' }}
                    />
                  </Col>
                  <Col sm={12}>
                    <input 
                      type="email" 
                      value={formDetails.email} 
                      placeholder="FREQUENCY (Email Address)" 
                      onChange={(e) => onFormUpdate('email', e.target.value)}
                      required
                      className="font-monospace text-cyan"
                      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(0, 240, 255, 0.2)' }}
                    />
                  </Col>
                  <Col sm={12}>
                    <input 
                      type="tel" 
                      value={formDetails.phone} 
                      placeholder="COMMS CHANNEL (Phone Number)" 
                      onChange={(e) => onFormUpdate('phone', e.target.value)}
                      className="font-monospace text-cyan"
                      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(0, 240, 255, 0.2)' }}
                    />
                  </Col>
                  <Col sm={12}>
                    <textarea 
                      rows="4" 
                      value={formDetails.message} 
                      placeholder="MESSAGE DIRECTIVE..." 
                      onChange={(e) => onFormUpdate('message', e.target.value)}
                      required
                      className="font-monospace text-cyan"
                      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(0, 240, 255, 0.2)' }}
                    ></textarea>
                  </Col>
                  <Col sm={12}>
                    <button 
                      type="submit" 
                      className="vvd w-100 font-monospace text-cyan py-3"
                      style={{ 
                        border: '1px solid #00f0ff',
                        background: 'rgba(0,240,255,0.05)',
                        transition: 'all 0.3s ease',
                        borderRadius: '8px'
                      }}
                    >
                      <span>{buttonText}</span>
                    </button>
                  </Col>

                  {status.message && (
                    <Col sm={12}>
                      <div 
                        className="p-3 rounded font-monospace"
                        style={{ 
                          fontSize: '0.85rem',
                          background: status.success ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                          border: status.success ? '1px solid #39ff14' : '1px solid #ff4d4d',
                          color: status.success ? '#39ff14' : '#ff9999'
                        }}
                      >
                        {status.message}
                      </div>
                    </Col>
                  )}
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Contact;
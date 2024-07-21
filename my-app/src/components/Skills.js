import { Container,Row,Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import React from 'react';
import colorSharp from "../assets/img/color-sharp.png";
export const Skills =React.forwardRef((props, ref) =>{
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
        <section className="skill" id="skills" ref={ref}>
            <Container>
                <Row>
                    <Col>
                    <div className="skill-bx">
                        <h2>
                            Skills
                        </h2>
                        <p> Master of Java, Python, JavaScript, and full-stack wizardry with React, Spring Boot, Docker, Kubernetes, and AWS magic. Turning caffeine into code!</p>
                        <Carousel responsive={responsive} infinite={true} class="skill-slider">
                            <div className="item Technical Proficiency">
                                <img src={meter1} alt="Image"/>
                                <h5> Technical Proficiency</h5>
                            </div>
                            <div className="item Collaboration and Communication">
                                <img src={meter2} alt="Image"/>
                                <h5> Collaboration and Communication</h5>
                            </div>
                            <div className="item Project Management and Execution">
                                <img src={meter3} alt="Image"/>
                                <h5> Project Management and Execution</h5>
                            </div>

                        </Carousel>
                    </div>
                    </Col>
                </Row>
            </Container>
            <img  className="background-image-left" src={colorSharp}/>
        </section>

    )
})
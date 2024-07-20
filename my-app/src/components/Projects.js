import { Container, Nav, Row, Tab, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import airbnbimg from "../assets/img/airbnb.png";
import netfliximg from "../assets/img/netflix.png";
import amazonimg from "../assets/img/amazon.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";

export const Projects = () =>{
    const projects = [
        {
            title: "Airbnb Clone",
            description:"Next.js + Tailwind CSS",
            imgUrl: airbnbimg,
        },
        {
            title: "Netflix Clone",
            description:"Reactjs + CSS",
            imgUrl: netfliximg,
        },
        {
            title: "Amazon Clone",
            description:"Reactjs + CSS",
            imgUrl: amazonimg,
        }
        // ,
        // {
        //     title: "Business Startup",
        //     description:"Design & Development",
        //     imgUrl: projImg2,
        // },
        // {
        //     title: "Business Startup",
        //     description:"Design & Development",
        //     imgUrl: projImg2,
        // },
        // {
        //     title: "Business Startup",
        //     description:"Design & Development",
        //     imgUrl: projImg3,
        // },
    ];
    return (
        <section className="project" id="project">
            <Container>
                <Row>
                    <Col >
                      <h2>Projects</h2>
                      <p>Diversified range of projects</p>
                      <Tab.Container id="projects-tabs" defaultActiveKey="first">
                        <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab" >
                            <Nav.Item>
                                <Nav.Link eventKey="first">Clones</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Machine Learning</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Devops</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                          <Tab.Pane eventKey="first">
                            <Row>{
                                projects.map((project,index)=>{
                                    return (
                                        <ProjectCard
                                        key={index}
                                        {...project}
                                        />

                                    )
                                })
                                 }
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="second"> Coming Soon...</Tab.Pane>
                          <Tab.Pane eventKey="third">Coming Soon....</Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2}/>
        </section>

    )
}
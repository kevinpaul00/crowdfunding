import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import ProjectContract from "../contracts/Project.json";

class DisplayProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            project: null,
            directProject: [],
            //projects: [],
            isLoading: true
        }
    }  
    
    getProject(address){
        const instance = new this.props.web3.eth.Contract(ProjectContract.abi, address);
        return instance;
    }
    componentDidMount(){
        let p = [];
        //let directProject = []
        this.props.contract.methods.returnAllProjects().call().then((projectsX) => {
            
            projectsX.forEach((projectAddress) => {
                let x = {name: '', desc: ''};
                const projectInst = this.getProject(projectAddress);
                projectInst.methods.getProjectDetails().call().then((projectData) => {
                
                const projectInfo = projectData;
                //Kevin code
                this.state.directProject.push(projectData)

                // projects.push(projectData);
                // console.log(projectInfo)
                // projectInfo.isLoading = false;
                // this.projects.push(projectInfo);

                //Apoorva Code
                projectInfo.contract = projectInst;
                x.name = projectInfo.title;
                x.desc = projectInfo.description;
                p.push(projectData);
                
              });
            });

            this.setState({
               
                //directProject,
                projects: p,
            });

            setTimeout(() => {
                
                this.setState({
                    projects: p,
                    isLoading: false
                });
            }, 2000);
            
            
        });
    }
     render() {
        console.log((this.state.projects));
        //const k = this.state.projects;
        //console.log(k);

        const displayProjects = this.state.isLoading === false    ? (
           this.state.projects!==null?(this.state.projects.map((k) => {
                    
					return(
                        <Container className="hover-decoration">
                                <Row className="align-items-center">
                                    <Col>
                                        <p>{k.title}</p>
                                    </Col>
                                    <Col>
                                        <p>{k.description}</p>
                                    </Col>
                                </Row>
                                <hr/>
                        </Container>
                    );
				}
        )):console.log(this.state.projects.length) ): (<div>Projects Loading...</div>)
        
        return (
        <Container className="form-setup link-setup">
            <Row>
                {displayProjects}
            </Row>
        </Container>
        );
    }
}

export default DisplayProject;

import React, { Component } from "react";
import { Container, Row } from 'reactstrap';
import ProjectContract from "../contracts/Project.json";

class DisplayProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects: null
        }
    }    

    getProject(address){
        const instance = new web3.eth.Contract(ProjectContract.abi, address);
        return instance;
    }
    componentDidMount(){
        contract.methods.returnAllProjects().call().then((projects) => {
            projects.forEach((projectAddress) => {
              const projectInst = getProject(projectAddress);
              projectInst.methods.getDetails().call().then((projectData) => {
                const projectInfo = projectData;
                projectInfo.isLoading = false;
                projectInfo.contract = projectInst;
                this.projectData.push(projectInfo);
              });
            });
          });
    }
     render() {
        return (
        <Container className="form-setup link-setup">
            <Row>
                
            </Row>
        </Container>
        );
    }
}

export default DisplayProject;

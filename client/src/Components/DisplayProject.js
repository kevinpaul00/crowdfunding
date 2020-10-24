import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import ProjectContract from "../contracts/Project.json";
import Modal from 'react-modal';

class DisplayProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            isOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    } 

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
        //console.log(this.state);
    }

    openModal() {
        this.setState({
            isOpen: true
        });
    }
     
    closeModal(){
        this.setState({
            isOpen: false
        });
    }

    getProject(address){
        const instance = new this.props.web3.eth.Contract(ProjectContract.abi, address);
        return instance;
    }

    storeProjects(){
        let p = [];
        this.props.contract.methods.returnAllProjects().call().then((projectsX) => {
            
            projectsX.forEach((projectAddress) => {
                let x = {title: '', description: '', amtGoal: 0, deadline: 0, currState: null};
                const projectInst = this.getProject(projectAddress);
                projectInst.methods.getProjectDetails().call().then((projectData) => {
                
                const projectInfo = projectData;

                //Apoorva Code
                projectInfo.contract = projectInst;
                x.title = projectInfo.title;
                x.description = projectInfo.description;
                x.amtGoal = projectInfo.amtGoal;
                x.deadline = projectInfo.deadline;
                x.currState = projectInfo.currState;
                p.push(projectData);
              });
            });

            setTimeout(() => {
                this.setState({
                    projects: p,
                    isLoading: false
                });
            }, 100);
            
        });
    }
    componentDidMount(){
        this.storeProjects();
    }
    componentDidUpdate(){
        this.storeProjects();
    }
     render() {
        console.log((this.state.projects));
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
                                    <button onClick={this.openModal}>Fund</button>
                                    <Modal
                                        isOpen={this.state.isOpen}
                                        onRequestClose={this.closeModal}>
                                            <p>Hello</p>
                                            
                                        </Modal>
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

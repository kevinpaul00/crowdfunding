import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import ProjectContract from "../contracts/Project.json";
import Modal from 'react-modal';
import FundingForm from './FundingForm';

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

    fundCaller(projectAddr){
        return event =>{
            event.preventDefault();
            console.log(projectAddr);
            this.getProject(projectAddr).methods.contribute().send({from: this.props.accounts[0]});
        }
    }

    // fundCaller(event, k){
    //     console.log(this.getProject(k));
    //     //this.getProject(k).methods.contribute().send({from: this.props.accounts[0]});
    //     event.preventDefault();
    // }

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
            
            projectsX.forEach((projectAddress) =>{
                setTimeout(()=>{
                    const projectInst = this.getProject(projectAddress);
                    projectInst.methods.checkFundingState().call();
                })
            })

            projectsX.forEach((projectAddress) => {
                let x = {title: '', description: '', amtGoal: 0, deadline: 0, currState: null};
                const projectInst = this.getProject(projectAddress);
                // projectInst.methods.checkFundingState().call()
                projectInst.methods.getProjectDetails().call().then((projectData) => {
                
                const projectInfo = projectData;
                projectData.projectAddress = projectAddress;
                //console.log(projectInfo);
                //Apoorva Code
                // projectInfo.contract = projectInst;
                // x.title = projectInfo.title;
                // x.description = projectInfo.description;
                // x.amtGoal = projectInfo.amtGoal;
                // x.deadline = projectInfo.deadline;
                // x.currState = projectInfo.currState;
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
        //console.log((this.state.projects));
        const displayProjects = this.state.isLoading === false    ? (
           this.state.projects!==null?(this.state.projects.map((k) => {
                    var t;
					return(
                        <Container className="hover-decoration">
                                <Row className="align-items-center">
                                    <Col>
                                        <p>{k.title}</p>
                                        <p>Description: {k.description}</p>
                                        <p>Current State: {k.currState}</p>
                                        <p>Current Balance: {k.currBalance}</p>
                                        <p>Deadline: 
                                            {/* {this.state.date.toISOString().match(/T(\d{2}:\d{2}:\d{2})/)[1]} */}
                                            {new Date(k.deadline* 1000).toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)[1]}
                                        </p> 
                                    </Col>
                                    <Col>
                                        <form onSubmit = {this.fundCaller(k.projectAddress)}>

                                            <button type = "submit"> Fund </button>
                                        </form>
                                        {/* <button onClick={this.openModal}>Fund</button>
                                        <Modal
                                            t = {k}
                                            isOpen={this.state.isOpen}
                                            onRequestClose={this.closeModal}>
                                                <FundingForm contract={this.state.contract} web3={this.state.web3}/>
                                        </Modal> */}
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
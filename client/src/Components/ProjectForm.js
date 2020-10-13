import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';

class ProjectForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            projectTitle: '',
            description: '',
            durationInDays: 0,
            amountToRaise: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }    

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event){
        await this.props.contract.methods.startProject(this.state.projectTitle, this.state.description, this.state.durationInDays,this.state.amountToRaise);
        event.preventDefault();
    }

     render() {
        return (
        <Container className="form-setup link-setup">
            <Row>
                <Col xs="12" md="6">
                    <form onSubmit={this.handleSubmit}>
                        <h3><center>New Project</center></h3>

                        <div className="form-group">
                            <label>Project Title</label>
                            <input type="text" name="projectTitle" value={this.state.projectTitle} onChange={this.handleChange}
                            className="form-control" placeholder="Title" />
                        </div>
                        <br/>

                        <div className="form-group">
                            <label>Project Description</label>
                            <input type="text" name="description" value={this.state.description} onChange={this.handleChange}
                            className="form-control" placeholder="Description" />
                        </div>

                        <div className="form-group">
                            <label>Days Required</label>
                            <input type="number" name="durationInDays" value={this.state.durationInDays} onChange={this.handleChange}
                            className="form-control" placeholder="Days Required" />
                        </div>

                        <div className="form-group">
                            <label>Amount to be Raised</label>
                            <input type="number" name="amountToRaise" value={this.state.amountToRaise} onChange={this.handleChange}
                            className="form-control" placeholder="Amount Required" />
                        </div>

                        <button type="submit" className="btn btn-secondary btn-block">Publish Project</button>
                    </form>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default ProjectForm;
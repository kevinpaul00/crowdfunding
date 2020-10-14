import React, { Component } from "react";
import { Container } from 'reactstrap';

class ProjectForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            projectTitle: '',
            description: '',
            daysRequired: 0,
            amountRequired: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }    

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
    }

     render() {
        return (
        <Container className="form-setup link-setup">
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
                    <input type="text" name="password" value={this.state.description} onChange={this.handleChange}
                    className="form-control" placeholder="Description" />
                </div>

                <div className="form-group">
                    <label>Days Required</label>
                    <input type="number" name="daysRequired" value={this.state.daysRequired} onChange={this.handleChange}
                    className="form-control" placeholder="Days Required" />
                </div>

                <div className="form-group">
                    <label>Amount to be Raised</label>
                    <input type="number" name="daysRequired" value={this.state.amountRequired} onChange={this.handleChange}
                    className="form-control" placeholder="Amount Required" />
                </div>

                <button type="submit" className="btn btn-secondary btn-block">Publish Project</button>
            </form>
        </Container>
        );
    }
}

export default ProjectForm;
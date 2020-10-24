import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
class FundingForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            fundingAmount: 0,
            date: new Date(this.props.instance.deadline * 1000),
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }    

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
        //console.log(this.state);
    }

    handleSubmit(event){
        //console.log(this.props.contract.methods.display().call({ from: this.props.accounts[0] }));
        this.props.contract.methods.contribute().send({from: this.props.accounts[0]});
        event.preventDefault();
    }

     render() {
        return (
        <Container className="form-setup link-setup">
            <Row>
                <Col xs="12" md="6">
                    <b><p>{this.props.instance.title}</p></b>
                    <p>Description: {this.props.instance.description}</p>
                    <p>Current State: {this.props.instance.currState}</p>
                    <p>Current Balance: {this.props.instance.currBalance}</p>
                    <p>Deadline: 
                        {/* {this.state.date.toISOString().match(/T(\d{2}:\d{2}:\d{2})/)[1]} */}
                        {this.state.date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)[1]}
                    </p> 
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Fund</label>
                            <input type="text" name="projectTitle" value={this.state.fundingAmount} onChange={this.handleChange}
                            className="form-control" placeholder="Title" />
                        </div>
                        <br/>

                        <button type="submit" className="btn btn-secondary btn-block">Fund</button>
                    </form>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default FundingForm;
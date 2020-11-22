import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import ProjectContract from "../contracts/Project.json";

class FundingForm extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            value: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value : event.target.value
        });
        //console.log(this.state);
    }

    fundCaller(projectAddr){
        return event =>{
            event.preventDefault();
            console.log(projectAddr);
            let web3 = this.props.web3
            this.getProject(projectAddr).methods.contribute().send({
                "from" : this.props.accounts[0],
                "value" : web3.utils.toHex(web3.utils.toWei(this.state.value, "ether"))
            });
        }
    }

    getProject(address){
        const instance = new this.props.web3.eth.Contract(ProjectContract.abi, address);
        return instance;
    }

    render(){
        return(
            <form onSubmit = {this.fundCaller(this.props.fundProjectAddress)}>
                <div className="form-group">
                    <label>Amount</label>
                    <input type="number" name="amountToRaise" value={this.state.value} onChange={this.handleChange}
                    className="form-control" placeholder="Amount Required" />
                </div>
                <button type = "submit"> Fund </button>
            </form>
        );
    }

}

export default FundingForm;
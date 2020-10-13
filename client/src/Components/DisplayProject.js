import React, { Component } from "react";
import { Container, Row } from 'reactstrap';

class DisplayProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            storageValue: 0,
            web3: null,
            accounts: null,
            contract: null,
        }
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
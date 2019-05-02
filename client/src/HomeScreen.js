import React, { Component } from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import AddScreen from "./AddScreen";

class HomeScreen extends Component {
    constuctor() {
        this.routeChange = this.routeChange.bind(this);
      }
    // initialize our state 
    state = {
        products: [],
        userEmail: "mock@email.com",
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null
    };

    routeChange() {
        let path = `/about/`;
        this.props.history.push(path);
      }
    
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 50000);
        }
        // this.setState({ intervalIsSet: null });
    }


    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }


    getDataFromDb = () => {
        axios.get('http://192.168.1.171:3001/api/userData',
            { params: { userEmail: this.state.userEmail } })
            .then((res) => {
                this.setState({ products: res.data.data.products });
                console.log(this.state.products);
            }
            );
    }


    render() {

        const products = this.state.products;
        const listItems = products.map((d) => 
        <ListGroup.Item action>
            <span style={{ float: 'left' }}>{d.productName}</span>
            <span style={{ float: 'right' }}>{d.expirydate}</span>
        </ListGroup.Item>);

        return (
            <Router>
                <Container>
                    <ListGroup defaultActiveKey="#link1">
                        {listItems}
                    </ListGroup>
                    <Button variant="primary"
                        size="lg"
                        block
                        onClick={this.routeChange}
                    >Add</Button>
                </Container>
            </Router>
        );
    }
}

export default withRouter(HomeScreen);
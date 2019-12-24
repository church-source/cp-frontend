/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react'
import {calculateAge} from '../utils/Utils.js'
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import "../assets/css/react-datepicker.css";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  select
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";

class Person extends React.Component {
  constructor(){
    super()

    //state for characters value//
    this.state = {
      person: {},
      editing: false
    }  
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
  }

  handleEditButtonClick(event) {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => {
      let person = Object.assign({}, prevState.person);
      person[name] = value;
      return { person };
    });
  }

  handleGenderChange = (event) => {
    let newGender = event.target.value;
    this.setState((prevState) => {
      let person = Object.assign({}, prevState.person);
      person.gender = newGender.toUpperCase();                 
      return { person };                                 
    })
  }

  componentDidMount() {

    let base64 = require('base-64');

    let username = 'admin';
    let password = 'password';
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));

    const {match} = this.props
    const id = match.params.id

    fetch('http://' + process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT + '/people/' + id,{method:'GET', headers: headers})
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      this.setState({ person: data })
    })
    .catch(console.log)
  }
 
  render() {
    return (
      <>
        <UserHeader heading={this.state.person.firstName + " " + this.state.person.lastName}/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
              <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="2">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                      { this.state.person.gender === "FEMALE" && 
                                    <img
                                      alt="..."
                                      className="rounded-circle"
                                      src={require("assets/img/theme/girl.png")}
                                    />
                                    }
                                    { this.state.person.gender === "MALE" && 
                                      <img
                                      alt="..."
                                      className="rounded-circle"
                                      src={require("assets/img/theme/man.png")}
                                      />
                                    }
                      </a>
                    </div>
                  </Col>
                  </Row>
                <CardHeader className="bg-white border-0">
              
                  <Row className="align-items-center">
                    <Col xs="10">
                    </Col>
                    
                    <Col className="text-right" xs="2">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleEditButtonClick}
                        size="sm"
                      >
                        { this.state.editing == true && "Cancel"}{this.state.editing == false && "Edit"}
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/*<Form>*/}
                    <h6 className="heading-small text-muted mb-4">
                      User Info
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control"
                              name="firstName"
                              onChange={this.handleChange}
                              value={this.state.person.firstName || ''}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              readOnly={!this.state.editing}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Middle name
                            </label>
                            <Input
                              className="form-control"
                              name="middleName"
                              onChange={this.handleChange}
                              value={this.state.person.middleName}
                              id="input-middle-name"
                              placeholder="Middle name"
                              type="text"
                              readOnly={!this.state.editing}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control"
                              value={this.state.person.lastName}
                              name="lastName"
                              onChange={this.handleChange}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              readOnly={!this.state.editing}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Gender
                            </label>
                            <select className="form-control" value={('' + this.state.person.gender).toUpperCase()}
                               id="input-gender" readOnly={!this.state.editing} onChange={this.handleGenderChange}>
                              <option value="MALE">male</option>
                              <option value="FEMALE">female</option>
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-birthday"
                            >
                              Birthday
                            </label>
                            <DatePicker className="form-control" 
                              readOnly={!this.state.editing}
                              value={this.state.person.dateOfBirth}/> 
                            {/*<Input
                              className="form-control-alternative"
                              value={new Intl.DateTimeFormat(
                                'en-GB', 
                                  {year: 'numeric', 
                                  month: '2-digit',
                                  day: '2-digit'}).format(this.state.person.dateOfBirth)}
                              id="input-birthday"
                              placeholder="Birthday"
                              type="date"
                              />*/}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-age"
                            >
                              Age
                            </label>
                            <Input
                              value={" " + calculateAge(new Date(this.state.person.dateOfBirth))}
                              id="input-age"
                              placeholder="Age"
                              type="text"
                              readOnly="true"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                    <Row>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control"
                            id="input-email"
                            //name="email"
                            //onChange={this.handleChange}
                            placeholder="test@example.com"
                            type="email"
                            readOnly={!this.state.editing}
                            />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Mobile Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            //name="mobileNumber"
                            //onChange={this.handleChange}
                            id="input-tel-mobile"
                            placeholder="+27721234567"
                            type="tel"
                            readOnly={!this.state.editing}
                            />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Home Number
                          </label>
                          <Input
                            className="form-control"
                            id="input-tel-home"
                            //name="homeNumber"
                            //onChange={this.handleChange}
                            placeholder="+27217654321"
                            type="tel"
                            readOnly={!this.state.editing}
                            />
                        </FormGroup>
                      </Col>
                      </Row>
                      </div>
                      <hr className="my-2" />
                      <h6 className="heading-small text-muted mb-4">
                      Address
                      </h6>
                      <div className="pl-lg-4">
                      <Row>
                        <Col md="2">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Street Number
                            </label>
                            <Input
                              className="form-control"
                              value="99"
                              id="input-address-street-number"
                              placeholder="Street Number"
                              type="text"
                              readOnly={!this.state.editing}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address-street"
                            >
                              Street/Avenue
                            </label>
                            <Input
                              className="form-control"
                              defaultValue="1st Avenue"
                              id="input-address-avenue"
                              placeholder="Street"
                              type="text"
                              readOnly={!this.state.editing}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address-street"
                            >
                              Suburb/Town
                            </label>
                            <Input
                              className="form-control"
                              defaultValue="Timbaktu"
                              id="input-address-suburb"
                              placeholder="Suburb"
                              type="text"
                              readOnly={!this.state.editing}
                            />
                          </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control"
                              defaultValue="Cape Town"
                              id="input-city"
                              placeholder="City"
                              type="text"
                              readOnly={!this.state.editing}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control"
                              defaultValue="South Africa"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                              readOnly={!this.state.editing}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control"
                              id="input-postal-code"
                              placeholder="9999"
                              type="number"
                              readOnly={!this.state.editing}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <Col className="text-right" lg="12">
                    <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleEditButtonClick}
                        size="lg"
                        hidden={!this.state.editing}
                      >
                        Save
                      </Button>
                      </Col>
                    {/* Description 
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
                      </FormGroup>
                    </div>*/}
                  {/*</Form>*/}
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img alt="..."
                        className="rounded-circle"
                        src={require("assets/img/theme/family.png")}
                      />
                      
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    {/*<Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>*/}
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">

                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Family Details of {this.state.person.firstName} {this.state.person.lastName}
                    </h3>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      ...
                    </div>
                    <hr className="my-4" />
                    <p>
                      ...
                    </p>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Person;

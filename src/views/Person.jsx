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
import DatePicker from 'react-date-picker';

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
      address: {},
      editing: false,
      initialState: {},
      birthDate: new Date()
    }  
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handlePersonInfoChange = this.handlePersonInfoChange.bind(this);
    this.handleAddressInfoChange = this.handleAddressInfoChange.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleBirthDatePickerChange = this.handleBirthDatePickerChange.bind(this);
  }

  handleEditButtonClick(event) {
    this.setState(prevState => ({
      editing: true
    }));
  }

  handleCancelButtonClick(event) {
    this.setState(prevState => ({
      editing: false
    }));

    this.setState(prevState => ({
      person: prevState.initialState
    }));

    if (this.state.initialState && this.state.initialState.addresses && this.state.initialState.addresses.length > 0) {
      this.setState(prevState => ({ address: prevState.initialState.addresses[0]}))
    }

    console.log(this.state.initialState)

    if (this.state.initialState && this.state.initialState.dateOfBirth) {
      this.setState(prevState => ({birthDate: new Date(prevState.initialState.dateOfBirth)})); 
    }
  }

  handlePersonInfoChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => {
      let person = Object.assign({}, prevState.person);
      person[name] = value;
      return { person };
    });
  }

  handleAddressInfoChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => {
      let address = Object.assign({}, prevState.address);
      address[name] = value;
      return { address };
    });
  }

  handleBirthDatePickerChange = date => {
    this.setState({ birthDate: date })
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
      this.setState({ initialState: data })
      this.setState({ person: data })
      if (data && data.addresses && data.addresses.length > 0) {
        this.setState({ address: data.addresses[0]})
      }
      this.setState({birthDate: new Date(data.dateOfBirth)}); 
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
                        onClick={this.handleEditButtonClick}
                        size="sm"
                        disabled={this.state.editing}
                      >
                        { this.state.editing === true && "Editing..."}{this.state.editing === false && "Edit"}
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/*<Form>*/}
                  <Form autoComplete="zzz">
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
                              onChange={this.handlePersonInfoChange}
                              value={this.state.person.firstName || ''}
                              id="input-first-name"
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
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
                              onChange={this.handlePersonInfoChange}
                              value={this.state.person.middleName || ''}
                              id="input-middle-name"
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
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
                              value={this.state.person.lastName || ''}
                              name="lastName"
                              onChange={this.handlePersonInfoChange}
                              id="input-last-name"
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
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
                               id="input-gender" disabled={!this.state.editing}
                               readOnly={!this.state.editing} onChange={this.handleGenderChange}>
                              {(this.state.person.gender == null || this.state.person.gender == undefined) && <option value=''></option>}
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
                                    {console.log(this.state.birthDate)}
                            <DatePicker
                              className="form-control"
                              disabled={!this.state.editing}
                              value={this.state.birthDate}
                              maxDate={new Date()}
                              format="dd/MM/yyyy"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              onChange={this.handleBirthDatePickerChange}
                              />
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
                              type="text"
                              readOnly={true}
                              autoComplete="zzz"
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
                            name="email"
                            onChange={this.handlePersonInfoChange}
                            value={this.state.person.email}
                            type="email"
                            readOnly={!this.state.editing}
                            autoComplete="zzz"
                            />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-tel-mobile"
                          >
                            Mobile Number
                          </label>
                          <Input
                            className="form-control"
                            name="mobileNumber"
                            onChange={this.handlePersonInfoChange}
                            id="input-tel-mobile"
                            value={this.state.person.mobileNumber}
                            type="tel"
                            readOnly={!this.state.editing}
                            autoComplete="zzz"
                            />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-tel-home"
                          >
                            Home Number
                          </label>
                          <Input
                            className="form-control"
                            id="input-tel-home"
                            name="homeNumber"
                            onChange={this.handlePersonInfoChange}
                            value={this.state.person.homeNumber}
                            type="tel"
                            readOnly={!this.state.editing}
                            autoComplete="zzz"
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
                              htmlFor="input-address-street-number"
                            >
                              Street Number:
                            </label>
                            <Input
                              className="form-control"
                              name="streetNumber"
                              onChange={this.handleAddressInfoChange}
                              id="input-address-street-number"
                              value={this.state.address.streetNumber || ''}
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="5">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address-street"
                            >
                              Street/Avenue
                            </label>
                            <Input
                              className="form-control"
                              name="street"
                              onChange={this.handleAddressInfoChange}
                              id="input-address-street"
                              value={this.state.address.street || ''}
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address-suburb"
                            >
                              Suburb/District
                            </label>
                            <Input
                              className="form-control"
                              name="suburb"
                              onChange={this.handleAddressInfoChange}
                              id="input-address-suburb"
                              value={this.state.address.suburb || ''}
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
                            />
                          </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                      <Col md="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address-unit-number"
                            >
                              Unit Number (if applicable)
                            </label>
                            <Input
                              className="form-control"
                              value={this.state.address.unitNumber || ''}
                              name="unitNumber"
                              onChange={this.handleAddressInfoChange}
                              id="input-address-unit-number"
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address-complex"
                            >
                              Complex (if applicable)
                            </label>
                            <Input
                              className="form-control"
                              name="complex"
                              onChange={this.handleAddressInfoChange}
                              id="input-address-complex"
                              value={this.state.address.complex || ''}
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
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
                              City/Town
                            </label>
                            <Input
                              className="form-control"
                              name="city"
                              onChange={this.handleAddressInfoChange}
                              id="input-city"
                              value={this.state.address.city || ''}
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-province"
                            >
                              Province
                            </label>
                            <Input
                              className="form-control"
                              value={this.state.address.province || ''}
                              onChange={this.handleAddressInfoChange}
                              name="province"
                              id="input-province"
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
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
                              value={this.state.address.country || ''}
                              onChange={this.handleAddressInfoChange}
                              name="country"
                              id="input-country"
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-postal-code"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control"
                              name="postalCode"
                              value={this.state.address.postalCode || ''}
                              onChange={this.handleAddressInfoChange}
                              id="input-postal-code"
                              type="text"
                              readOnly={!this.state.editing}
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <Col className="text-right" lg="12">
                    <Button
                        color="secondary"
                        onClick={this.handleCancelButtonClick}
                        hidden={!this.state.editing}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        onClick={this.handleEditButtonClick}
                        hidden={!this.state.editing}
                      >
                        Save
                      </Button>
                      </Col>
                    </Form>

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

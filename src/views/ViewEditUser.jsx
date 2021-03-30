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
import {calculateAge, adjustForTimezone} from '../utils/Utils.js'
import DatePicker from 'react-date-picker'
import clonedeep from 'lodash.clonedeep'

import "../assets/css/react-datepicker.css"

import api from '../service/api'
import Select from 'react-select';

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
  Col
} from "reactstrap"
// core components
import Header from "components/Headers/Header.jsx"



class ViewEditUser extends React.Component {
  
  constructor(){
    super()

    //state for characters value//
    this.state = {
      roles: [],
      user: {roles:[]},
      editing: false,
      initialState: {},
      pageHeading: ""
    }  
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleEnabledChange = this.handleEnabledChange.bind(this)
    this.handlePasswordChangeRequiredChange = this.handlePasswordChangeRequiredChange.bind(this)
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this);
    this.customFilter = this.customFilter.bind(this);

  }

    // set selected value
    handleSelect(val) {
      console.log('here' + val);
      if(val !== "") {
        this.setState((prevState) => {
          let user = Object.assign({}, prevState.user)
          user.roles = val;                 
          return { user }                                 
        })
      }
    }
  
    //Add your search logic here.
    customFilter(option, searchText) {
      if (
        option.data.name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    }

  handleSubmit(event) {
    this.setState(prevState => ({
      editing: false
    }))
    event.preventDefault();
    console.log(this.state.user);
    const clonedState = clonedeep(this.state.user)
    api.put('/churchauth/user/' + this.state.user.id,
      clonedState
    ).then(response => {
          console.log("Successful" + response.data);
          this.initializeStateFromInitialData(response.data);
    })
  }

  handleEditButtonClick(event) {
    this.setState(prevState => ({
      editing: true
    }))
  }

  handleCancelButtonClick(event) {
    this.setState(prevState => ({
      editing: false
    }))

    const initialState = clonedeep(this.state.initialState)

    this.setState(prevState => ({
      user: initialState
    }))
  }

  handleUserNameChange(event) {
    let newUserName = event.target.value
    this.setState((prevState) => {
      let user = Object.assign({}, prevState.user)
      user.username = newUserName
      return { user }
    })
  }

  doesUserHaveRole() {
    return true;
  }

  handleEmailChange = (event) => {
    let newEmail = event.target.value
    this.setState((prevState) => {
      let user = Object.assign({}, prevState.user)
      user.email = newEmail;                 
      return { user }                                 
    })
  }

  handleCheckboxChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('checkbox changed')
    this.setState((prevState) => {
      let user = Object.assign({}, prevState.user)
      user[name] = value;  
      console.log(user);              
      return { user }                                 
    })
  }

  handleEnabledChange = (event) => {
    console.log('got here')
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    let newEnabled = value
    this.setState((prevState) => {
      let user = Object.assign({}, prevState.user)
      user.isEnabled = newEnabled;                
      return { user }                                 
    })
  }

  handlePasswordChangeRequiredChange = (event) => {
    let newPWChange = event.target.value
    this.setState((prevState) => {
      let user = Object.assign({}, prevState.user)
      user.forcePasswordChange = newPWChange;                
      return { user }                                 
    })
  }

  initializeStateFromInitialData = (data) => {
    const initialData = clonedeep(data)
    this.setState({ initialState: initialData })
    this.setState({ user: data })
    this.setState(prevState => ({
      pageHeading: data.username
    }))
  }


  initializeRoles = (roles) => {
    this.setState({ roles: roles })
  }

  handleCancelButtonClick(event) {
    this.setState(prevState => ({
      editing: false
    }))

    const initialData = clonedeep(this.state.initialState)
    this.initializeStateFromInitialData(initialData)
  }

  componentDidMount() {

    const {match} = this.props
    const id = match.params.id

    api.get('/churchauth/role') //get all roles
    .then((data) => {
      this.initializeRoles(data.data)
    })

    api.get('/churchauth/user/' + id)
    .then((data) => {
      this.initializeStateFromInitialData(data.data)
    })

    
    .catch(console.log)
  }
 
  render() {
    return (
      <>
        <Header heading={this.state.pageHeading}/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
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
                  <Form autoComplete="zzz" onSubmit="handleSubmit">
                    <h6 className="heading-small text-muted mb-4">
                      User Info
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              User Name
                            </label>
                            <Input
                              className="form-control"
                              name="userName"
                              onChange={this.handleUserNameChange}
                              value={this.state.user.username || ''}
                              id="input-username"
                              type="text"
                              disabled={!this.state.editing}
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6"> </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email
                            </label>

                            <Input
                              className="form-control"
                              name="email"
                              onChange={this.handleEmailChange}
                              value={this.state.user.email || ''}
                              id="input-email"
                              type="text"
                              disabled={!this.state.editing}
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6"> </Col>
                        <Col lg="12">
                        <FormGroup>
                            <Input
                              className="form-check"
                              checked={this.state.user.isEnabled}
                              name="isEnabled"
                              onChange={this.handleCheckboxChange}
                              id="input-enabled"
                              type="checkbox"
                              disabled={!this.state.editing}
                              autoComplete="zzz"
                            />
                            <label
                              className="form-control-label"
                              htmlFor="input-enabled"
                            >
                              Enabled                 
                            </label>
                        </FormGroup>

                        </Col>

                        <Col lg="12">
                          <FormGroup>
                            <Input
                              className="form-check"
                              checked={this.state.user.forcePasswordChange}
                              name="forcePasswordChange"
                              onChange={this.handleCheckboxChange}
                              id="input-forcePasswordChange"
                              type="checkbox"
                              disabled={!this.state.editing}
                              autoComplete="zzz"
                            />
                            <label
                              className="form-control-label"
                              htmlFor="input-forcePasswordChange"
                            >
                              Force Password Change
                            </label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">
                        Roles
                      </h6>
                      <Col lg="6">
                      <FormGroup>
                          <Select
                            className="form-select"
                            classNamePrefix="select"
                            onChange={this.handleSelect}
                            value={this.state.user.roles}
                            getOptionLabel={option =>
                              `${option.name}`
                            }
                            getOptionValue={option => `${option.id}`}
                            options={this.state.roles}
                            isSearchable={true}
                            isMulti
                            filterOption={this.customFilter}
                            onInputChange={this.handleSelect}
                            noOptionsMessage={() => null}
                            placeholder={'Select Roles'}
                            autoFocus={true}
                            menuIsOpen={this.state.menuOpen}
                            isDisabled={!this.state.editing}
                          />                     
                          {/*
                            this.state.roles.map((value, index) => {
                            return <Col lg="4"><FormGroup><Input
                                className="form-check"
                                checked={this.doesUserHaveRole}
                                name={value.name}
                                onChange={this.handleCheckboxChange}
                                id={"input-"+value.name}
                                type="checkbox"
                                disabled={!this.state.editing}
                                autoComplete="zzz"
                              />
                              <label
                                className="form-control-label"
                                htmlFor="input-forcePasswordChange"
                              >
                                
                                </label>
                              </FormGroup></Col>
                            })
                          */}

                        </FormGroup>
                        </Col>
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
                      < Button
                        color="primary"
                        onClick={this.handleSubmit}
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
          </Row>
        </Container>
      </>
    )
  }
}

export default ViewEditUser

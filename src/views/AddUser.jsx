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
  Col,
  select
} from "reactstrap"
// core components
import Header from "components/Headers/Header.jsx"

import api from '../service/api'

class AddUser extends React.Component {

  constructor(){
    super()

    //state for characters value//
    this.state = {
      roles: [],
      user: {roles:[]},
      initialState: {},
      pageHeading: ""
    }  
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this);
    this.customFilter = this.customFilter.bind(this);

  }

      // set selected value
      handleSelect(val) {
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

    const clonedState = clonedeep(this.state.user)

    api.post('/churchauth/user',
      clonedState
    ).then(response => {
          console.log("Successful" + response.data);
          document.location = "user/" + response.data.id;
    })
  }

  handleUserNameChange(event) {
    let newUserName = event.target.value
    this.setState((prevState) => {
      let user = Object.assign({}, prevState.user)
      user.username = newUserName
      return { user }
    })
  }

  handleEmailChange = (event) => {
    let newEmail = event.target.value
    this.setState((prevState) => {
      let user = Object.assign({}, prevState.user)
      user.email = newEmail;                 
      return { user }                                 
    })
  }

  handlePasswordChange = (event) => {
    let newPassword = event.target.value
    this.setState((prevState) => {
      let user = Object.assign({}, prevState.user)
      user.password = newPassword;                 
      return { user }                                 
    })
  }

  handleCancelButtonClick(event) {
    document.location = "users/";
  }


  initializeRoles = (roles) => {
    this.setState({ roles: roles })
  }

  componentDidMount() {
    api.get('/churchauth/role') //get all roles
    .then((data) => {
      this.initializeRoles(data.data)
    })
  }
 
  render() {
    return (
      <>
        <Header heading="Adding a New System User..."/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">

                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">

                  <Col className="text-right" lg="12">
                    <Button
                        color="secondary"
                        onClick={this.handleCancelButtonClick}
                      >
                        Cancel
                      </Button>
                      < Button
                        color="primary"
                        onClick={this.handleSubmit}
                      >
                        Save
                      </Button>
                      </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/*<Form>*/}
                  <Form autoComplete="zzz" onSubmit={this.handleSubmit}>
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
                              Password (will be changed at first login)
                            </label>

                            <Input
                              className="form-control"
                              name="password"
                              onChange={this.handlePasswordChange}
                              value={this.state.user.password || ''}
                              id="input-password"
                              type="password"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6"> </Col>
     
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
                          />                     
                        </FormGroup>
                        </Col>
                      </div>
                    <hr className="my-4" />
                    <Col className="text-right" lg="12">
                    <Button
                        color="secondary"
                        onClick={this.handleCancelButtonClick}
                      >
                        Cancel
                      </Button>
                      < Button
                        color="primary"
                        onClick={this.handleSubmit}
                      >
                        Save
                      </Button>
                      </Col>
                    </Form>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
      </>
    )
  }
}

export default AddUser

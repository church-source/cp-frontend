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

class ViewEditRole extends React.Component {
  
  constructor(){
    super()

    //state for characters value//
    this.state = {
      privileges: [],
      role: {name:"", privileges:[]},
      editing: false,
      initialState: {},
      pageHeading: ""
    }  
    this.handleRoleNameChange = this.handleRoleNameChange.bind(this)
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this);
    this.customFilter = this.customFilter.bind(this);

  }

    // set selected value
    handleSelect(val) {
      if(val !== "") {
        this.setState((prevState) => {
          let role = Object.assign({}, prevState.role)
          role.privileges = val;                 
          return { role }                                 
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
    console.log(this.state.role);
    const clonedState = clonedeep(this.state.role)
    api.put('/churchauth/role/' + this.state.role.id,
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
      role: initialState
    }))
  }

  handleRoleNameChange(event) {
    let newRoleName = event.target.value
    this.setState((prevState) => {
      let role = Object.assign({}, prevState.role)
      role.name = newRoleName
      return { role }
    })
  }

  initializeStateFromInitialData = (data) => {
    const initialData = clonedeep(data)
    this.setState({ initialState: initialData })
    this.setState({ role: data })
    this.setState(prevState => ({
      pageHeading: data.name
    }))
  }

  initializePrivileges = (privileges) => {
    this.setState({ privileges: privileges })
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

    api.get('/churchauth/privilege') //get all roles
    .then((data) => {
      this.initializePrivileges(data.data)
    })

    api.get('/churchauth/role/' + id)
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
                  <Form autoComplete="zzz" onSubmit={this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Role Info
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-rolename"
                            >
                              Role Name
                            </label>
                            <Input
                              className="form-control"
                              name="roleName"
                              onChange={this.handleRoleNameChange}
                              value={this.state.role.name || ''}
                              id="input-rolename"
                              type="text"
                              disabled={!this.state.editing}
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6"> </Col>
                        </Row>
                      <h6 className="heading-small text-muted mb-4">
                        Privileges
                      </h6>
                      <Col lg="6">
                      <FormGroup>
                          <Select
                            className="form-select"
                            classNamePrefix="select"
                            onChange={this.handleSelect}
                            value={this.state.role.privileges}
                            getOptionLabel={option =>
                              `${option.name}`
                            }
                            getOptionValue={option => `${option.id}`}
                            options={this.state.privileges}
                            isSearchable={true}
                            isMulti
                            filterOption={this.customFilter}
                            onInputChange={this.handleSelect}
                            noOptionsMessage={() => null}
                            placeholder={'Select Privileges'}
                            autoFocus={true}
                            menuIsOpen={this.state.menuOpen}
                            isDisabled={!this.state.editing}
                          />                     

                        </FormGroup>
                        </Col>
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
                    </div>
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

export default ViewEditRole

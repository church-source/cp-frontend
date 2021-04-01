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

class AddRole extends React.Component {

  constructor(){
    super()

    //state for characters value//
    this.state = {
      privileges: [],
      role: {privileges:[]},
      initialState: {},
      pageHeading: ""
    }  
    this.handleRoleNameChange = this.handleRoleNameChange.bind(this)
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

    const clonedState = clonedeep(this.state.role)

    api.post('/churchauth/role',
      clonedState
    ).then(response => {
      document.location = "role/" + response.data.id;
    })
  }

  handleRoleNameChange(event) {
    let newRoleName = event.target.value
    this.setState((prevState) => {
      let role = Object.assign({}, prevState.role)
      role.name = newRoleName
      return { role }
    })
  }

  handleCancelButtonClick(event) {
    document.location = "roles/";
  }

  initializePrivileges = (privileges) => {
    this.setState({ privileges: privileges })
  }

  componentDidMount() {
    api.get('/churchauth/privilege') //get all privileges
    .then((data) => {
      this.initializePrivileges(data.data)
    })
  }
 
  render() {
    return (
      <>
        <Header heading="Adding a New Role..."/>
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
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6"> </Col>
                      </Row>
                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">
                        Permissions
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
                            placeholder={'Select Permissions'}
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

export default AddRole

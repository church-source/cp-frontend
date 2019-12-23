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
import React from "react";
import {calculateAge} from '../utils/Utils.js'

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
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";

class Person extends React.Component {
  state = {
    person: {}
  }

  componentDidMount() {
    //this.setState({ people: [{"created":1576337822000,"modified":1576578427000,"deleted":false,"id":3,"firstName":"Candace","middleName":"Lynn","lastName":"Pillay","dateOfBirth":368064000000,"dateOfBaptism":1304121600000,"gender":"FEMALE"},{"created":1576228587000,"modified":1576578427000,"deleted":false,"id":2,"firstName":"Joe","middleName":null,"lastName":"Barber","dateOfBirth":670284000000,"dateOfBaptism":1214776800000,"gender":"MALE"},{"created":1576172479000,"modified":1576578427000,"deleted":false,"id":1,"firstName":"Rowan","middleName":"Marc","lastName":"Pillay","dateOfBirth":449445600000,"dateOfBaptism":1088546400000,"gender":"MALE"}] })
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
        <UserHeader />
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
                    <Col xs="8">
                      <h3 className="mb-0">Details of {this.state.person.firstName}</h3>
                    </Col>
                    
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Edit Profile
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/*<Form>*/}
                    <h6 className="heading-small text-muted mb-4">
                      User information
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
                              className="form-control-alternative"
                              defaultValue={this.state.person.firstName}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              readonly="readonly"
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
                              className="form-control-alternative"
                              defaultValue={this.state.person.middleName}
                              id="input-middle-name"
                              placeholder="Middle name"
                              type="text"
                              readonly="readonly"
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
                              className="form-control-alternative"
                              defaultValue={this.state.person.lastName}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              readonly="readonly"
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
                            <Input
                              className="form-control-alternative"
                              value={('' + this.state.person.gender).toLowerCase().toString()}
                              id="input-gender"
                              placeholder=""
                              type="text"
                              readonly="readonly"
                            />
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
                            <Input
                              className="form-control-alternative"
                              value={new Intl.DateTimeFormat(
                                'en-GB', 
                                  {year: 'numeric', 
                                  month: '2-digit',
                                  day: '2-digit'}).format(this.state.person.dateOfBirth)}
                              id="input-birthday"
                              placeholder="Birthday"
                              type="text"
                              readonly="readonly"
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
                              className="form-control-alternative"
                              value={calculateAge(new Date(this.state.person.dateOfBirth))}
                              id="input-age"
                              placeholder="Age"
                              type="text"
                              readonly="readonly"
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
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="test@example.com"
                            type="email"
                            readonly="readonly"
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
                            id="input-tel-mobile"
                            placeholder="+27721234567"
                            type="tel"
                            readonly="readonly"
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
                            className="form-control-alternative"
                            id="input-tel-home"
                            placeholder="+27217654321"
                            type="tel"
                            readonly="readonly"
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
                              className="form-control-alternative"
                              value="99"
                              id="input-address-street-number"
                              placeholder="Street Number"
                              type="text"
                              readonly="readonly"
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
                              className="form-control-alternative"
                              defaultValue="1st Avenue"
                              id="input-address-avenue"
                              placeholder="Street"
                              type="text"
                              readonly="readonly"
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
                              className="form-control-alternative"
                              defaultValue="Timbaktu"
                              id="input-address-suburb"
                              placeholder="Suburb"
                              type="text"
                              readonly="readonly"
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
                              className="form-control-alternative"
                              defaultValue="Cape Town"
                              id="input-city"
                              placeholder="City"
                              type="text"
                              readonly="readonly"
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
                              className="form-control-alternative"
                              defaultValue="South Africa"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                              readonly="readonly"
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
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="9999"
                              type="number"
                              readonly="readonly"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
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
                    <Button
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
                    </Button>
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

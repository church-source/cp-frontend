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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import AuthenticationService from '../service/AuthenticationService'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      newPassword: '',
      newPasswordAgain: '',
      changePasswordToken: '',
      hasLoginFailed: false,
      forcePasswordChange: false,
      passwordChangeSuccessfully: false,
      showSuccessMessage: false,
      changePasswordFailed: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]
          : event.target.value
      }
    )
  }

  handleChangePassword(event) {
    event.preventDefault();
    AuthenticationService
             .executeChangePasswordWithChangePasswordToken(this.state.username, this.state.password, this.state.newPassword, this.state.changePasswordToken)
             .then((response) => {
                this.setState({ forcePasswordChange: false })
                this.setState({ hasLoginFailed: false })
                this.setState({ changePasswordFailed: false })
                this.setState({ changePasswordToken: '' })
                this.setState({ oldPassword: '' })
                this.setState({ newPassword: '' })
                this.setState({ password: '' })
                this.setState({ passwordChangeSuccessfully: true })

                this.props.history.push('/auth/login')
             })
             .catch((error) => {
                 this.setState({ forcePasswordChange: false })
                 this.setState({ hasLoginFailed: false })
                 this.setState({ changePasswordFailed: true })
                 this.setState({ oldPassword: '' })
                 this.setState({ newPassword: '' })
                 this.setState({ password: '' })
                 this.setState({ passwordChangeSuccessfully: false })

             })
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.setState({ changePasswordFailed: false })
    this.setState({ passwordChangeSuccessfully: false })

    AuthenticationService
             .executeJwtAuthenticationService(this.state.username, this.state.password)
             .then((response) => {
                 AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token, response.data.permissions)
                 //AuthenticationService.userHasPermission("ViewSongs")
                 this.props.history.push('/admin/index')
             })
             .catch((error) => {
                 this.setState({ showSuccessMessage: false })
                 if(error.response != undefined && error.response.data != undefined && error.response.data.reason == "passwordExpired") {
                  this.setState({ forcePasswordChange: true })
                  this.setState({ changePasswordToken: error.response.data.changePasswordToken })
                 }
                 this.setState({ hasLoginFailed: true })
             })
  }

  render() {
    return (
      <>
        {
          (this.state.hasLoginFailed && !this.state.forcePasswordChange) && <div className="container"><div className="alert alert-warning">Invalid Credentials</div></div>
        } 
        {
          (this.state.hasLoginFailed && this.state.forcePasswordChange) && <div className="container"><div className="alert alert-default">Change Password</div></div>
        }
        {
          (this.state.changePasswordFailed) && <div className="container"><div className="alert alert-danger">Change Password Failed</div></div>
        }
        {
          (this.state.passwordChangeSuccessfully) && <div className="container"><div className="alert alert-success">Password Changed Successfully</div></div>
        }
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            {!this.state.forcePasswordChange && <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  disabled="true"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/facebook.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Facebook</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  disabled="true"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            }
            {!this.state.forcePasswordChange &&
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <Form role="form" onSubmit={this.onFormSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="username" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          }
          {this.state.forcePasswordChange &&
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Change your password</small>
              </div>
              <Form role="form" onSubmit={this.onFormSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="username" type="text" name="username" disabled value={this.state.username} onChange={this.handleChange} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="New Password" type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="New Password Again" type="password" name="newPasswordAgain" value={this.state.newPasswordAgain} onChange={this.handleChange} />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" disabled={(this.state.newPassword !== this.state.newPasswordAgain) || this.state.newPassword.length <= 3} onClick={this.handleChangePassword}>
                    Change Password
                  </Button>
                </div>
              </Form>
            </CardBody>
          }
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;

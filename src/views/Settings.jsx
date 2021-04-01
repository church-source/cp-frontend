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
import React from "react"
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Col,
  Container,
  Row,
  Button,
  CardBody,
  CardImg,
  CardTitle,
  CardText
} from "reactstrap"

import { Link } from 'react-router-dom';


import Header from "components/Headers/Header.jsx"
import api from '../service/api'

// core components

class Settings extends React.Component {
  constructor(props){
    super(props)
  }
  
  redirectManageUsers(){
    this.props.history.push('/settings/users')
  }

  redirectManageRoles(){
    this.props.history.push('/settings/roles')
  }
  render() {
    return (
      
      <>
        <Header />

        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row >
                  <Col sm="8">
                    <h2 className="mb-0">Settings</h2>
                  </Col>
                  <Col sm="4" className="text-left">
                 
                  </Col>
                </Row>

              </CardHeader>

              <CardBody>
              <Row>
              <Col lg="3">
                <Card style={{ width: "18rem" }}>
                  <CardBody>
                    <CardTitle>Manage Users</CardTitle>
                    <CardText>
                      Add and edit users
                    </CardText>
                    <Link to="/settings/users">
                      <Button
                        color="primary"
                        href="#manageUsers"
                      // onClick={this.redirectManagePage}
                      >
                        Manage Users
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
                </Col>
                <Col lg="3">
                <Card style={{ width: "18rem" }}>
                  <CardBody>
                    <CardTitle>Manage Roles</CardTitle>
                    <CardText>
                      Add and edit roles
                    </CardText>
                    <Link to="/settings/roles">
                    <Button
                      color="primary"
                      href="#manageRoles"
                      //onClick={this.redirectManageRoles}
                    >
                      Manage Roles
                    </Button>
                    </Link>
                  </CardBody>
                </Card>
                </Col>
                </Row>
              </CardBody>
              
              <CardFooter className="py-4">
                  <nav aria-label="...">
                  
                  </nav>
                </CardFooter>
            </Card>
          </div>
          </Row>
        </Container>

      </>
    );
  }
}

export default Settings;

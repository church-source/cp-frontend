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
  Row
} from "reactstrap"

import Header from "components/Headers/Header.jsx"
import api from '../service/api'

// core components

class Settings extends React.Component {
  constructor(){
    super()
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
                  <Col sm="4" className="text-right">
                                   <div></div>
  
                  </Col>
                </Row>
              </CardHeader>
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

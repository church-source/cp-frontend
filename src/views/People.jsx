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
import People from "../components/People/People.jsx"
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row
} from "reactstrap";

// core components
import Header from "components/Headers/Header.jsx";

class PeopleView extends React.Component {
  state = {
    people: []
  }

  componentDidMount() {
    let base64 = require('base-64');

    let username = 'admin';
    let password = 'password';
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));

    fetch('http://' + process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT + '/people',{method:'GET', headers: headers})
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      this.setState({ people: data })
    })
    .catch(console.log)
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">People</h3>
              </CardHeader>
              <People people={this.state.people} />
              </Card>
          </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default PeopleView;

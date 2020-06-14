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
import People from "../components/People/People.jsx"
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

class PeopleView extends React.Component {
  constructor(){
    super()
    this.state = {
      people: [],
      currentPageNumber: 1,
      totalPageCount: 0,
      dataFetched: false
    }
    this.handlePageDecrement = this.handlePageDecrement.bind(this)
    this.handlePageIncrement = this.handlePageIncrement.bind(this)
    this.handlePageSet = this.handlePageSet.bind(this)
  }

  handlePageDecrement(event) {
    let newCurrentPage =  (this.state.currentPageNumber-1)
    this.setState({currentPageNumber: newCurrentPage}, () => {this.forceUpdate()})
  }

  handlePageIncrement(event) {
    let newCurrentPage =  (this.state.currentPageNumber+1)
    this.setState({currentPageNumber: newCurrentPage}, () => {this.forceUpdate()})
  }

  handlePageSet(event) {
    let newCurrentPage =  parseInt(event.target.innerHTML)
    this.setState({currentPageNumber: newCurrentPage}, () => {this.forceUpdate()})
  }

  componentDidMount() {
    let base64 = require('base-64');

    let username = 'admin';
    let password = 'password';

    api.get('/people')
    //.then(res => res.json())
    .then((data) => {
      console.log(data.data)
      this.setState({ people: data.data })
      this.setState({ dataFetched: true })
      let userCountForPagination = data.data.length;
      // subtract one to fix a small issue. i.e. if there are 20 users, 10 on first page and 
      // 10 on second page we don't want to display a third page. 
      if(userCountForPagination > 1)
        userCountForPagination-=1;
      
      let tpC= Math.floor((userCountForPagination/10) + 1)
      this.setState({ totalPageCount: tpC})
    })
    .catch(console.log)
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
                    <h2 className="mb-0">People</h2>
                  </Col>
                  <Col sm="4" className="text-right">
                                   <div><a
                                    href={"/admin/person"}
                                    id="tooltip742438047">                  <i className="fas fa-plus fa-2x" />  </a></div>
  
                  </Col>
                </Row>
              </CardHeader>
              {this.state.dataFetched && <People people={this.state.people} currentPageNumber={this.state.currentPageNumber} peoplePerPage={10}/>}
              <CardFooter className="py-4">
                  <nav aria-label="...">
                  <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >

                        <PaginationItem className={this.state.currentPageNumber===1 ? "disabled" : ""}>
                        
                        
                          <PaginationLink
                            onClick={this.handlePageDecrement}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                              
                            <span className="sr-only">Previous</span>

                          </PaginationLink>
                        </PaginationItem>
                            {Array.from(Array(this.state.totalPageCount), (e, i) => {
                              let cn = "pageLink"
                              if(this.state.currentPageNumber === (i+1)) {
                                cn = "active";
                              }
                              return <PaginationItem key={'paginator-' + i} className={cn}>
                              <PaginationLink
                                key={i}
                                onClick={this.handlePageSet}
                              >
                              {i+1} {this.state.currentPageNumber === (i+1) && <span className="sr-only">(current)</span>}
                              </PaginationLink>
                            </PaginationItem>
                            })}
                            <PaginationItem className={this.state.currentPageNumber===this.state.totalPageCount ? "disabled" : ""}>
                            <PaginationLink
                              onClick={this.handlePageIncrement}
                            >
                              <i className="fas fa-angle-right" />
                              <span className="sr-only">Next</span>
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
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

export default PeopleView;

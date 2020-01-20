import React from 'react'

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table
} from "reactstrap";

class People extends React.Component {


constructor(props){
  super(props)
  this.state = {
    peopleForCurrentPage: [],
    dataReady: false,
    currentPage: 0
  }
}

componentWillReceiveProps() {
  console.log(this.props);
  console.log((this.props.currentPage+1)*this.props.peoplePerPage);
  let end = Math.min(((this.props.currentPage)*this.props.peoplePerPage), this.props.people.length)
  console.log('start:' + this.props.currentPage)
  console.log('end: ' + end)
  this.setState({ peopleForCurrentPage: this.props.people.slice(((this.props.currentPage-1)*this.props.peoplePerPage), end) })
  this.setState({ currentPage: this.props.currentPage})
  console.log('got here sadd')
}

render () {
    return (
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Photo</th>
                <th scope="col">FirstName / LastName</th>
                <th scope="col">Date of Birth</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {
              this.state.peopleForCurrentPage.map((person) => (
                            <tr key={person.id}> 
                            <td>
                                <div className="avatar-group">
                                  <a
                                    className="avatar avatar-sm"
                                    href={"/admin/person/" + person.id}
                                    id="tooltip742438047"
                                  >
                                  { person.gender === "FEMALE" && 
                                    <img
                                      alt="..."
                                      className="rounded-circle"
                                      src={require("assets/img/theme/girl.png")}
                                    />
                                    }
                                    { person.gender === "MALE" && 
                                      <img
                                      alt="..."
                                      className="rounded-circle"
                                      src={require("assets/img/theme/man.png")}
                                      />
                                    }
                                    </a>
                                </div>
                              </td>
                              <td><div>                                  
                                <a href={"/admin/person/" + person.id} id="tooltip742438047"
                                  >{person.firstName} {person.lastName}
                                </a>
                                  </div></td>
                              
                              <td>{person.dateOfBirth}</td>

                              <td className="text-right">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only text-light"
                                    href="#pablo"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={e => e.preventDefault()}
                                  >
                                    <i className="fas fa-ellipsis-v" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={e => e.preventDefault()}
                                    >
                                      Action
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={e => e.preventDefault()}
                                    >
                                      Another action
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={e => e.preventDefault()}
                                    >
                                      Something else here
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>
                ))}
            </tbody>
          </Table>
    )
  };
}
export default People
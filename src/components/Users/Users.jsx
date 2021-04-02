import React from 'react'

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Badge
} from "reactstrap";

import { Link } from 'react-router-dom';

class Users extends React.Component {


constructor(props){
  super(props)
  this.state = {
    usersForCurrentPage: []
  }
}

componentWillReceiveProps() {
  let end = Math.min(((this.props.currentPageNumber)*this.props.usersPerPage), this.props.users.length)
  this.setState({ usersForCurrentPage: this.props.users.slice(((this.props.currentPageNumber-1)*this.props.usersPerPage), end) })
}

render () {
    return (
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Created</th>
                <th scope="col">Roles</th>
                <th scope="col">Enabled</th>
                <th scope="col">Password Change?</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {
              this.state.usersForCurrentPage.map((user) => (
                            <tr key={user.id}> 
                            
                              <td><div>                                  
                              <Link to={"/settings/user/" + user.id}>{user.username}
                                </Link>
                                  </div></td>
                              
                              <td>{user.email}</td>
                              <td>{user.created}</td>
                              <td>{user.roles.map((user,index) => { if((index+1)%2==0) {return <React.Fragment key={user.id}> <Badge color="primary">{user.name}</Badge>  <br></br> </React.Fragment> } else {return <React.Fragment key={user.id}><Badge color="primary">{user.name}</Badge>&nbsp;</React.Fragment>}})}</td>
                              <td>{user.isEnabled && <Badge color="success">Enabled</Badge>} {!user.isEnabled && <Badge color="warning">Disabled</Badge>}</td>
                              <td>{user.forcePasswordChange && <Badge color="danger">Required</Badge>}</td>

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
export default Users
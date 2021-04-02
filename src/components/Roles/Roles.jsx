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

class Roles extends React.Component {


constructor(props){
  super(props)
  this.state = {
    rolesForCurrentPage: []
  }
}

componentWillReceiveProps() {
  let end = Math.min(((this.props.currentPageNumber)*this.props.rolesPerPage), this.props.roles.length)
  this.setState({ rolesForCurrentPage: this.props.roles.slice(((this.props.currentPageNumber-1)*this.props.rolesPerPage), end) })
}

render () {
    return (
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Role Name</th>
                <th scope="col">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.rolesForCurrentPage.map((role) => (
                            <tr key={role.id}> 
                            
                              <td><div>                                  
                              <Link to={"/settings/role/" + role.id}>{role.name}
                                </Link>
                                  </div></td>
                              <td>{role.privileges.map((privilege,index) => { if((index+1)%4==0) {return <React.Fragment key={privilege.id}> <Badge color="primary">{privilege.name}</Badge>  <br></br> </React.Fragment> } else {return <React.Fragment key={privilege.id}><Badge color="primary">{privilege.name}</Badge>&nbsp;&nbsp;</React.Fragment>}})}</td>
                            </tr>
                ))}
            </tbody>
          </Table>
    )
  };
}
export default Roles
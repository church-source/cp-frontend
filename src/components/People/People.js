import React from 'react'

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";

const People = ({ people }) => {

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
                    
          { people.map((person) => (
                          <tr key={person.id}> 
                          <td>
                              <div className="avatar-group">
                                <a
                                  className="avatar avatar-sm"
                                  href="#pablo"
                                  id="tooltip742438047"
                                  onClick={e => e.preventDefault()}
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
                            <td>{person.firstName} {person.lastName}</td>
                            
                            <td>{new Intl.DateTimeFormat(
                              'en-GB', 
                                {year: 'numeric', 
                                month: '2-digit',
                                day: '2-digit'}).format(person.dateOfBirth)}</td>

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

export default People
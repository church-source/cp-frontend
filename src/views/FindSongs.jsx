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
  Table,
  Badge,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button
} from "reactstrap"

import { Link } from 'react-router-dom';

import Header from "components/Headers/Header.jsx"
import api from '../service/api'

// core components

class FindSongs extends React.Component {
  constructor(){
    super()
    this.state = {
      songs: [],
      currentPageNumber: 1,
      totalPageCount: 0,
      dataFetched: false,
      songsForCurrentPage: [],
      searchString: ''

    }
    this.handlePageDecrement = this.handlePageDecrement.bind(this)
    this.handlePageIncrement = this.handlePageIncrement.bind(this)
    this.handlePageSet = this.handlePageSet.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.findSongs = this.findSongs.bind(this)

  }

  handlePageDecrement(event) {
    let newCurrentPage =  (this.state.currentPageNumber-1)
    this.setState({currentPageNumber: newCurrentPage}, () => {
      this.forceUpdate()
      this.updateSongsForCurrentPage()})
   
  }

  handlePageIncrement(event) {
    let newCurrentPage =  (this.state.currentPageNumber+1)
    this.setState({currentPageNumber: newCurrentPage}, () => {
      this.forceUpdate()
      this.updateSongsForCurrentPage()  
    })

  }

  handlePageSet(event) {
    let newCurrentPage =  parseInt(event.target.innerHTML)
    this.setState({currentPageNumber: newCurrentPage}, () => {
      this.forceUpdate()
      this.updateSongsForCurrentPage()
    })
  }

  updateSongsForCurrentPage() {
    let songsPerPage = 10
    let end = Math.min(((this.state.currentPageNumber)*songsPerPage), this.state.songs.length)
    this.setState({ songsForCurrentPage: this.state.songs.slice(((this.state.currentPageNumber-1)*songsPerPage), end) })
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]
          : event.target.value
      }
    )
  }

  findSongs() {

    let params = {
      limit: 500
    }
    if (this.state.searchString != undefined && this.state.searchString != "")
      params.search =  this.state.searchString
    console.log(params)
    api.get('/churchsongs/songs', {
      params
    })
    //.then(res => res.json())
    .then((data) => {
      console.log(data.data)
      this.setState({ songs: data.data })
      this.setState({ dataFetched: true })
      let songCountForPagination = data.data.length;
      // subtract one to fix a small issue. i.e. if there are 20 songs, 10 on first page and 
      // 10 on second page we don't want to display a third page. 
      if(songCountForPagination > 1)
        songCountForPagination-=1;
      
      let tpC= Math.floor((songCountForPagination/10) + 1)
      this.setState({ totalPageCount: tpC})

      this.updateSongsForCurrentPage()
    })
    .catch(console.log)

  }

  componentDidMount() {
    this.findSongs()
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
                    <h2 className="mb-0">songs</h2>
                  </Col>
                  <Col sm="4" className="text-right">
                                   <div><a
                                    href={"/settings/song"}
                                    id="tooltip742438047">                  <i className="fas fa-plus fa-2x" />  </a></div>
  
                  </Col>
                </Row>
              </CardHeader>
              <Row>
              <Col lg="1"/>
              <Col lg="3">

                            <Input
                              className="form-control"
                              name="searchString"
                              onChange={this.handleChange}
                              value={this.state.searchString || ''}
                              id="input-searchString"
                              type="text"
                              autoComplete="zzz"
                              placeholder="Search songs..."
                              onKeyPress={event => {
                                if (event.key === 'Enter') {
                                  this.findSongs()
                                }
                              }}
                            />
                </Col>
                <Col lg="2">
                  <Button  color="primary" type="submit" onClick={this.findSongs}>
                    Search
                  </Button>
                </Col>
                </Row>
                <br/>
              {this.state.dataFetched && <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Secondary Name</th>
                <th scope="col">Artist</th>
                <th scope="col">Style</th>
                <th scope="col">Sheets</th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.songsForCurrentPage.map((song) => (
                            <tr key={song.id}> 
                            
                              <td><div>                                  
                              <Link to={"/admin/song/" + song.id}>{song.code}
                                </Link>
                                  </div></td>
                              
                              <td>{song.name}</td>
                              <td>{song.secondaryName}</td>
                              <td>{song.artist.artistName}</td>
                              <td>{song.style}</td>
                              <td>{<React.Fragment> {(song.leadSheet != undefined && song.leadSheet!== "") && <React.Fragment> <a target="_blank" href={song.leadSheet}><Badge color="default">lead</Badge></a>&nbsp;</React.Fragment>}
                              {(song.pianoSheet != undefined && song.pianoSheet!== "") && <React.Fragment> <a target="_blank" href={song.pianoSheet}><Badge color="default">Piano</Badge></a>&nbsp;</React.Fragment>}
                              {(song.guitarSheet != undefined && song.guitarSheet!== "") && <React.Fragment> <a target="_blank" href={song.guitarSheet}><Badge color="default">guitar</Badge></a>&nbsp;</React.Fragment>}
                              {(song.lyricsSheet != undefined && song.lyricsSheet!== "") && <React.Fragment> <a target="_blank" href={song.lyricsSheet}><Badge color="default">lyrics</Badge></a>&nbsp;</React.Fragment>} </React.Fragment>}</td></tr>
                ))}
            </tbody>
          </Table>}
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

export default FindSongs;

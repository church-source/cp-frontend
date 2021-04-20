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

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import LoadingOverlay from 'react-loading-overlay';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


// core components
const columns = [{
  dataField: 'code',
  text: 'Song Code',
  filter: textFilter(),
  formatter: (cell, row) =>  <Link to={"/admin/song/" + row.id}>{row.code}
  </Link>
}, 
  {
  dataField: 'name',
  text: 'Song Name',
  style: { overflow: 'scroll'},
  filter: textFilter()
}, {
  dataField: 'secondaryName',
  style: { overflow: 'scroll'},
  text: 'Other Name',
  filter: textFilter()
}, {
  dataField: 'lyricsSheet',
  text: 'Sheets',
  formatter: (cell, row) => 
  <React.Fragment> {(row.leadSheet != undefined && row.leadSheet!== "") && <React.Fragment> <a target="_blank" href={row.leadSheet}><Badge color="default">lead</Badge></a>&nbsp;</React.Fragment>}
                              {(row.pianoSheet != undefined && row.pianoSheet!== "") && <React.Fragment> <a target="_blank" href={row.pianoSheet}><Badge color="default">Piano</Badge></a>&nbsp;</React.Fragment>}
                              {(row.guitarSheet != undefined && row.guitarSheet!== "") && <React.Fragment> <a target="_blank" href={row.guitarSheet}><Badge color="default">guitar</Badge></a>&nbsp;</React.Fragment>}
                              {(row.lyricsSheet != undefined && row.lyricsSheet!== "") && <React.Fragment> <a target="_blank" href={row.lyricsSheet}><Badge color="default">lyrics</Badge></a>&nbsp;</React.Fragment>} </React.Fragment>
}];

const rowStyle = (row, rowIndex) => {
  return {   'overflow-wrap': 'break-word'  };
};

class FindSongs extends React.Component {
  constructor(){
    super()
    this.state = {
      songs: [],
      currentPageNumber: 1,
      totalPageCount: 0,
      dataFetched: false,
      songsForCurrentPage: [],
      searchString: '',
      loading: true

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
    this.state.loading = true
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
      this.setState({ loading: false })
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
    .catch((error) => { 
      console.log (error)
      this.state.loading = false 
    })

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
                                    href={"/admin/song"}
                                    id="tooltip742438047">                  <i className="fas fa-plus fa-2x" />  </a></div>
  
                  </Col>
                </Row>
              </CardHeader>
              <Col sm="12">
              <LoadingOverlay
                    active={this.state.loading}
                    spinner
                    text='Loading your content...'
                    >
                <Row>
                  <Col lg="1"></Col>
                  <Col lg="10">
                  <BootstrapTable keyField='id' data={ this.state.songs } columns={ columns }  
                    pagination={ paginationFactory() } 
                    filter={ filterFactory() } 
                    rowStyle={ rowStyle } />
                  </Col>
                  <Col lg="1"></Col>
                </Row>
                </LoadingOverlay>
              </Col>
              <CardFooter className="py-4">
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

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
import React, { Component } from 'react'
import {calculateAge, adjustForTimezone} from '../utils/Utils.js'
import DatePicker from 'react-date-picker'
import clonedeep from 'lodash.clonedeep'

import "../assets/css/react-datepicker.css"
import "../assets/css/react-pdf.css"
import "../assets/css/react-player.css"


import api from '../service/api'
import Select from 'react-select';

import ReactPlayer from "react-player"
import { Document, Page, pdfjs } from 'react-pdf';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap"
// core components
import Header from "components/Headers/Header.jsx"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


/*const styles = StyleSheet.create({
  page: { backgroundColor: 'tomato' },
  section: { height:'300px', color: 'white', textAlign: 'center', margin: 30 }
});
*/

class AddSong extends React.Component {
  
  constructor(){
    super()

    //state for characters value//
    this.state = {
      artists: [],
      song: {artist: {}},
      editing: false,
      initialState: {},
      pageHeading: ""
    }  
    this.handleSongInfoChange = this.handleSongInfoChange.bind(this)
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this);
    this.customFilter = this.customFilter.bind(this);

  }



  onDocumentLoadSuccess({ numPages }) {
  }

    // set selected value
    handleSelect(val) {
      if(val !== "") {
        this.setState((prevState) => {
          let song = Object.assign({}, prevState.song)
          song.artist = val;                 
          return { song }                                 
        })
      }
    }
  
    handleSongInfoChange(event) {
      const { name, value } = event.target
      this.setState((prevState) => {
        let song = Object.assign({}, prevState.song)
        song[name] = value
        return { song }
      })
    }

    //Add your search logic here.
    customFilter(option, searchText) {
      if (
        option.data.artistName.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    }

  handleSubmit(event) {
    this.setState(prevState => ({
      editing: false
    }))
    event.preventDefault();
    console.log(this.state.song);
    const clonedState = clonedeep(this.state.song)
    api.put('/churchsongs/song/' + this.state.song.id,
      clonedState
    ).then(response => {
          console.log("Successful" + response.data);
          api.get('/churchsongs/song/' + this.state.song.id)
          .then((data) => {
            this.initializeStateFromInitialData(data.data)
          })
    })
  }

  handleEditButtonClick(event) {
    this.setState(prevState => ({
      editing: true
    }))
  }

  handleCancelButtonClick(event) {
    this.setState(prevState => ({
      editing: false
    }))

    const initialState = clonedeep(this.state.initialState)

    this.setState(prevState => ({
      song: initialState
    }))
  }

  initializeStateFromInitialData = (data) => {
    const initialData = clonedeep(data)
    this.setState({ initialState: initialData })
    this.setState({ song: data })
    this.setState(prevState => ({
      pageHeading: data.name
    }))
  }

  handleSubmit(event) {
    this.setState(prevState => ({
      editing: false
    }))
    event.preventDefault();

    const clonedState = clonedeep(this.state.song)

    api.post('/churchsongs/song',
      clonedState
    ).then(response => {
      document.location = "song/" + response.data.id;
    })
  }

  initializeArtists = (artists) => {
    this.setState({ artists: artists })
  }

  handleCancelButtonClick(event) {
    this.setState(prevState => ({
      editing: false
    }))

    const initialData = clonedeep(this.state.initialState)
    this.initializeStateFromInitialData(initialData)
  }

  componentDidMount() {

    const {match} = this.props
    const id = match.params.id

    api.get('/churchsongs/artists', {
      params: {
        limit: 1000
      }
    }) //get all artists
    .then((data) => {
      this.initializeArtists(data.data)
    })
    
    .catch(console.log)
  }
 
  render() {
    return (
      <>
        <Header heading={this.state.pageHeading}/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="10">
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/*<Form>*/}
                  <Form autoComplete="zzz" onSubmit={this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Add a New Song
                    </h6>
                    <div >
                      <Row>
                        <Col lg="1">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-code"
                            >
                              Code
                            </label>
                            <Input
                              className="form-control"
                              name="code"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.code || ''}
                              id="input-code"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="5">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Name
                            </label>
                            <Input
                              className="form-control"
                              name="name"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.name || ''}
                              id="input-name"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-secondaryName"
                            >
                              Secondary Name(s)
                            </label>

                            <Input
                              className="form-control"
                              name="secondaryName"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.secondaryName || ''}
                              id="input-secondaryName"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>

                      <Col lg="6">
                      <FormGroup>
                      <label
                              className="form-control-label"
                              htmlFor="input-secondaryName"
                            >
                              Artist
                            </label>
                          <Select
                            className="form-select"
                            classNamePrefix="select"
                            onChange={this.handleSelect}
                            value={this.state.song.artist}
                            getOptionLabel={option =>
                              `${option.artistName}`
                            }
                            getOptionValue={option => `${option.id}`}
                            options={this.state.artists}
                            isSearchable={true}
                            filterOption={this.customFilter}
                            onInputChange={this.handleSelect}
                            noOptionsMessage={() => null}
                            placeholder={'Select Artist'}
                            autoFocus={true}
                            menuIsOpen={this.state.menuOpen}
                          />                     

                        </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-songKey"
                            >
                              Key
                            </label>

                            <Input
                              className="form-control"
                              name="songKey"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.songKey || ''}
                              id="input-songKey"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-style"
                            >
                              Style
                            </label>

                            <Input
                              className="form-control"
                              name="style"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.style || ''}
                              id="input-style"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-style"
                            >
                              Tempo
                            </label>

                            <Input
                              className="form-control"
                              name="tempo"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.tempo || ''}
                              id="input-tempo"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-ccliNumber"
                            >
                              CCLI Number
                            </label>

                            <Input
                              className="form-control"
                              name="ccliNumber"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.ccliNumber || ''}
                              id="input-ccliNumber"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6"> </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-leadSheet"
                            >
                              Lead Sheet
                            </label>

                            <Input
                              className="form-control"
                              name="leadSheet"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.leadSheet || ''}
                              id="input-leadSheet"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6"> </Col>
                          <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-guitarSheet"
                            >
                              Guitar Sheet
                            </label>

                            <Input
                              className="form-control"
                              name="guitarSheet"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.guitarSheet || ''}
                              id="input-guitarSheet"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                          </Col>
                        <Col lg="6"> </Col>
                          <Col lg="6">

                           <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-pianoSheet"
                            >
                              Piano Sheet
                            </label>

                            <Input
                              className="form-control"
                              name="pianoSheet"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.pianoSheet || ''}
                              id="input-pianoSheet"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6"> </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-lyricsSheet"
                            >
                              Lyrics Sheet
                            </label>

                            <Input
                              className="form-control"
                              name="lyricsSheet"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.lyricsSheet || ''}
                              id="input-lyricsSheet"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6"> </Col>
                         <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-songKey"
                            >
                              Video Link
                            </label>

                            <Input
                              className="form-control"
                              name="videoLink"
                              onChange={this.handleSongInfoChange}
                              value={this.state.song.videoLink || ''}
                              id="input-videoLink"
                              type="text"
                              autoComplete="zzz"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      </div>
                    <Col className="text-right" lg="12">
                    <Button
                        color="secondary"
                        onClick={this.handleCancelButtonClick}
                      >
                        Cancel
                      </Button>
                      < Button
                        color="primary"
                        onClick={this.handleSubmit}
                      >
                        Save
                      </Button>
                      </Col>

                    </Form>

                    {/* Description 
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
                      </FormGroup>
                    </div>*/}
                  {/*</Form>*/}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default AddSong

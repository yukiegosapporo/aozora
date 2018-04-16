import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone'
import superagent from 'superagent';
import ReactTable from 'react-table'
var $ = require('jquery');
//require('../css/styles.css');
//import { Button, Grid, Row, Col, Media, FormGroup, FormControl, Form } from
//"react-bootstrap";

import {
  Button,
  Container,
  Divider,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Form,
  TextArea,
  Responsive,
  Segment,
  Sidebar,
  Popup,
  Visibility,
  Select,
  Message,
  Accordion
} from 'semantic-ui-react';
import {HorizontalBar} from 'react-chartjs-2';


const options = [
  { key: 'm', text: 'Male', value: '1' },
  { key: 'f', text: 'Female', value: '2' },
]

export default class Diagnose extends React.Component{

    constructor(props) {
      super(props);
      this.post_diagnose = this.post_diagnose.bind(this);
      this.state = {data: []};

  }

    post_diagnose(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      var object = {};
      data.forEach(function(value, key){
          object[key] = value;
      });
      var json = JSON.stringify(object);

      fetch(window.location.href + 'diagnose', {
        method: 'POST',
          headers: {
            'Accept': 'application/json */*',
            'Content-Type': 'application/json'
          },
        body: json,
      })
      .then((response) => response.json())
      .then((responsej) => this.setState({data: responsej}))
    }



    render(){

      return (
      <Grid>
          <Grid.Column width={11}>
          <div>






            <Form onSubmit={this.post_diagnose}>
<hr />
<h2>User input</h2>
            <Form.Group widths='equal'>
              <Form.Input fluid label='MCV' defaultValue='0.1' name="mcv"/>
              <Form.Input fluid label='Hämatokrit' defaultValue='0.1' name='hamatokrit'/>
              <Form.Input fluid label='Hämoglobin' defaultValue='0.1' name='hamoglobin'/>
              <Form.Input fluid label='MCH' defaultValue='0.1' name='mch'/>
              <Form.Input fluid label='MCHC' defaultValue='0.1' name='mchc'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Erythrozyten' defaultValue='0.1' name='erythrozyten'/>
              <Form.Input fluid label='Thrombozyten' defaultValue='0.1' name='thrombozyten'/>
              <Form.Input fluid label='Leukozyten' defaultValue='0.1' name='leukozyten'/>
              <Form.Input fluid label='MPV' defaultValue='0.1' name='mpv'/>
              <Form.Input fluid label='CRP' defaultValue='0.1' name='crp'/>
            </Form.Group>
            <Form.Group widths='equal'>
            <Form.Input fluid label='Kreatinin' defaultValue='0.1' name='kreatinin'/>
            <Form.Input fluid label='More' disabled />
            <Form.Input fluid label='to' disabled />
            <Form.Input fluid label='come' disabled />
            <Form.Input fluid label='soon' disabled />
          </Form.Group>

            <Form.Group inline>
            <Form.Input fluid label='Your age' defaultValue='70' name='age'/>
            <Form.Select fluid label='Gender' options={options} placeholder='Gender' name='gender' defaultValue='1'/>
            </Form.Group>

<hr />
<h2>App parameters</h2>
<Form.Group inline>
            <Form.Input fluid label='Confidence level' defaultValue='0.5' name='cl'/>
            </Form.Group>

<hr />
              <Button inverted color="pink" type="submit">
                Diagnose
                <Icon name='right arrow' />
              </Button>
            </Form>

</div>

          </Grid.Column>


  <HorizontalBar
    ref='chart'
    data={this.state.data}
  />


      </Grid>
      );
    }
};

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
} from 'semantic-ui-react'

export default class UploadText extends React.Component{

    constructor(props) {
      super(props);
      this.post_sagasu = this.post_sagasu.bind(this);
      this.state = {hits: []};
    }

    post_sagasu(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      
      fetch(window.location.href + 'sagasu', {
        method: 'POST',
        body: data,
      })
      .then((response) => response.json())
      .then((responsej) => this.setState({hits: responsej}))
    }

    render(){
      return (
      <Grid>
          <Grid.Column width={11}>
            <Form onSubmit={this.post_sagasu}>
                <Grid.Column width={9}>
                  <Form.Field control={TextArea}
                  placeholder="Some lovely sentenses" type="text"
                  name="text"/>
                </Grid.Column>
              <Button inverted color="blue" type="submit">
                Sagasu
                <Icon name='right arrow' />
              </Button>
            </Form>
            {this.state.hits.map(function(d) {
                return <List divided relaxed>
                        <List.Item key={d.titleauthor}>
                          <List.Content>
                            <List.Header as='a'>
                              {d.titleauthor.replace("\n",'&').split('&')[0]}
                            </List.Header>

                            <List.Description as='a'>
                              {d.titleauthor.replace("\n",'&').split('&')[1]}
                            </List.Description>
                              <Popup
                                  key={d.titleauthor}
                                  trigger={<Button icon='add' key={d.titleauthor.concat("button")}/>}
                                  content={d.preview}
                                  wide='very'
                                />
                          </List.Content>

                        </List.Item>
                      </List>

                  })}



          </Grid.Column>

      </Grid>
      );
    }
};

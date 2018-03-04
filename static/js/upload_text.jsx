import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone'
import superagent from 'superagent';
import ReactTable from 'react-table'
var $ = require('jquery');
//require('../css/styles.css');
import { Button, Grid, Row, Col, Media, FormGroup, FormControl, Form } from "react-bootstrap";

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
        <Row>
          <Col md={12} mdOffset={0}>
            <Form horizontal onSubmit={this.post_sagasu}>
              <FormGroup controlId="formHorizontalText">
                <Col sm={10} xsOffset={0}>
                  <FormControl placeholder="Search text"  type="text"
                  name="text"/>
                </Col>

              </FormGroup>

              <Button bsSize="large" bsStyle="success" type="submit">
                Sagasu!
              </Button>
            </Form>

            {this.state.hits.map(function(d) {
                return <Media key={d.text}>
                        <Media.Body>

                          <p>
                            {d.text}
                          </p>
                        </Media.Body>
                        </Media>
                  })}

          </Col>
        </Row>
      </Grid>
      );
    }
};

import React from "react";
import Diagnose from "./upload_text"
import { Jumbotron, PageHeader } from "react-bootstrap";

require('../css/styles.css');
var $ = require('jquery');

import HeaderBackgroundImage from '../images/header.jpg';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    addHeaderImg() {
        let headerBg = new Image();
        headerBg.src = HeaderBackgroundImage;
    }

    render () {
        return (

                <div className='header-contents'>
                <Jumbotron>
                  <h1>Shindanr (診断r)</h1>
                  <p>
                  Don't miss anything
                  </p>
                </Jumbotron>
                <Diagnose />
                </div>
        );
    }
}

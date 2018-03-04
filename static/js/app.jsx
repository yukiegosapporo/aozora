import React from "react";
import UploadText from "./upload_text"
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
                  <h1>Aozora search in jp, de, en</h1>
                  <p>
                  find your favorite copy right free classical books in Japan
                  </p>
                </Jumbotron>
                <UploadText />
                </div>
        );
    }
}

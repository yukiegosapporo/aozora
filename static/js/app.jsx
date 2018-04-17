import React from "react";
import Diagnose from "./diagnose_it"
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
                <Diagnose />
                </div>
        );
    }
}

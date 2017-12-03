import React, { Component } from "react";
import { browserHistory, Link} from 'react-router';
import DBFooter from '../navigation/dbFooter';
import WebHeader from "../navigation/webHeader";

export default class Home extends Component {
    componentDidMount() {
        browserHistory.push('/');
    }
    render() {
        return (
            <div id="home">
                <WebHeader/>


                <div className="container-fluid">

                    <div className="banner">
                        <div style={{display:'table', height:'100%', maxWidth:'800px', margin:'auto'}}>
                            <div style={{
                            display:'table-cell',
                            verticalAlign: 'middle'}}>


                            <h1>Clinical Trial Database</h1>


                        </div></div>


                    </div>
                    <div id="bannerbg" className="row justify-content-md-center"></div>

                    <div className="row" id="site-information">

                        <div className="col-md">
                            <h3>What is the Clinical Trial Database?</h3>
                            <p>
                                The Clinical Trial Database project is a website used for organizing information about clinical trials.
                                It can be used to view clinical studies, analyze results, and manage studies.
                                Everything from patient outcomes and clicians involved in trials can be managed from the site.

                            </p>
                            <p>
                                The CTD was created by Olivia Wan and Jessica Merritt as a final project for the class CS3200 at Northeastern University.
                            </p>
                        </div>
                    </div>

                    <DBFooter/>




                </div>
            </div>
        );
    }
}



import React, { Component } from "react";
import WebHeader from "../navigation/webHeader";
import DBFooter from "../navigation/dbFooter";
export default class Study extends Component {
    render() {
        return (
            <div id="study">
                <WebHeader/>

                <div className="content">
                    <h1> This is the study page. </h1>
                </div>

                <DBFooter/>
            </div>
        );
    }
}
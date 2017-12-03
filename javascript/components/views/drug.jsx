import React, { Component } from "react";
import WebHeader from "../navigation/webHeader";
import DBFooter from "../navigation/dbFooter";
export default class Drug extends Component {
    render() {
        return (
            <div id="drug">
                <WebHeader/>

                <div className="content">
                    <h1> This is the drug page. </h1>
                </div>

                <DBFooter/>
            </div>
        );
    }
}
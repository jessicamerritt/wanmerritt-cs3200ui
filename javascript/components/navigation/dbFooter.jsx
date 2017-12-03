import React, { Component } from "react";


export default class DBFooter extends Component {
    render() {
        return (
            <div className="row" id="footer">
                <div className="col-md-6" style={{filter:'invert(100%)'}}>
                </div>
                <div className="col-md-4" style={{textAlign:'right'}}>
                    Find us on <a href="https://github.com/omwan/merrittwan-cs3200/tree/featJ1" target="_blank">GitHub</a><br/>
                </div>
            </div>
        );
    }
}
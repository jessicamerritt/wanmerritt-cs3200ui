import React, { Component } from "react";
import { browserHistory, Link } from 'react-router';


export default class WebHeader extends Component {
    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Clinical Trial Database</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/study">Studies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/address">Addresses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/drug"> Drugs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/patient"> Patients</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}


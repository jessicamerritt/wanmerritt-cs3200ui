import React, { Component } from "react";
import WebHeader from "../navigation/webHeader";
import PITable from "../tables/PITable";
import Popup from "../forms/popup";
import AddPIForm from "../forms/addPIForm";

export default class PI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pis: [],
            showPopup: false
        }
    }

    togglePopup() {
        this.setState({
            showPopup: ! this.state.showPopup
        });
    }

    loadPIsFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/principal/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            self.setState({pis: data["#result-set-1"]});

        });
    }


    componentDidMount() {
        this.loadPIsFromServer();
    }

    render() {
        return (
            <div>
                <WebHeader />

                <div className="content" >
                    <h2> Principal Investigator Table </h2>

                    <div className="row justify-content-end">
                        <div className="col col-lg-2">

                            <button className="btn btn-primary" onClick={this.togglePopup.bind(this)}>Add PI</button>
                        </div>
                    </div>
                    {this.state.showPopup ?
                        <Popup
                            header='Add Principal Investigator'
                            children={<AddPIForm onSuccess={this.loadPIsFromServer.bind(this)}
                                                   onClose={this.togglePopup.bind(this)}/>}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }

                    <div>
                        <PITable pis={this.state.pis}/>
                    </div>
                </div>

            </div>
        );
    }
}
import React, { Component } from "react";
import WebHeader from "../navigation/webHeader";
import DrugTable from "../tables/DrugTable";
import Popup from "../forms/popup";
import AddDrugForm from "../forms/addDrugForm";

export default class Drug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugs: [],
            showPopup: false
        }
    }

    togglePopup() {
        this.setState({
            showPopup: ! this.state.showPopup
        });
    }

    loadDrugsFromServer() {
        var self = this;
        fetch("http://localhost:8080/api/drug/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            self.setState({drugs: data});

        });
    }


    componentDidMount() {
        this.loadDrugsFromServer();
    }

    render() {
        return (
            <div>
                <WebHeader />

                <div className="content" >
                    <h2> Drug Table </h2>

                    <div className="row justify-content-end">
                        <div className="col col-lg-2">

                        <button className="btn btn-primary" onClick={this.togglePopup.bind(this)}>Add Drug</button>
                        </div>
                    </div>
                    {this.state.showPopup ?
                        <Popup
                            header='Add Drug'
                            children={<AddDrugForm onSuccess={this.loadDrugsFromServer.bind(this)}
                                onClose={this.togglePopup.bind(this)}/>}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }

                    <div>
                      <DrugTable drugs={this.state.drugs}/>
                    </div>
                </div>

            </div>
        );
    }
}
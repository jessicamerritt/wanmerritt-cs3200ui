import React, { Component } from "react";
import WebHeader from "../navigation/webHeader";
import DrugTable from "../tables/DrugTable";
export default class Drug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugs: [],
        }
    }

    loadAddressesFromServer() {
        var self = this;
        fetch("/api/drug/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            self.setState({drugs: data});

        });
    }


    componentDidMount() {
        this.loadAddressesFromServer();
    }

    render() {
        return (
            <div>
                <WebHeader />

                <div className="content" >
                    <h2> Drug Table </h2>
                    <div>
                      <DrugTable drugs={this.state.drugs}/>
                    </div>
                </div>

            </div>
        );
    }
}
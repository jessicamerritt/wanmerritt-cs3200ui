import React from 'react';
import AddressTable from '../tables/AddressTable.js'
import WebHeader from "../navigation/webHeader";


export default class Address extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
        }
    }

    loadAddressesFromServer() {
        var self = this;
        fetch("/api/address/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            self.setState({addresses: data});

        });
    }


    componentDidMount() {
        this.loadAddressesFromServer();
    }

    render() {
        return (
            <div className="content">
                <WebHeader />
                <div>
                    <AddressTable addresses={this.state.addresses}/>
                </div>

            </div>
        );
    }
}




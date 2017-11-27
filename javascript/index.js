import React from 'react';
import AddressTable from './components/tables/AddressTable.js'


class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
        }
    }

    loadAddressesFromServer() {
        var self = this;
        fetch("http://localhost:8080/address/all"
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
        return ( <AddressTable addresses={this.state.addresses}/> );
    }
}




ReactDOM.render(
    <App />, document.getElementById('root')
);

import React from 'react';
import Address from './rows/Address.js';

class AddressTable extends React.Component {
    render() {
        var rows = [];
        this.props.addresses.forEach(function(address) {
            rows.push(<Address address={address} key={address.addressId}/>);
        });
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Street Address</th><th>City</th><th>State</th><th>Zip Code</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
}

export default AddressTable;





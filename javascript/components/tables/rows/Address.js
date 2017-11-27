import React from 'react';

class Address extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.address.street}</td>
                <td>{this.props.address.city}</td>
                <td>{this.props.address.state}</td>
                <td>{this.props.address.zip}</td>
            </tr>);
    }
}

export default Address;

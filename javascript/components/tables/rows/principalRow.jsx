import React from 'react';

class PIRow extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.pi.FIRST_NAME}</td>
                <td>{this.props.pi.LAST_NAME}</td>
                <td>{this.props.pi.PHONE}</td>
                <td>{this.props.pi.EMAIL}</td>
                <td>{this.props.pi.INSTITUTION}</td>
            </tr>);
    }
}

export default PIRow;
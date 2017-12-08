import React from 'react';
import PIRow from './rows/principalRow';

class PITable extends React.Component {
    render() {
        var rows = [];
        this.props.pis.forEach(function(pi) {
            rows.push(<PIRow pi={pi} key={pi.drugId}/>);
        });
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>First Name</th><th>Last Name</th><th>Phone</th><th>Email</th><th>Institution</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
}

export default PITable;
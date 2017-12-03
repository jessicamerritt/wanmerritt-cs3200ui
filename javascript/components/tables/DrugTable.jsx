import React from 'react';
import DrugRow from './rows/drugRow';

class DrugTable extends React.Component {
    render() {
        var rows = [];
        this.props.drugs.forEach(function(drug) {
            rows.push(<DrugRow drug={drug} key={drug.drugId}/>);
        });
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Market Name</th><th>Scientific Name</th><th>Success Count</th><th>Toxicity</th><th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
}

export default DrugTable;
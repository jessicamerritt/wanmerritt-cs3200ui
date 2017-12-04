import React from 'react';

class DrugRow extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           visible: true,
       }
    }

    handleDelete() {
        var self = this;
        fetch("http://localhost:8080/api/drug/delete?drugId=" + self.props.drug.drugId, {
            method: 'delete'
        }).then(function(response) {
            self.setState({visible: false});
        }).catch(function() {
                console.log("error");
            }
        );
    }

    render() {
        if (this.state.visible==false) return null;
        return (
            <tr>
                <td>{this.props.drug.marketName}</td>
                <td>{this.props.drug.scientificName}</td>
                <td>{this.props.drug.previousSuccess}</td>
                <td>{this.props.drug.toxicity}</td>
                <td>
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>);
    }
}

export default DrugRow;
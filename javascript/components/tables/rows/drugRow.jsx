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
        fetch("https://merrittwan-cs3200.herokuapp.com/api/drug/delete?drugId=" + self.props.drug.drugId, {
            method: 'delete'
        }).then(function(response) {
            if(response.status == 200) {
                self.setState({visible: false});
            }
            alert("This drug cannot be deleted. It is attached to an existing study");
        }).catch(function() {
            self.setState({visible: true});
                alert("Unable to delete the requested drug. Please try again later");
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
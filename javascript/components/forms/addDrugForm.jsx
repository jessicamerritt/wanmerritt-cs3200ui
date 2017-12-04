import React, { Component } from "react";

export default class AddDrugForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marketName: "",
            previousSuccess: 0,
            scientificName: "",
            toxicity: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        var self = this;
        self.props.onClose();
        fetch('http://localhost:8080/api/drug/new', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                drugId: null,
                marketName: this.state.marketName,
                previousSuccess: this.state.previousSuccess,
                scientificName: this.state.scientificName,
                toxicity: this.state.toxicity
            })
        }).catch(function () {
                alert('We are unable to add the drug at this moment');
        }).then(function() {
            self.props.onSuccess();
            alert('Success');
        });
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <label>
                    Market Name:
                    <input
                        name="marketName"
                        type="text"
                        value={this.state.marketName}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Scientific Name:
                    <input
                        name="scientificName"
                        type="text"
                        value={this.state.scientificName}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Previous Success:
                    <input
                        name="previousSuccess"
                        type="number"
                        value={this.state.previousSuccess}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Toxicity:
                    <input
                        name="toxicity"
                        type="text"
                        value={this.state.toxicity}
                        onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
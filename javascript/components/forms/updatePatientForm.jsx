import React, { Component } from "react";

export default class UpdatePatientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.patient;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };




    handleSubmit(event) {

        console.log(this.state);
        var self = this;
        self.props.onClose();
        fetch('https://merrittwan-cs3200.herokuapp.com/api/study/patient', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(
                self.state
            )
        }).catch(function (error) {
            console.log(error);
            alert('We are unable to update the patient at this moment');
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
        console.log(this.state);
        return (
            <form onSubmit={this.handleSubmit}>
                <p> Patient id: {this.props.patientId} </p>
                <br />
                <label>
                    Address Line 1:
                    <input
                        name="street"
                        type="text"
                        value={this.state.address.street}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    City:
                    <input
                        name="city"
                        type="text"
                        value={this.state.address.city}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    State:
                    <input
                        name="aState"
                        type="text"
                        value={this.state.address.state}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Zip code:
                    <input
                        name="zip"
                        type="text"
                        value={this.state.address.zip}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Date of Birth:
                    <input
                        name="dob"
                        type="date"
                        value={this.state.dob}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Ethnicity:
                    <input
                        name="ethnicity"
                        type="String"
                        value={this.state.ethnicity}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Nationality:
                    <input
                        name="nationality"
                        type="String"
                        value={this.state.nationality}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Race:
                    <input
                        name="race"
                        type="String"
                        value={this.state.race}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Hometown:
                    <input
                        name="hometown"
                        type="String"
                        value={this.state.hometown}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Gender:
                    <input
                        name="sex"
                        type="text"
                        value={this.state.sex}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Healthy:
                    <input
                        name="healthy"
                        type="checkbox"
                        checked={this.state.healthy}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Placebo:
                    <input
                        name="placebo"
                        type="checkbox"
                        checked={this.state.placebo}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <div className="row justify-content-center">
                    <input className="btn btn-primary"  type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
import React, { Component } from "react";

export default class AddPatientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressId: null,
            city: "",
            aState: "",
            street: "",
            zip: "",
            dob: "",
            ethnicity: "",
            firstName: "",
            healthy: false,
            hometown: "",
            lastName: "",
            nationality: "",
            patientId: null,
            placebo: true,
            race: "",
            sex: "",
            studyId: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        };




    handleSubmit(event) {


        var self = this;
        self.props.onClose();
        fetch('http://localhost:8080/api/study/patient', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                address: {
                    addressId: null,
                    city: this.state.city,
                    state: this.state.aState,
                    street: this.state.street,
                    zip: this.state.zip,
                },
                dob: this.state.dob,
                ethnicity: this.state.ethnicuty,
                firstName: this.state.firstName,
                healthy: this.state.healthy,
                hometown: this.state.hometown,
                lastName: this.state.lastName,
                nationality: this.state.nationality,
                patientId: null,
                placebo: this.state.placebo,
                race: this.state.race,
                sex: this.state.sex,
                studyId: this.props.studyId
            })
        }).catch(function (error) {
            console.log(error);
            alert('We are unable to add the patient at this moment');
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
                    First Name:
                    <input
                        name="firstName"
                        type="text"
                        value={this.state.firstName}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Last Name:
                    <input
                        name="lastName"
                        type="text"
                        value={this.state.lastName}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Address Line 1:
                    <input
                        name="street"
                        type="text"
                        value={this.state.street}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    City:
                    <input
                        name="city"
                        type="text"
                        value={this.state.city}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    State:
                    <input
                        name="aState"
                        type="text"
                        value={this.state.aState}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Zip code:
                    <input
                        name="zip"
                        type="text"
                        value={this.state.zip}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Date of Birth:
                    <input
                        name="dob"
                        type="date"
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
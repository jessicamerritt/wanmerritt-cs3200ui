import React, { Component } from "react";
import SelectValue from "./selectValue";

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

    handleEthnicityChange(eth) {
        this.setState({
            ethnicity: eth.label
        })
    }

    handleRaceChange(race) {
        this.setState({
            race: race.label
        })
    }

    handleSexChange(sex) {
        console.log(sex);
        this.setState({
            sex: sex.value
        })
    }


    handleSubmit(event) {


        var self = this;
        self.props.onClose();
        fetch('https://merrittwan-cs3200.herokuapp.com/api/study/patient', {
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
                ethnicity: this.state.ethnicity,
                firstName: this.state.firstName,
                healthy: false,
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

        const raceOptions=[
            {
                label: "White",
                value: "Caucasian"
            },
            {
                label: "Black or African Ameican",
                value: "black"
            },
            {
                label: "American Indian or Alaska Native",
                value: "Native American"
            },
            {
                label: "Asian",
                value: "Asian"
            },
            {
                label: "Native Hawaiian or Other Pacific Islander",
                value: "Pacific Islander"
            }
        ];

        const ethnicityOptions = [
            {
                label: "Hispanic or Latino",
                value: "hispanic"
            },
            {
                label: "Not Hispanic or Latino",
                value: "not hispanic"
            }
        ];

        const sexOptions=[
            {
                label: "Male",
                value: "MALE"
            },
            {
                label: "Female",
                value: "FEMALE"
            }
        ];

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
                    Nationality:
                    <input
                        name="nationality"
                        type="String"
                        value={this.state.nationality}
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
                <SelectValue name="Select Ethnicity"
                             value={this.state.ethnicity}
                             options={ethnicityOptions}
                             onChange={this.handleEthnicityChange.bind(this)}
                />
                <SelectValue name="Select race"
                             value={this.state.race}
                             options={raceOptions}
                             onChange={this.handleRaceChange.bind(this)}
                />

                <SelectValue name="Select sex"
                             value={this.state.sex}
                             options={sexOptions}
                             onChange={this.handleSexChange.bind(this)}
                />
                <br />
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
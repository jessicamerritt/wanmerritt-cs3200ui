import React, { Component } from "react";
import SelectValue from './selectValue';

export default class UpdatePatientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.patient;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };




    handleSubmit(event) {

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
                <p> Patient id: {this.state.patientId} </p>
                <p> Patient name: {this.state.firstName + " " + this.state.lastName} </p>
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
                <label>
                    Nationality:
                    <input
                        name="nationality"
                        type="String"
                        value={this.state.nationality}
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
                <div className="row justify-content-center">
                    <input className="btn btn-primary"  type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
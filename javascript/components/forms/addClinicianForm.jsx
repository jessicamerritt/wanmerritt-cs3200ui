import React, { Component } from "react";
import SelectValue from "./selectValue";

export default class AddClinicialForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            id: null,
            clinicians: [],
            addExisting: true,
            selectedClinician: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    loadCliniciansFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/clinician/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var clinicians = data.map(function (clin) {
                return {
                    firstName: clin.firstName,
                    lastName: clin.lastName,
                    id: clin.id,
                    label: clin.firstName + " " + clin.lastName,
                    value: clin.lastName
                }
            })
            self.setState({clinicians: clinicians});
        });
    }

    componentDidMount() {
        this.loadCliniciansFromServer();
    }





    handleSubmit(event) {
        var body = {};
        if (this.state.addExisting) {
            if (!this.state.selectedClinician) {
                alert('Must select clinician!');
                return;
            }
            else {
                body = JSON.stringify({
                    clinician: {
                        clinicianId: this.state.selectedClinician.id,
                        firstName: this.state.selectedClinician.firstName,
                        lastName: this.state.selectedClinician.lastName,
                    },
                    studyId: this.props.studyId
                })
            }
        } else {
            body = JSON.stringify({
                clinician: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                },
                studyId: this.props.studyId
            })
        }


        var self = this;
        self.props.onClose();
        fetch('https://merrittwan-cs3200.herokuapp.com/api/study/clinician', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: body
        }).catch(function (error) {
            console.log(error);
            alert('We are unable to add the clinician at this moment');
        }).then(function(response) {
            if (response.status == 500) {
                alert('That clinician is already part of this study');
                return;
            }
            self.props.onSuccess();
            alert('Success');
        });
        event.preventDefault();
    }

    handleClinicianChange(val) {
        this.setState({
            selectedClinician: val
        });
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
        if (this.state.addExisting) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label> Add existing:
                        <input
                            name="addExisting"
                            type="checkbox"
                            checked={this.state.addExisting}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />

                    <SelectValue name="Select Clinician"
                                 value={this.state.selectedClinician.label}
                                 options={this.state.clinicians}
                                 onChange={this.handleClinicianChange.bind(this)}/>
                    <div className="row justify-content-center">
                        <input className="btn btn-primary"  type="submit" value="Submit" />
                    </div>
                </form>
            )

        }
        return (
            <form onSubmit={this.handleSubmit}>
                <label> Add existing:
                    <input
                        name="addExisting"
                        type="checkbox"
                        checked={this.state.addExisting}
                        onChange={this.handleInputChange} />

                </label>
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
                <div className="row justify-content-center">
                    <input className="btn btn-primary"  type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
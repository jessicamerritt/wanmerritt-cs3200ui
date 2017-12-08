import React, { Component } from "react";
import SelectValue from "./selectValue";

export default class AddPIForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressId: null,
            city: "",
            aState: "",
            street: "",
            zip: "",
            email: "",
            phone: "",
            firstName: "",
            lastName: "",
            institutions: [],
            selectedInstitution: {},

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    loadInstituionsFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/institution/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var institutions = data.map(function(institution) {
                return {
                    id: institution.institutionId,
                    label: institution.name,
                    value: institution.type
                }
            })
            self.setState({institutions: institutions});

        });
    }

    componentDidMount() {
        this.loadInstituionsFromServer();
    }



    handleSubmit(event) {


        if (!this.state.selectedInstitution) {
            alert('Please select an institution');
            return;
        }
        var self = this;
        self.props.onClose();
        fetch('https://merrittwan-cs3200.herokuapp.com/api/study/principalinvestigator', {
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
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                institutionId: this.state.selectedInstitution.id,
                email: this.state.email,
                phone: this.state.phone
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

    handleInstitutionChange(institution) {
        this.setState({
            selectedInstitution: institution
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
                    Email:
                    <input
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Phone:
                    <input
                        name="phone"
                        type="text"
                        value={this.state.phone}
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
                <SelectValue name="Select Institution"
                             options={this.state.institutions}
                             value={this.state.selectedInstitution.label}
                             onChange={this.handleInstitutionChange.bind(this)}
                />

                <br />
                <div className="row justify-content-center">
                    <input className="btn btn-primary"  type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
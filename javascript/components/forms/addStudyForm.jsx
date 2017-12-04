import React, { Component } from "react";

export default class AddPatientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            drugs: [],
            endDate: "",
            startDate: "",
            medicalCondition: {
                conditionId: "",
                name: "",
                description: "",
            },
            principalInvestigator: {
                email: "",
                firstName: "",
                institution: {
                    address: {
                        addressId: null,
                        street: "",
                        city: "",
                        state: "",
                        zip: ""
                    },
                    institutionId: null,
                    name: "",
                    type: ""
                },
                lastName: "",
                phone: "",
                principalInvestigatorId: null
            },
            title: "",
            drugs: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    loadDrugsFromServer() {
        var self = this;
        fetch("http://localhost:8080/api/drug/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            self.setState({drugs: data});

        });
    }



    handleSubmit(event) {


        var self = this;
        self.props.onClose();
        fetch('http://localhost:8080/api/study/new', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({

                completed: false,
                description: self.state.description,
                drugs: self.state.drugs,
               /* {
                    "dosageAmount": 10,
                    "dosageUnit": "ml",
                    "drug": {
                        "drugId": 0,
                        "marketName": "Bleomycin",
                        "scientificName": "",
                        "toxicity": "",
                        "previousSuccess": 0
                    },
                    "treatmentIntervalTime": 10,
                    "treatmentIntervalType": "MONTH"
                }
            ],*/
                endDate: self.state.endDate,
                medicalCondition: self.state.medicalCondition,
                principalInvestigator: self.state.principalInvestigator,
                startDate: self.state.startDate,
                successful: "in_progress",
                title: self.state.title,
            })
        }).catch(function (error) {
            console.log(error);
            alert('We are unable to add the study at this moment');
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
                    Title:
                    <input
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Description:
                    <textarea
                        value={this.state.description}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Start Date:
                    <input
                        name="startDate"
                        type="date"
                        onChange={this.startDate} />
                </label>
                <label>
                    End Date:
                    <input
                        name="endDate"
                        type="date"
                        onChange={this.endDate} />
                </label>

                <div className="row justify-content-center">
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
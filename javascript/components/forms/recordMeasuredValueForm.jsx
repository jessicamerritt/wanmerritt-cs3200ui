import React, { Component } from "react";
import SelectValue from './selectValue';

export default class RecordMeasuredValueForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clinicians: [],
            measuredValues: [],
            selectedClinician: {},
            selectedMeasuredValue: {},
            other: false,
            date: "",
            maxHealthyAmount: 0,
            measuredValueId: 0,
            minHealthyAmount: 0,
            valueDescription: "",
            valueName: "",
            valueUnit: "",
            patientId: this.props.patient.patientId,
            valueMeasure: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };




    handleSubmit(event) {
        console.log(this.state.patientId);

        var self = this;
        self.props.onClose();
        fetch('https://merrittwan-cs3200.herokuapp.com/api/measuredvalue/record', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(
                {
                    clinicianId: this.state.selectedClinician.clinicianId,
                    date: this.state.date,
                    measuredValue: {
                        maxHealthyAmount: this.state.maxHealthyAmount,
                        minHealthyAmount: this.state.minHealthyAmount,
                        measuredValueId: this.state.measuredValueId,
                        valueDescription: this.state.valueDescription,
                        valueName: this.state.valueName,
                        valueUnit: this.state.valueUnit
                    },
                    patientId: this.state.patientId,
                    valueMeasure: this.state.valueMeasure

                }
            )
        }).catch(function (error) {
            console.log(error);
            alert('We are unable to add the value at this moment');
        }).then(function(resp) {
            if (resp.status != 200) {
                alert('Failed to record value please try again');
            }
            self.props.onSuccess();
            alert('Success');
        });
        event.preventDefault();
    }

    componentDidMount() {
        this.loadCliniciansFromServer();
        this.loadMeasuredValuesFromServer();
    }

    loadMeasuredValuesFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/measuredvalue/all"
        ).then(function(response) {
            if (response.status != 200) {
                alert('No measured values were loaded');
                return [];
            }
            return response.json();
        }).then(function (data) {
            var measuredValues = data.map(function(measuredValue) {
                return {
                    maxHealthyAmount: measuredValue.maxHealthyAmount,
                    minHealthyAmount: measuredValue.minHealthyAmount,
                    measuredValueId: measuredValue.measuredValueId,
                    valueDescription: measuredValue.valueDescription,
                    valueName: measuredValue.valueName,
                    valueUnit: measuredValue.valueUnit,
                    label: measuredValue.valueName,
                    value: measuredValue.valueUnit
                }
            });

            measuredValues.push({label: "other", value:"other"});

            self.setState({measuredValues: measuredValues});
        });
    }

    loadCliniciansFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/clinician/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var clinicians = data.map(function(clinician) {
                return {
                    clinicianId: clinician.clinicianId,
                    label: clinician.firstName + " " + clinician.lastName,
                    value: clinician.lastName
                }
            });

            self.setState({clinicians: clinicians});
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

    selectClinician(val) {
        this.setState({
            selectedClinician: val
        })
    }

    selectMeasuredValue(val) {
        if (val.label == "other") {
            this.setState({
                other: true,
                maxHealthyAmount: 0,
                measuredValueId: null,
                minHealthyAmount: 0,
                value: "",
                valueDescription: "",
                valueName: "",
                valueUnit: "",
                selectedMeasuredValue: {
                    label: "Other",
                }
            })
            return;
        }
        this.setState({
            other: false,
            selectedMeasuredValue: val,
            maxHealthyAmount: val.maxHealthyAmount,
            measuredValueId: val.measuredValueId,
            minHealthyAmount: val.minHealthyAmount,
            value: val.value,
            valueDescription: val.valueDescription,
            valueName: val.valueName,
            valueUnit: val.valueUnit
        })

    }

    render() {

        var other = <div>
            <label>
                Value Name:
                <input
                    name="valueName"
                    type="text"
                    value={this.state.valueName}
                    onChange={this.handleInputChange} />
            </label>
            <label>
                Value Unit:
                <input
                    name="valueUnit"
                    type="text"
                    value={this.state.valueUnit}
                    onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
                Value Description:
                <textarea
                    name="valueDescription"
                    value={this.state.valueDescription}
                    onChange={this.handleInputChange} />
            </label>
            <br />

            <label>
                Max Healthy Value:
                <input
                    name="maxHealthyAmount"
                    type="number"
                    value={this.state.maxHealthyAmount}
                    onChange={this.handleInputChange} />
            </label>
            <label>
                Min Healthy Value:
                <input
                    name="minHealthyAmount"
                    type="number"
                    value={this.state.minHealthyAmount}
                    onChange={this.handleInputChange} />
            </label>
        </div>;

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Date recorded:
                    <input
                        name="date"
                        type="date"
                        value={this.state.date}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Value Measured:
                    <input
                        name="valueMeasure"
                        type="number"
                        value={this.state.valueMeasure}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <SelectValue name="Select Clinician"
                             value={this.state.selectedClinician ? this.state.selectedClinician.label : ""}
                             options={this.state.clinicians}
                             onChange={this.selectClinician.bind(this)}/>
                <SelectValue name="Select Measured Value Type"
                             value={this.state.other ? "other" :
                                 this.state.selectedMeasuredValue ? this.state.selectedMeasuredValue.label : ""}
                             options={this.state.measuredValues}
                             onChange={this.selectMeasuredValue.bind(this)}/>
                {this.state.other ? other : null}

                <div className="row justify-content-center">
                    <input className="btn btn-primary"  type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
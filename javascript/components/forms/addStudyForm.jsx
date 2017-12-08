import React, { Component } from "react";
import SelectValue from "./selectValue";
import StudyDrugFrom from "./studyDrugForm";

export default class AddStudyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            selectedDrug: null,
            otherMC: false,
            otherDrug: false,
            drugList: [],
            piList: [],
            mcList: [],
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
                address: {
                    addressId: null,
                    street: "",
                    city: "",
                    state: "",
                    zip: ""
                },
                institutionId: null,
                lastName: "",
                phone: "",
                principalInvestigatorId: null
            },
            title: "",
            drugs: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDrugValues = this.handleInputChangeDrugValues.bind(this);
        this.handleSDrugInputChange = this.handleSDrugInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleMCNameChange(mc) {
        this.setState({
            medicalCondition: {
                name: mc,
                description: this.state.medicalCondition.description
            }
        })
    }

    handleMCDesChange(mc) {
        this.setState({
            medicalCondition: {
                name: this.state.medicalCondition.name,
                description: mc
            }
        })
    }

    selectMC(mc) {
        if(mc.value == "other") {
            this.setState({
                otherMC: true,
                medicalCondition: {
                    name: "",
                    description: "",
                    conditionId: null,

                }
            });
            return;
        }
        this.setState({
            otherMC: false,
            medicalCondition: {
                conditionId: mc.conditionId,
                name: mc.name,
                description: mc.description,
            }
        })
    }

    selectDrug(drug) {
        if (drug.value == "other") {
            this.setState({
                otherDrug: true,
                selectedDrug: {
                    drug: {
                        drugId: null,
                        marketName: "",
                        previousSuccess: 0,
                        scientificName: "",
                        toxicity: ""
                    },
                dosageAmount: 0,
                dosageUnit: "",
                treatmentIntervalType: "",
                treatmentIntervalTime:  0
            }});
            return;
        }
        this.setState({
            otherDrug: false,
            selectedDrug: {
                drug: drug,
                dosageAmount: 0,
                dosageUnit: "",
                treatmentIntervalType: "",
                treatmentIntervalTime:  0
            }} );
    }

    selectPI(pi) {
        this.setState({
            principalInvestigator: {
                email: pi.email,
                firstName: pi.firstName,
                address: {
                    addressId: pi.addressId
                },
                institutionId: pi.institutionId,
                lastName: pi.lastName,
                phone: pi.phone,
                principalInvestigatorId: pi.principalInvestigatorId
            }
        })
    }

    loadDrugsFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/drug/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var drugList = data.map(function(drug) {
                return {
                    drugId: drug.drugId,
                    marketName: drug.marketName,
                    previousSuccess: drug.previousSuccess,
                    scientificName: drug.scientificName,
                    toxicity: drug.toxicity,
                    label: drug.marketName,
                    value: drug.scientificName
                }
            } );
            drugList.push({label: 'other', value: 'other'});
            self.setState({drugList: drugList});

        }).catch(error => alert('error loading the drugs'));
    }

    loadPiFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/principal/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var piList = data["#result-set-1"].map(function(pi) {
                return {
                    email: pi.EMAIL,
                    firstName: pi.FIRST_NAME,
                    address: {
                        addressId: pi.ADDRESS_ID,
                        street: pi.STREET,
                        city: pi.CITY,
                        state: pi.STATE,
                        zip: pi.ZIP
                    },
                    institutionId: pi.INSTITUTION_ID,
                    lastName: pi.LAST_NAME,
                    phone: pi.PHONE,
                    principalInvestigatorId: pi.PRINCIPAL_INVESTIGATOR_ID,
                    label: pi.FIRST_NAME + " " + pi.LAST_NAME,
                    value: pi.EMAIL
                }
            });
            self.setState({piList: piList});
        }).catch(error => alert('error loading the Principal Investigators'));;
    }

    loadMedicalConditionFromServer() {
        var self = this;
        fetch("https://merrittwan-cs3200.herokuapp.com/api/condition/all"
        ).then(function(response) {
            return response.json();
        }).then(function (data) {
            var mcList = data.map(function(mc) {
                return {
                    conditionId: mc.conditionId,
                    name: mc.name,
                    description: mc.description,
                    label: mc.name,
                    value: mc.name
                }
            });
            mcList.push({label: 'other', value: 'other'});
            self.setState({mcList: mcList});
        }).catch(error => alert('Unable to load the medical conditions at this time'));;
    }

    componentDidMount() {
        this.loadDrugsFromServer();
        this.loadPiFromServer();
        this.loadMedicalConditionFromServer();
    }

    addDrugToStudy() {
        if (!this.state.selectedDrug || !this.state.selectedDrug.drug ||
            this.state.selectedDrug.dosageUnit == "" ||
            this.state.selectedDrug.treatmentIntervalType == ""

        ) {
            alert('Please finish selecting a drug');
            return;
        }
        try {
            var drug = this.state.selectedDrug.drug;
            var drugArray = this.state.drugs;
            drugArray.push({
                drug: {
                    drugId: drug.drugId,
                    marketName: drug.marketName,
                    previousSuccess: drug.previousSuccess,
                    scientificName: drug.scientificName,
                    toxicity: drug.toxicity,
                },
                dosageAmount: this.state.selectedDrug.dosageAmount,
                dosageUnit: this.state.selectedDrug.dosageUnit,
                treatmentIntervalType: this.state.selectedDrug.treatmentIntervalType,
                treatmentIntervalTime:  this.state.selectedDrug.treatmentIntervalTime
            });
            this.setState({
                drugs: drugArray,
                selectedDrug: {},
                otherDrug: false
            });
        } catch (error) {
            alert(error);
        }

    }



    handleSubmit(event) {

        if(!this.state.medicalCondition || !this.state.principalInvestigator || !this.state.drugs) {
            alert('Please finish the form');
            return;
        }

        var self = this;
        fetch('https://merrittwan-cs3200.herokuapp.com/api/study/new', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({

                completed: false,
                description: self.state.description,
                drugs: self.state.drugs,
                endDate: self.state.endDate,
                medicalCondition: self.state.medicalCondition,
                principalInvestigator: self.state.principalInvestigator,
                startDate: self.state.startDate,
                successful: "IN_PROGRESS",
                title: self.state.title,
            })
        }).catch(function (error) {
            console.log(error);
            alert('We are unable to add the study at this moment');
            return;
        }).then(function(resp) {
            if (resp.status == 500 || resp.status == 400) {
                alert('Please complete the form');
                return;
            }
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

    handleSDrugInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            selectedDrug : Object.assign(
                {},
                this.state.selectedDrug,
                {drug: Object.assign({}, this.state.selectedDrug.drug, {[name]: value})}
            )
        });
    }

    selectTreatmentInterval(val) {
        this.setState({
            selectedDrug : Object.assign(
                {},
                this.state.selectedDrug,
                {treatmentIntervalType: val.value}
            )
        });
    }

    handleInputChangeDrugValues(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            selectedDrug : Object.assign(
                {},
                this.state.selectedDrug,
                {[name]: value}
            )
        });

    }

    render() {

        var treatmentTypeOptions = [
            {label: "month", value: "MONTH"},
            {label: "hour", value: "HOUR"},
            {label: "minute", value: "MINUTE"},
            {label: "week", value: "WEEK"},
            {label: "day", value: "DAY"}
        ]


        var drugsAdded = "Drugs added: ";
        var key = 1;
        this.state.drugs.forEach(function(drug) {
            key ++;
            drugsAdded = drugsAdded + drug.drug.marketName + " ";
        });

        var mcOther = this.state.otherMC ?
            <div>
            <label>
                Medical Condition Name:
                <input
                    name="mcName"
                    type="text"
                    value={this.state.medicalCondition.name}
                    onChange={this.handleMCNameChange} />
            </label>
            <label>
                Description:
                <textarea
                    name="description"
                    value={this.state.medicalCondition.description}
                    onChange={this.handleMCDesChange} />
            </label>
            </div> :
            null;

        var drugOther = this.state.otherDrug ?
            <div>
                <label>
                    Market Name:
                    <input
                        name="marketName"
                        type="text"
                        value={this.state.selectedDrug ? this.state.selectedDrug.marketName : ""}
                        onChange={this.handleSDrugInputChange} />
                </label>
                <br />
                <label>
                    Scientific Name:
                    <input
                        name="scientificName"
                        type="text"
                        value={this.state.selectedDrug ? this.state.selectedDrug.scientificName : ""}
                        onChange={this.handleSDrugInputChange} />
                </label>
                <br />
                <label>
                    Previous Success:
                    <input
                        name="previousSuccess"
                        type="number"
                        value={this.state.selectedDrug.previousSuccess}
                        onChange={this.handleSDrugInputChange} />
                </label>
                <br />
                <label>
                    Toxicity:
                    <input
                        name="toxicity"
                        type="text"
                        value={this.state.selectedDrug ? this.state.selectedDrug.toxicity : ""}
                        onChange={this.handleSDrugInputChange} />
                </label>
            </div> :
            null;
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
                        name="description"
                        value={this.state.description}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Start Date:
                    <input
                        name="startDate"
                        type="date"
                        value={this.state.startDate}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label >
                    End Date:
                    <input
                        name="endDate"
                        type="date"
                        value={this.state.endDate}
                        onChange={this.handleInputChange}
                    />
                </label>
                <SelectValue name="Medical Condition"
                             options={this.state.mcList}
                             value={this.state.otherMC ? 'other' :
                                 this.state.medicalCondition.name
                             }
                             onChange={this.selectMC.bind(this)}/>
                {mcOther}
                <SelectValue name="Principal Investigator"
                             options={this.state.piList}
                             value={this.state.principalInvestigator ?
                                 this.state.principalInvestigator.firstName + " " + this.state.principalInvestigator.lastName :
                                 null
                             }
                             onChange={this.selectPI.bind(this)}/>
                <SelectValue name="Drugs"
                             options={this.state.drugList}
                             value={this.state.otherDrug ? 'other' : this.state.selectedDrug && this.state.selectedDrug.drug ? this.state.selectedDrug.drug.marketName : ""}
                             onChange={this.selectDrug.bind(this)}/>
                <label>
                    Dosage Amount:
                    <input
                        name="dosageAmount"
                        type="number"
                        value={this.state.selectedDrug ? this.state.selectedDrug.dosageAmount : 0}
                        onChange={this.handleInputChangeDrugValues} />
                </label>
                <label>
                    Dosage Unit:
                    <input
                        name="dosageUnit"
                        type="text"
                        value={this.state.selectedDrug ? this.state.selectedDrug.dosageUnit : ""}
                        onChange={this.handleInputChangeDrugValues} />
                </label>
                <br />
                <label>
                    Treatment Interval Time:
                    <input
                        name="treatmentIntervalTime"
                        type="number"
                        value={this.state.selectedDrug ? this.state.selectedDrug.treatmentIntervalTime : 0}
                        onChange={this.handleInputChangeDrugValues}
                    />
                </label>
                <SelectValue name="Treatment Interval Type"
                             options={treatmentTypeOptions}
                             value={this.state.selectedDrug ? this.state.selectedDrug.treatmentIntervalType : ""}
                             onChange={this.selectTreatmentInterval.bind(this)}/>


                {drugOther}
                <button className="btn btn-primary" type="button" onClick={this.addDrugToStudy.bind(this)}>Add Drug </button>
                <div>{drugsAdded}</div>
                <div className="row justify-content-center">
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>

            </form>
        );
    }
}
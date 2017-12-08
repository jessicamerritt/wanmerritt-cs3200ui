import React, {Component} from "react";
import SelectValue from "../forms/selectValue";

export default class TreatmentTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treatmentType: false,
            options: [
                {
                    label: "placebo",
                    value: true
                }, {
                    label: "drug",
                    value: false
                }
            ]
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        var self = this;
        fetch('https://merrittwan-cs3200.herokuapp.com/api/study/treatment?studyId=' + self.props.studyId +
              '&placebo=' + self.state.treatmentType
        ).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.props.callback(data);
        }).catch(err => alert('We are unable to complete that search, please check your formatting'));
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

    selectTreatmentType(val) {
        this.setState({
                          treatmentType: val.value
                      })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <SelectValue name="Search by Treatment Type"
                                 options={this.state.options}
                                 value={this.state.treatmentType ? 'placebo' : 'drug'}
                                 onChange={this.selectTreatmentType.bind(this)}/>
                </div>
                <div className="row justify-content-center">
                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}
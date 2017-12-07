import React, {Component} from "react";
import SelectValue from "../forms/selectValue";

export default class TreatmentTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treatmentType: "",
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
        fetch('http://localhost:8080/api/study/treatment?studyId=' + self.props.studyId +
              '&placebo=' + self.state.treatmentType
        ).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.props.callback(data);
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

    selectTreatmentType(val) {
        this.setState({
                          treatmentType: val.value
                      })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <SelectValue name="Select Treatment Type"
                                 options={this.state.options}
                                 onChange={this.selectTreatmentType.bind(this)}/>
                </div>
                <div className="row justify-content-center">
                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}
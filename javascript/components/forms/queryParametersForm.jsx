import React, {Component} from "react";

export default class QueryParametersForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dob: "",
            sex: "",
            hometown: "",
            nationality: "",
            race: "",
            ethnicity: "",
            healthy: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        var self = this;
        fetch('http://localhost:8080/api/study/characteristics?studyId=' + self.props.studyId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(this.state)
        }).then(function (response) {
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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h4>Patient Characteristics</h4>

                <label>
                    Date of Birth:
                    <input
                        name="dob"
                        type="date"
                        onChange={this.handleInputChange}/>
                </label>
                <br />
                <label>
                    Ethnicity:
                    <input
                        name="ethnicity"
                        type="String"
                        value={this.state.ethnicity}
                        onChange={this.handleInputChange}/>
                </label>
                <label>
                    Nationality:
                    <input
                        name="nationality"
                        type="String"
                        value={this.state.nationality}
                        onChange={this.handleInputChange}/>
                </label>
                <br />
                <label>
                    Race:
                    <input
                        name="race"
                        type="String"
                        value={this.state.race}
                        onChange={this.handleInputChange}/>
                </label>
                <label>
                    Hometown:
                    <input
                        name="hometown"
                        type="String"
                        value={this.state.hometown}
                        onChange={this.handleInputChange}/>
                </label>
                <br />
                <label>
                    Gender:
                    <input
                        name="sex"
                        type="text"
                        value={this.state.sex}
                        onChange={this.handleInputChange}/>
                </label>
                <br />
                <label>
                    Healthy:
                    <input
                        name="healthy"
                        type="checkbox"
                        checked={this.state.healthy}
                        onChange={this.handleInputChange}/>
                </label>
                <br />
                <div className="row justify-content-center">
                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}
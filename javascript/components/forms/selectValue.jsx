import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import React from 'react';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';


export default class SelectValue extends React.Component {


    render() {

        return (
            <div>
                <h4> {this.props.name} </h4>
                <h5> Selected value:  {this.props.value} </h5>
            <Select
                name={this.props.name}
                value="one"
                options={this.props.options}
                onChange={this.props.onChange}
            />
            </div>
        );
    }
}
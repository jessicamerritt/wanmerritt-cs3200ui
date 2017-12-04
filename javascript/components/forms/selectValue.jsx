import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import React from 'react';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';


export default class SelectValue extends React.Component {




    render() {
        const opts =[
            {
                value: '1',
                label: 'hit',
                id: 'meh'

            },
            {
                value: '2',
                label: 'foo',
                id: 'meh'



            },
            {
                value: '4',
                label: 'bar',
                id: 'meh'


            },
            {
                value: '5',
                label: 'bar',
                id: 'meh'


            },
        ];
        return (
            <div>
                <h4> {this.props.name} </h4>
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
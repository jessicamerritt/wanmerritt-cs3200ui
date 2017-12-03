import React from 'react';

export default class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className="row">
                        <div className="col-9">
                            <h1>{this.props.header}</h1>
                        </div>
                        <div className="col-1">
                            <button className="btn btn-primary close-button" onClick={this.props.closePopup}>X</button>
                        </div>
                    </div>

                    <div> {this.props.children} </div>

                </div>
            </div>
        );
    }
}
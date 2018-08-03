import React from 'react';
import render from 'react-dom';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

export default class EditableLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: fromJS({
                view: 'label',
                value: '',
                previous: ''
            })
        };

        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    async componentWillMount() {
        const { initialValue } = this.props;
        const { value, previous } = this.state.data.toJS();

        if (value == '') {
            await this.changeValue(initialValue);
        }

        if (previous == '') {
            await this.changePrevious(initialValue);
        }
    }

    componentDidUpdate() {
        const { view } = this.state.data.toJS();

        if (view == 'text') {
            this.textInput.focus();
        }
    }

    switchView(view) {
        const { data } = this.state;

        this.setState({
            data: data.mergeDeep({
                view: view
            })
        });
    }

    changePrevious(previous) {
        const { data } = this.state;

        return new Promise((resolve, reject) => {
            this.setState({
                data: data.mergeDeep({
                    previous: previous
                })
            }, () => {
                resolve();
            });
        });
    }

    changeValue(value) {
        const { data } = this.state;

        return new Promise((resolve, reject) => {
            this.setState({
                data: data.mergeDeep({
                    value: value
                })
            }, () => {
                resolve();
            });
        });
    }

    async handleKeyUp(e) {
        const { value, previous } = this.state.data.toJS();
        const { save, disableKeys } = this.props;

        if (disableKeys === true) {
            return;
        }

        //We need this otherwise React squawks at accessing the event in an async function
        e.persist();

        if (e.key == 'Escape') {
            await this.changeValue(previous);

            this.switchView('label');
        } else if (e.key == 'Enter') {
            await this.changeValue(e.target.value);
            await this.changePrevious(e.target.value);

            this.switchView('label');
            save(e.target.value);
        }
    }

    renderInput() {
        const { value } = this.state.data.toJS();
        const { save, inputClass } = this.props;

        return (
            <div>
                <input
                    type="text"
                    value={value}
                    ref={input => this.textInput = input}
                    className={inputClass !== undefined ? inputClass : ''}
                    onChange={e => {
                        this.changeValue(e.target.value);
                    }}
                    onBlur={e => {
                        this.switchView('label');
                        this.changePrevious(e.target.value);
                        save(e.target.value);
                    }}

                    onKeyUp={this.handleKeyUp}
                />
            </div>
        );
    }

    renderLabel() {
        const { value } = this.state.data.toJS();
        const { labelClass } = this.props;

        return (
            <div>
                <span className={labelClass !== undefined ? labelClass : ''} onClick={e => {
                    this.switchView('text');
                }}>{value}</span>
            </div>
        );
    }

    render() {
        const { view } = this.state.data.toJS();
        const { initialValue } = this.props;

        if (view == 'label') {
            return this.renderLabel();
        } else {
            return this.renderInput();
        }
    }
}

EditableLabel.propTypes = {
    initialValue: PropTypes.string.isRequired,
    save: PropTypes.func.isRequired,
    labelClass: PropTypes.string,
    inputClass: PropTypes.string,
    disableKeys: PropTypes.bool
}

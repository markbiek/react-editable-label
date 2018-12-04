import React from 'react';
import render from 'react-dom';
import PropTypes from 'prop-types';

export default class EditableLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 'label',
            value: '',
            previous: ''
        };

        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    async componentWillMount() {
        const { initialValue } = this.props;
        const { value, previous } = this.state;

        if (value == '') {
            await this.changeValue(initialValue);
        }

        if (previous == '') {
            await this.changePrevious(initialValue);
        }
    }

    componentDidUpdate() {
        const { view } = this.state;

        if (view == 'text') {
            this.textInput.focus();
        }
    }

    switchView(view) {
        this.setState({
            view
        });
    }

    changePrevious(previous) {
        return new Promise((resolve, reject) => {
            this.setState({
                previous
            }, () => {
                resolve();
            });
        });
    }

    changeValue(value) {
        return new Promise((resolve, reject) => {
            this.setState({
                value
            }, () => {
                resolve();
            });
        });
    }

    async handleKeyUp(e) {
        const { value, previous } = this.state;
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
        const { value } = this.state;
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
        const { value } = this.state;
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
        const { view } = this.state;
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

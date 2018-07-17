# EditableLabel
A simple React component for switching between a text label and a text input.

Clicking on the text label switches the label to a text input. A loss of focus on the text input will switch back to the text label and save the text changes.

An `ESC` key press will switch from text input back to label and discard any changes made to the text in the input.

An `ENTER` key press will switch from text input back to label and save any changes made.

When a save is triggered, the `save` function passed in as a prop is called with the current value of the input.

![Label view](https://i.imgur.com/zZokjZO.png)

![Input view](https://i.imgur.com/vLPgHOg.png)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

`$ npm install react-editable-label`
`$ yarn add react-editable-label`

## Usage
The `EditableLabel` object requires two props:

- `initialValue` which is the initial text to display
- `save` which is the function called when the text is updated.

Optional props:

- `labelClass` which is added to the `className` of the label `<span>` tag.
- `inputClass` which is added to the `className` of the text `<input>` tag.
- `disableKeys` which disables the keyPress handler.

Example:

```
import React from 'react';
import {render} from 'react-dom';

import EditableLabel from 'react-editable-label';

class App extends React.Component {
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-2">
                        <p>Hello!</p>
                        <EditableLabel
                            initialValue={'World'}
                            save={value => {
                                console.log(`Saving '${value}'`);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

let app = document.getElementById('app');

if (app) {
    render(<App/>, app);
}
```

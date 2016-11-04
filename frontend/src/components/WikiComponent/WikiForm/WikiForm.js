import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import { TextFormField } from '../../Field';
import { EditableField } from '../../EditableField';

var tmpId = -1;

class WikiForm extends React.Component {
    cancelChange() {
        browserHistory.goBack();
    }

    submitForm(val) {
        console.log(val);
    }

    handleEditorChange(e) {
        console.log(e.target.getContent());
        // this.props.saveContent(e.target.getContent());
    }

    render() {
        const { wiki, handleSubmit } = this.props;

        return (
            <form id={ this.props.section.WikiSection.name } onSubmit={ handleSubmit((values) => {
                this.submitForm(values)
            }) }>

                <TextFormField name="sectionTitle" floatingLabelText="Title"/>
                <EditableField
                    name="wiki" 
                    onChange={ this.handleEditorChange.bind(this) }
                />

                <div className="row center-md center-xs" style={{marginTop: "18px"}}>
                    <div>
                        <RaisedButton className="raised-btn" label="Save changes" primary={true} type="submit"/>
                    </div>
                </div>
                <div className="row center-md center-xs" style={{marginTop: "18px"}}>
                    <div>
                        <RaisedButton className="raised-btn" label="Cancel" onClick={this.cancelChange.bind(this)}/>
                    </div>
                </div>
            </form>
        );
    }
}

// Decorate with redux-form
export default reduxForm({
  form: 'WikiForm'
})(WikiForm);
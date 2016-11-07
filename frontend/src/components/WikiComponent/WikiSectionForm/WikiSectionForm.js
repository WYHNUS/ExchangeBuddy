import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import { TextField } from 'redux-form-material-ui';
import { EditableField } from '../../EditableField';


export default class WikiSectionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: null
        }
    }

    componentDidUpdate() {
        if (this.props.uploadSuccess) {
            this.redirectBack();
        }
    }

    redirectBack() {
        browserHistory.push('/wiki/' + this.props.wikiName);
    }

    submitForm() {
        const { wikiName } = this.props;
        this.props.createVersion(wikiName, this.state.title, this.state.content);
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleEditorChange(e) {
        this.setState({ content: e.target.getContent() });
    }

    render() {
        const { wikiName, submitting, error, uploadSuccess } = this.props;

        return (
            <div id={ wikiName }>
                <TextField 
                    name="sectionTitle" 
                    floatingLabelText="Title" 
                    value={ this.state.title }
                    onChange={ this.handleTitleChange.bind(this) }
                />

                <EditableField
                    name="sectionContent" 
                    content={ this.state.content }
                    onChange={ this.handleEditorChange.bind(this) }
                />

                {
                    submitting ? 
                        <p>Uploading new section to the server...</p>
                    :
                        error ?
                            error.message ?
                                <p> { error.message } </p>
                            : <p>{ error }</p>
                        : uploadSuccess ?
                                <p>Upload new section successful! :)</p>
                            : null
                }

                <div className="row center-md center-xs" style={{marginTop: "18px"}}>
                    <div>
                        <RaisedButton className="raised-btn" label="Add Section" primary={true} disabled={submitting}
                            onClick={this.submitForm.bind(this)}
                        />
                    </div>
                </div>
                <div className="row center-md center-xs" style={{marginTop: "18px"}}>
                    <div>
                        <RaisedButton className="raised-btn" label="Cancel" onClick={this.redirectBack.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}
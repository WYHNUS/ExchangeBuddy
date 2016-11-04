import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

// import { TextFormField } from '../../Field';
import { TextField } from 'redux-form-material-ui';
import { EditableField } from '../../EditableField';


export default class WikiForm extends React.Component {
    constructor(props) {
        super(props);

        const { WikiSection, content } = this.props.section;
        this.state = {
            title: WikiSection.name,
            content: content
        }
    }

    componentWillMount() {
        const { WikiSection, content } = this.props.section;
        // assign initialValues
        this.props.initializeForm(WikiSection.name, content);
    }

    cancelChange() {
        browserHistory.goBack();
    }

    submitForm() {
        console.log(this.state);
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleEditorChange(e) {
        this.setState({ content: e.target.getContent() });
    }

    render() {
        const { wiki, section, formValue, handleSubmit } = this.props;

        return (
            <div id={ section.WikiSection.name }>

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

                <div className="row center-md center-xs" style={{marginTop: "18px"}}>
                    <div>
                        <RaisedButton className="raised-btn" label="Save changes" primary={true} 
                            onClick={this.submitForm.bind(this)}
                        />
                    </div>
                </div>
                <div className="row center-md center-xs" style={{marginTop: "18px"}}>
                    <div>
                        <RaisedButton className="raised-btn" label="Cancel" onClick={this.cancelChange.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}
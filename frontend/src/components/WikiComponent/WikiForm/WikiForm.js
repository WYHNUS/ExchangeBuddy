import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { TextField } from 'redux-form-material-ui';
import { EditableField } from '../../EditableField';


export default class WikiForm extends React.Component {
  static propTypes = {
    closeEditForm: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { title, content } = this.props.section;
    this.state = {
      title: title,
      content: content
    }
  }

  componentWillMount() {
    const { title, content } = this.props.section;
    // assign initialValues
    this.props.initializeForm(title, content);
  }

  componentDidUpdate() {
    if (this.props.uploadSuccess) {
      this.props.closeEditForm();
    }
  }

  render() {
    const { section, submitting, error, uploadSuccess, closeEditForm } = this.props;

    return (
      <div id={ section.WikiSection.name }>
        <TextField 
          name="sectionTitle" 
          fullWidth
          floatingLabelText="Title" 
          value={ this.state.title }
          onChange={ this.handleTitleChange.bind(this) } />

        <EditableField
          name="sectionContent" 
          content={ this.state.content }
          onChange={ this.handleEditorChange.bind(this) } />

        {
          submitting ? 
          <p>Uploading new version to the server...</p>
          :
          error ?
          error.message ?
          <p> { error.message } </p>
          : <p>{ error }</p>
          : uploadSuccess ?
          <p>Upload new version successful! :)</p>
        : null
      }

      <div className="row center-md center-xs" style={{ marginTop: 18 }}>
        <div>
          <RaisedButton 
            primary 
            className="raised-btn" 
            label="Save changes" 
            style={{ marginRight: 18 }}
            disabled={ submitting }
            onClick={ this.submitForm.bind(this) }
            />
            <RaisedButton className="raised-btn" label="Cancel" onClick={ closeEditForm }/>
          </div>
        </div>
      </div>
    );
  }

  submitForm() {
    const { section, wikiName } = this.props;
    this.props.createVersion(wikiName, section.WikiSection.sectionIndex, this.state.title, this.state.content);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }
}
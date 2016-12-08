import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { TextField } from 'redux-form-material-ui';
import { EditableField } from '../../EditableField';

export default class WikiForm extends React.Component {
  static propTypes = {
    closeEditForm: React.PropTypes.func.isRequired,
    wikiName: React.PropTypes.string.isRequired,
    section: React.PropTypes.object,
    submitting: React.PropTypes.bool.isRequired,
    error: React.PropTypes.object,
    uploadSuccess: React.PropTypes.bool.isRequired,
    submitNewSection: React.PropTypes.func.isRequired,
    submitNewSectionVersion: React.PropTypes.func.isRequired,
    initializeWikiForm: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { section } = this.props;

    if (!section) {
      this.state = {
        title: 'New Section',
        content: '',
      };
    } else {
      const { title, content } = this.props.section;

      this.state = {
        title: title,
        content: content
      };
    }
  }

  componentWillMount() {
    const { section, initializeWikiForm } = this.props;

    if (section) {
      const { title, content } = this.props.section;

      // Assign initialValues
      initializeWikiForm(title, content);
    }
  }

  componentDidUpdate() {
    if (this.props.uploadSuccess) {
      this.props.closeEditForm();
    }
  }

  render() {
    const { section, submitting, error, uploadSuccess, closeEditForm } = this.props;

    return (
      <div>
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

        { // TODO: Refactor this into a proper loading container
          submitting 
          ?  <p>Uploading new version to the server...</p>
          : error 
            ? error.message 
              ? <p> { error.message } </p>
              : <p>{ error }</p>
            : uploadSuccess 
              ? <p>Upload new version successful! :)</p>
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
              onClick={ this.submitForm.bind(this) } />
            <RaisedButton className="raised-btn" label="Cancel" onClick={ closeEditForm }/>
          </div>
        </div>
      </div>
    );
  }

  submitForm() {
    const { section, wikiName, submitNewSectionVersion, submitNewSection } = this.props;
    const { title, content } = this.state;

    if (!section) {
      console.log(wikiName, title, content);
      submitNewSection(wikiName, title, content);
    } else {
      submitNewSectionVersion(wikiName, section.WikiSection.sectionIndex, title, content);
    }
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }
}
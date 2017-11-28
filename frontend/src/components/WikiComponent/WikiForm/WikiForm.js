import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { TextField } from 'redux-form-material-ui';
import { EditableField } from '../../EditableField';

export default class WikiForm extends React.Component {
  static propTypes = {
    closeEditForm: React.PropTypes.func.isRequired,
    wikiName: React.PropTypes.string.isRequired,
    section: React.PropTypes.object,
    submitNewSection: React.PropTypes.func.isRequired,
    submitNewSectionVersion: React.PropTypes.func.isRequired,
    refreshWiki: React.PropTypes.func.isRequired,
    showSnackbar: React.PropTypes.func.isRequired,
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

  render() {
    const { closeEditForm } = this.props;

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

        <div className="row center-md center-xs" style={{ marginTop: 18 }}>
          <div>
            <RaisedButton 
              primary 
              className="raised-btn" 
              label="Save changes" 
              style={{ marginRight: 18 }}
              onClick={ this.submitForm.bind(this) } />
            <RaisedButton className="raised-btn" label="Cancel" onClick={ closeEditForm }/>
          </div>
        </div>
      </div>
    );
  }

  submitForm() {
    const { section, wikiName, submitNewSectionVersion, submitNewSection, refreshWiki, showSnackbar } = this.props;
    const { title, content } = this.state;

    if (!section) {
      submitNewSection({ wikiTitle: wikiName, versionTitle: title, content }, () => {
        refreshWiki();
        showSnackbar('New section created!');
      }, (err) => {
        showSnackbar('Could not create section: ' + err);
      });
    } else {
      submitNewSectionVersion({ wikiTitle: wikiName, sectionIndex: section.WikiSection.sectionIndex, versionTitle: title, content }, () => {
        refreshWiki();
        showSnackbar('Section updated!');
      }, (err) => {
        showSnackbar('Could not update section: ' + err)
      });
    }
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }
}
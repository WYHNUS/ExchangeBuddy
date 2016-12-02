import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import { Row, Col } from 'react-flexbox-grid';
import { TextFormField } from '../Field';
import { EditableField } from '../EditableField';

var tmpId = -1;

class StoryForm extends React.Component {
  render() {
    const { storyDetails, handleSubmit, error, uploading, published } = this.props;
    
    if (published) {
      // handle redirection here if needed
      tmpId = storyDetails.storyId;
      this.props.cleanUp();
      setTimeout(function() {
        browserHistory.push('/stories/' + tmpId);
      }, 2000);
    } else if (!this.props.isLoggedin) {
      browserHistory.push('/');
    }

    return (
      <form onSubmit={ handleSubmit((values) => {
        this.submitForm(values)
      }) }>
        <TextFormField name="storyTitle" floatingLabelText="Title"/>

        <EditableField
          name="story" 
          content={ storyDetails.content }
          onChange={ this.handleEditorChange.bind(this) }
        />

        { uploading ?
          <div className="row center-md center-xs" style={{ marginTop: 15 }}>
            <p> Posting your story ... </p>
          </div>
          : null
        }
        { error ?
          <div className="row center-md center-xs" style={{ marginTop: 15 }}>
            <p> An error has occurred. </p>
          </div>
          : null
        }
        { published ?
          <div className="row center-md center-xs" style={{ marginTop: 15 }}>
            <p> Your story has been posted successfully. :) </p>
          </div>
          : null
        }

        <div className="row center-md center-xs" style={{ marginTop: 18 }}>
          <Col xs={8} md={3} className="info-container-col">
            <RaisedButton className="raised-btn" label="Submit" primary={true} type="submit" style={{ margin: 6 }}/>
          </Col>
        </div>
      </form>
    );
  }

  submitForm(val) {
    this.props.uploadContent(val.storyTitle, this.props.storyDetails.content, this.props.user.id);
  }

  handleEditorChange(e) {
    this.props.saveContent(e.target.getContent());
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'StoryForm'
})(StoryForm);
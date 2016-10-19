import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

import { Row, Col } from 'react-flexbox-grid';
import { EditableField } from '../EditableField';

class StoryForm extends React.Component {
  submitForm(val) {
    this.props.uploadContent(this.props.storyDetails.content, this.props.user.userId);
  }

  handleEditorChange(e) {
    this.props.saveContent(e.target.getContent());
  }

  render() {
    const {  storyDetails, handleSubmit, submitting } = this.props;
    
    return (
      <form onSubmit={ handleSubmit((values) => {
        this.submitForm(values)
      }) }>
        <EditableField 
          name="story" 
          content={ storyDetails.content }
          onBlur={this.handleEditorChange.bind(this)}
        />

        { storyDetails.uploading ?
          <div className="row center-md center-xs" style={{marginTop: "15px"}}>
            <p> Posting your story ... </p>
          </div>
          : null
        }
        { storyDetails.error ?
          <div className="row center-md center-xs" style={{marginTop: "15px"}}>
            <p> An error has occurred. </p>
          </div>
          : null
        }
        { storyDetails.published ?
          <div className="row center-md center-xs" style={{marginTop: "15px"}}>
            <p> Your story has been posted successfully. :) </p>
          </div>
          : null
        }

        <div className="row center-md center-xs" style={{marginTop: "18px"}}>
          <Col xs={8} md={3} className="info-container-col">
            <RaisedButton className="raised-btn" label="Submit" primary={true} type="submit" style={{ margin: 6 }}/>
          </Col>
          <Col xs={8} md={3} className="info-container-col">
            <RaisedButton className="raised-btn" label="Cancel" primary={true} type="cancel" style={{ margin: 6 }}/>
          </Col>
        </div>
      </form>
    );
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'StoryForm'
})(StoryForm);
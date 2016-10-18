import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

import { Row, Col } from 'react-flexbox-grid';
import { EditableField } from '../EditableField';

class JournalForm extends React.Component {
  submitForm(val) {
    this.props.uploadContent(this.props.journalDetails.content, this.props.user.userId);
  }

  handleEditorChange(e) {
    this.props.saveContent(e.target.getContent());
  }

  render() {
    const {  journalDetails, handleSubmit, submitting } = this.props;
    
    return (
      <form onSubmit={ handleSubmit((values) => {
        this.submitForm(values)
      }) }>
        <EditableField 
          name="journal" 
          content={ journalDetails.content }
          onBlur={this.handleEditorChange.bind(this)}
        />

        { journalDetails.uploading ?
          <div className="row center-md center-xs" style={{marginTop: "15px"}}>
            <p> Posting your journal ... </p>
          </div>
          : null
        }
        { journalDetails.error ?
          <div className="row center-md center-xs" style={{marginTop: "15px"}}>
            <p> An error has occurred. </p>
          </div>
          : null
        }
        { journalDetails.published ?
          <div className="row center-md center-xs" style={{marginTop: "15px"}}>
            <p> Your journal has been posted successfully. :) </p>
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
  form: 'JournalForm'
})(JournalForm);

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

import { Row, Col } from 'react-flexbox-grid';
import { EditableField } from '../EditableField';

class JournalForm extends React.Component {
  submitForm(val) {
    console.log(this.props.journalContent);
  }

  handleEditorChange(e) {
    this.props.saveContent(e.target.getContent());
  }

  render() {
    const {  journalContent, handleSubmit, submitting } = this.props;
    
    return (
      <form onSubmit={ handleSubmit((values) => {
        this.submitForm(values)
      }) }>
        <EditableField 
          name="journal" 
          journalContent={ journalContent }
          onBlur={this.handleEditorChange.bind(this)}
        />

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

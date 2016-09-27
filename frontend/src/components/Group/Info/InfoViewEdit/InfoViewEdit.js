import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import { GridList, GridTile } from 'material-ui/GridList';
import MarkdownTextField from './MarkdownTextField';
import ImageUploadField from './ImageUploadField';

import * as Colors from 'material-ui/styles/colors';

const validate = values => {
  const errors = {};
  const requiredFields = [ 'markdown' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
  });
  return errors;
};

const submitForm = (self, about, aboutId, sectionId, callback) => (values) => {
  let method;

  const params = {
    userToken: Meteor.userToken(),
    userId: Meteor.userId(),
    sectionId,
    imageId: values.imageId || self.props.item.imageId,
    content: values.markdown || self.props.item.content,
  };

  if (about == 'country') {
    method = 'CountryInfoItem.pushRevision';
    params.countryCode = aboutId;
  } else if (about == 'university') {
    method = 'UniversityInfoItem.pushRevision';
    params.universityId = aboutId;
  } else {
    return;
  }

  Meteor.call(method, params, (err, result) => {
    if (err)
      console.error(`Error in invoking ${method}: ` + err);
    else if (callback)
      callback();
  });
};

class InfoViewEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
      loading: false,
      tile: null,
      title: ""
    };
  }

  handleUpload(input) {
    const self = this;
    return e => {
      const files = e.currentTarget.files;
      let tile = {};
      tile.files = files;
      this.setState({ loadingFile: true });

      // upload files to root cloudinary folder
      Cloudinary.upload(files, {}, function(err, res) {
        tile.res = res;
        self.setState({ tile: tile });
        self.setState({ loadingFile: false });
        input.onChange(tile.res.public_id);
      });
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, about, aboutId, sectionId, groupId, item } = this.props;

    const backUrl = `/group/${groupId}/info/${about}/${sectionId}`;

    const onSubmit = () => {
      this.props.actions.showSnackbar("Your edit has been saved.");
      browserHistory.push(backUrl);
    };

    const submitHandler = handleSubmit(submitForm(this, about, aboutId, sectionId, onSubmit));

    return (
        <Paper className="info-text-container" zDepth={2}>
        <form onSubmit={ submitHandler }>
          <Field name="imageId" component={ImageUploadField} tile={this.state.tile} handler={this.handleUpload.bind(this)} item={item}/>

          { this.state.loadingFile && <LinearProgress mode="indeterminate" id="LinearProgressEdit"/> }

          <Col xs={12}>
            <Field name="markdown" component={ MarkdownTextField } markdown={ item.content } />
          </Col>
          <div className="row center-md center-xs" style={{marginTop: "18px"}}>
            <Col xs={8} md={3} className="info-container-col">
              <RaisedButton className="raised-btn" fullWidth={true} label="Submit" primary={true} disabled={ pristine || submitting } type="submit" />
            </Col>
            <Col xs={8} md={3} className="info-container-col">
              <RaisedButton className="raised-btn" fullWidth={true} label="Cancel" primary={true} onTouchTap={ () => browserHistory.push(backUrl) } />
            </Col>
          </div>
        </form>

      </Paper>
    )
  }
}
export default reduxForm({
  form: 'InfoEditForm',
  // validate
})(InfoViewEdit);

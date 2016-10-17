import React, { Component } from 'react';
import request from 'superagent';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';
import * as Icons from '../../util/icons'
import { CloudinaryImage } from 'react-cloudinary';

const inputStyle = { cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, zIndex: 1, };

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };
    this.onImageDrop = this.onImageDrop.bind(this);
  }

  onImageDrop(e) {
    const files = e.currentTarget.files;
    this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    this.setState({uploading: true});
    let upload = request.post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
                   .field('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
                   .field('file', file);

    upload.end((err, response) => {
      if (err) { console.error(err) }
      if (response.body.secure_url !== '') {
        this.props.input.onChange(response.body.public_id);
        this.setState({ uploading: false });
      }
    });
  }

  render() {
    const {uploading, uploadedFile} = this.state;
    const { input : { value } } = this.props;
    return (
      <div>
        <FlatButton primary={true} className="upload-img-btn" icon={Icons.materialIcon('add_a_photo')} label="upload Image">
          <input onChange={this.onImageDrop} type="file" accept="image/*" style={inputStyle} />
        </FlatButton>
          { uploading && <LinearProgress mode="indeterminate" />}
        <CloudinaryImage className="drop-image" publicId={value} options={{ height: 300, crop: 'scale' }} />
      </div>

    )
  }
}

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import * as InfoHelper from '../../../../../util/info';
import * as Colors from 'material-ui/styles/colors';

const Overlay = ({ item }) => (
  <CardTitle
    className="info-title"
    title={ item.section.label }
    subtitle="Help ExchangeBuddy by contributing to the information below!"
    style={{ zIndex: 10 }}
    titleStyle={{ lineHeight: "3rem", fontWeight: 400, fontSize:"250%", color: Colors.grey50 }}
    subtitleStyle={{ color: Colors.grey200, fontSize: "16px" }} />
);

const ImageUploadField = ({ input, tile, handler, item }) => (
  <CardMedia className="info-title-container" mediaStyle={{ minHeight: 100, maxHeight: 500, overflow:"hidden" }} overlay={ <Overlay item={item}/> }>
    <input type="file" accept="image/*" onChange={ e => handler(input)(e) }
      style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, zIndex: 1, }}
    />

    <img src={ tile ? tile.res.secure_url : InfoHelper.getImageUrl(item, 500) } />
    <div id="info-edit-img">
      <div id="info-edit-img-overlay">
        <span>+</span>
        <p>ADD A PICTURE</p>
      </div>
    </div>
  </CardMedia>
)

export default ImageUploadField;

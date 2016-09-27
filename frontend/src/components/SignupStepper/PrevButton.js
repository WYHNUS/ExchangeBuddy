import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const PrevButton = (props) => (
  <FlatButton
    label="Back"
    disableTouchRipple={true}
    disableFocusRipple={true}
    onTouchTap={this.handlePrev}
    style={{ margin: 6 }}
    {...props} />
);

export default PrevButton;

import React from 'react';

import './IconRow.scss';

const IconRow = ({ icon, className, label, labelStyle, ...rest }) => (
  <div className={`iconrow ${ className || '' }`} { ...rest }>
    <div className="iconrow-icon">
      { icon }
    </div>
    <div className="iconrow-label" style={ labelStyle }>
      { label }
    </div>
  </div>
);

IconRow.propTypes = {
  icon: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  labelStyle: React.PropTypes.object,
};

export default IconRow;

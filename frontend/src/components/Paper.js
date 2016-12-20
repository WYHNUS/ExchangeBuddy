import React from 'react';
import cn from 'classnames';

const Paper = ({ className, transparent=false, full=false, ...rest }) => (
  <div className={ cn('flatpaper', { full, transparent }, className) } { ...rest } />
);

Paper.propTypes = {
  className: React.PropTypes.string,
  full: React.PropTypes.bool,
  transparent: React.PropTypes.bool,
};

export const PaperRow = ({ className, ...rest }) => (
  <div className="row">
    <div className={ cn('col', className) }>
      <Paper { ...rest } />
    </div>
  </div>
);

PaperRow.propTypes = {
  className: React.PropTypes.string,
};

export default Paper;

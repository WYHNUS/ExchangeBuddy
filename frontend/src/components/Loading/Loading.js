import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import './Loading.scss';

const Loading = (props) => {
  let { containerClassName, containerStyle } = props;

  if (!containerClassName)
    containerClassName = 'loading-container';

  return (
    <div className={ containerClassName } style={ containerStyle }>
      <CircularProgress />
    </div>
  );
};

Loading.propTypes = {
  containerClassName: React.PropTypes.string,
  containerStyle: React.PropTypes.object,
};

export default Loading;

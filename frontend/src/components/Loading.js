import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

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

export default Loading;

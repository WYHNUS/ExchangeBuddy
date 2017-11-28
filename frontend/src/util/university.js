import React from 'react';
import Avatar from 'material-ui/Avatar';
import Icon from 'components/Icon';

export const getUniAvatar = (uni, size=40) => {
  if (!uni)
    return <Avatar><Icon name="fa fa-graduation-cap" /></Avatar>;
  
  return <Avatar src={ uni.logoImageUrl } backgroundColor="#ffffff" size={ size } />
};
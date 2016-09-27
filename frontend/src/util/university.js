import React from 'react';
import Avatar from 'material-ui/Avatar';

import * as ImagesHelper from './images';

const getMediumImage = (url) => {
  if (!url || url.indexOf('topuniversities.com') < 0)
    return url;

  return url.replace("_small", "_medium");
};

export const getImageUrl = (uni, size=90) => {
  if (!uni)
    return "";

  if (uni.logoImageId)
    return ImagesHelper.getUrlScale(uni.logoImageId, 90);
  else
    return "";
};

export const getImage = (uni, size=90, style={}) => (
  <Avatar src={ getImageUrl(uni, size) } size={ size } style={{ objectFit: 'contain', backgroundColor: '#fff', ...style }} />
);

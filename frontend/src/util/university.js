import React from 'react';
import Avatar from 'material-ui/Avatar';

import * as ImagesHelper from './images';
import * as IconsHelper from './icons';

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

export const getImage = (uni, size=90, style={}) => {
  const imageUrl = getImageUrl(uni, size);
  if(imageUrl===""){
    <Avatar backgroundColor={ "#616161" } icon={ IconsHelper.materialIcon("account_balance") } />
  }else{
    <Avatar src={ imageUrl } size={ size } style={{ objectFit: 'contain', backgroundColor: '#fff', ...style }} />
  }
  
};

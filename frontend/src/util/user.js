import React from 'react';
import { propExistsDeep } from './helper';
import Avatar from 'material-ui/Avatar';

import * as Colors from 'material-ui/styles/colors';
import * as IconsHelper from './icons';
import userImg from '../res/user.png'

export const resolveGender = (gender) => {
  gender = gender.toLowerCase();

  if (gender === 'male')
    return 'male';
  else if (gender === 'female')
    return 'female';
  else
    return 'others';
}

export const getAvatarUrl = (user, size=64) => {

  //console.log(user);

  if (!user)
    return "";

  const profilePictureUrl = user.profilePictureUrl;
  const fbUserId = user.fbUserId;

  // Using native Cloudinary
  if (profilePictureUrl)
    return profilePictureUrl;
  // Using Facebook Graph
  else if (fbUserId)
    return `https://graph.facebook.com/${fbUserId}/picture/?width=${size*2}&height=${size*2}`;
  else
    return null;
};

export const getAvatar = (user, size=64, style) => {
  const avatarUrl = getAvatarUrl(user, size);

  if (avatarUrl)
    return <Avatar src={ avatarUrl } size={size} style={style} />;
  else
    //return <Avatar backgroundColor={ Colors.grey700 } icon={ IconsHelper.materialIcon("person") } />;
    return <Avatar src={ userImg } size={size} style={style} />;
};
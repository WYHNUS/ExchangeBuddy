import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import Avatar from 'material-ui/Avatar';
import AvatarWithBadges from 'components/AvatarWithBadges';
import Icon from 'components/Icon';

export const getAvatarUrl = (user, size=64) => {
  if (!user)
    return '';

  const profilePictureUrl = user.profilePictureUrl;
  const fbUserId = user.fbUserId;

  // Using Facebook Graph
  if (fbUserId)
    return `https://graph.facebook.com/${fbUserId}/picture/?width=${size*2}&height=${size*2}`;
  // Using default profile picture URL
  else if (profilePictureUrl)
    return profilePictureUrl;
  else 
    return null;
};

export const getAvatar = (user, size=64, style) => {
  const avatarUrl = getAvatarUrl(user, size);

  if (avatarUrl)
    return <Avatar src={ avatarUrl } size={size} style={style} />;
  else
    return <Avatar icon={ <Icon name="person" /> } size={size} style={style} />;
};

export const getBadgedAvatar = (user, country, university, size=64, style) => (
  <AvatarWithBadges 
    topBadge={ university && university.logoImageUrl && <Avatar src={ university.logoImageUrl } size={20} /> } 
    avatar={ getAvatar(user, size, style) } />
);

export const isUserAdmin = (user) => user && user.role && user.role >= 8;

export const logoutUser = (cb) => {
  cookie.remove('authToken');
  browserHistory.push('/');
  cb && cb();
};
import React from 'react';

import Avatar from 'material-ui/Avatar';
import AvatarWithBadges from 'components/AvatarWithBadges';
import Icon from 'components/Icon';

import { getUniAvatar } from 'util/university';

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
    topBadge={ university && university.logoImageUrl && getUniAvatar(university, 20) } 
    avatar={ getAvatar(user, size, style) } />
);

export const isUserAdmin = (user) => user && user.role && user.role >= 8;

export const getFirstWord = (user) => user && user.name && user.name.split(' ')[0];
import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as IconsHelper from '../../../../util/icons';

const querystring = require('querystring');

const makeOpenShareDialog = group => event => {
  const appId = Meteor.settings.public.Facebook.appId;
  const description = `I'll be going on exchange to ${group.university.name} in ${group.term} ${group.year}! Check out the group and join me on ExchangeBuddy if you are going as well!`;
  const title = `ExchangeBuddy: Find your exchange buddies!`;
  const link = Meteor.absoluteUrl(`/group/${group.id}`);

  const qs = querystring.stringify({
    app_id: appId,
    link,
    description,
    title,
  });

  const href = `https://www.facebook.com/dialog/feed?${qs}`;
  window.open(href, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=320')
};

const FacebookShare = ({ group }) => (
  <RaisedButton label="Share Group" className="raised-btn" primary={true} icon={IconsHelper.icon('fa fa-facebook-f', {color: "#FFFFFF"})} onTouchTap={ makeOpenShareDialog(group) }/>
);

export default FacebookShare;

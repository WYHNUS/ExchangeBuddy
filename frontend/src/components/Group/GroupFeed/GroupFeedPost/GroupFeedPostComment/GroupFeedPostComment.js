import React from 'react';
import Paper from 'components/Paper';

import { groupPropType, userPropType } from 'util/propTypes';

const GroupFeedPostComment = ({group}) => (
  <div className="row">
    <div className="col-xs-12">
      <paper>
        This is a Comment.
      </paper>
    </div>
  </div>
);

GroupFeedPostComment.propTypes = {
  group: groupPropType.isRequired,
  user: userPropType,
};

export default GroupFeedPostComment;
  
import React from 'react';

import GroupHeader from 'components/Group/GroupHeader';
import GroupFeed from 'components/Group/GroupFeed';
import GroupMembers from 'components/Group/GroupMembers';

import { groupPropType } from 'util/propTypes';

const GroupHome = ({ group }) => (
  <div className="group-home container">
    <div className="row">
      <div className="col-xs-12 col-sm-4">
        <div className="row">
          <div className="col-xs">
            <GroupHeader group={ group } />
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            <GroupMembers group={ group } />
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-8">
        <GroupFeed group={ group } />
      </div>
    </div>
  </div>
);

GroupHome.propTypes = {
  group: groupPropType.isRequired,
};

export default GroupHome;
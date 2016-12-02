import React, {PropTypes} from 'react';

import * as GroupHelper from '../../../../util/group';

export default class GroupIndicator extends React.Component {

  render(){

    const { homeGroupDetails } = this.props.homeGroupDetails;
    const {userObject} = this.props;

    var userPartOfGroup = GroupHelper.isUserPartOfGroup(userObject.id,homeGroupDetails.user);

    return(
      <div>
        
        <div className="row middle-xs">
          {
            (!userPartOfGroup)?
            (
              <div className="col-xs-12">
              <h2>These students are in this group</h2>
              </div>
            ):
            (
              <div className="col-xs-12">
              <h2>These students are in the same group as you.</h2>
              <h3>Find friends, start chatting, or organize events!</h3>
              </div>
            )
          }
        </div>

      </div>
    );
  }
}

GroupIndicator.propTypes = {
  userObject: PropTypes.object.isRequired,
  homeGroupDetails: PropTypes.object.isRequired
};
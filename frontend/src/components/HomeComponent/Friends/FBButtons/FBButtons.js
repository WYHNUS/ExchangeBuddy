import React, {PropTypes} from 'react';

import * as GroupHelper from 'util/group';

export default class FBButtons extends React.Component {

  render(){

    const { homeGroupDetails } = this.props.homeGroupDetails;
    const {userObject} = this.props;

    var userPartOfGroup = GroupHelper.isUserPartOfGroup(userObject.id,homeGroupDetails.user);

    return(
      <div>
        
        <div className="row middle-xs">
          {
            (userPartOfGroup)?
            (
              <div className="col-xs-12">
              </div>
            ):
            (
              <div className="col-xs-12">
              </div>
            )
          }
        </div>

      </div>
    );
  }
}

FBButtons.propTypes = {
  userObject: PropTypes.object.isRequired,
  homeGroupDetails: PropTypes.object.isRequired
};
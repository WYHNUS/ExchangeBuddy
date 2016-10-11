import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loading from '../../../Loading';
import * as UniversityHelper from '../../../../util/university';
import IconButton from 'material-ui/IconButton';
import * as Colors from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import imageUrl from '../../../../res/kth.svg';
import { browserHistory } from 'react-router';

const handleClose=()=>{

}

const GroupItem = ({ group, heading, handleClose }) => {
  const goToGroup = () => { browserHistory.push(`/home/${group.id}`); handleClose(false); };

  return (
    <div className="group-body">
      <h5 className="group-heading">{heading}</h5>
      <ListItem
      primaryText={group.name}
      leftAvatar={<Avatar src={ imageUrl } size={ 40 } style={{ objectFit: 'contain', backgroundColor: '#fff'}}/>}
      onTouchTap={goToGroup}
      />
    </div>
  );
};



const Group = ({ group, currentUser, handleClose }) => {
  const { groupType } = group;
//onTouchTap={/* this.openPopover.bind(this) */} 
    const bSize = 60;
    const cSize = 60;
    var uni = "";

  return (
    <div>
      <div className="group-row">
        {
          groupType === 0 ? <GroupItem group={group} handleClose={handleClose} heading={"Your Exchange University Group"} />
        : groupType === 1 ? <GroupItem group={group} handleClose={handleClose} heading={"Your Home University Group"}/>
        : groupType === 2 ? <GroupItem group={group} handleClose={handleClose} heading={"Your Home University Alumni Support Group"}/>
        : groupType === 3 ? <GroupItem group={group} handleClose={handleClose} heading={"Your Special Group"}/>
        : null
        }
      </div>
    </div>
  )
};

/*<IconButton id="header-logo" style={{ width: bSize, height: bSize, padding: 0 }}>
          { UniversityHelper.getImage(uni, bSize) }
        </IconButton>*/


export default class GroupList extends React.Component {

	render() {
		const {groups, user, toggleHomeSearchDrawerVisibility} = this.props;
		return(
			<List className="groups-container">
			{ groups.length > 0 && groups.map((group, idx) => 
        <Group group={ group } currentUser={ user } key={ idx } handleClose={toggleHomeSearchDrawerVisibility} />) }
			</List>
			);
	}
}

GroupList.PropTypes={
	user: PropTypes.object.isRequired,
	groups: PropTypes.object.isRequired,
  toggleHomeSearchDrawerVisibility: PropTypes.func.isRequired
}
import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loading from '../../../Loading';
import * as UniversityHelper from '../../../../util/university';
import * as Colors from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import imageUrl from '../../../../res/kth.svg';
import { browserHistory } from 'react-router';


class GroupItem extends React.Component {
  render(){
    const {group, heading, toggleHomeTab, 
      toggleSelectedHomeGroup, toggleHomeSearchDrawerVisibility,
      homeGroupDetails, key} = this.props;
      const {selected} = this.props.homeGroups;

      const goToGroup = () => { 
        browserHistory.push(`/home/${group.id}`); 
        toggleSelectedHomeGroup(key);
        toggleHomeTab('events');
        toggleHomeSearchDrawerVisibility(false); 
      };
      return (
        <div className="group-body">
        <h5 className="group-heading">{heading}</h5>  
        <ListItem
        className={parseInt(key)===parseInt(selected)?'selected-group':null}
        primaryText={group.name}
        leftAvatar={<Avatar src={ imageUrl } size={ 40 } style={{ objectFit: 'contain', backgroundColor: '#fff'}}/>}
        onTouchTap={goToGroup}
        />
        </div>
        );
    }
  }

  class Group extends React.Component {
    render(){
      const { groupType } = this.props.group;
      const bSize = 60;
      const cSize = 60; 
      var uni = "";
      return (
        <div>
        <div className="group-row">
        {
          groupType === 0 ? <GroupItem {...this.props} heading={"Your Exchange University Group"} />
          : groupType === 1 ? <GroupItem {...this.props} heading={"Your Home University Group"}/>
          : groupType === 2 ? <GroupItem {...this.props} heading={"Your Home University Alumni Support Group"}/>
          : groupType === 3 ? <GroupItem {...this.props} heading={"Your Special Group"}/>
          : null
        }
        </div>
        </div>
        );
    }
  }


  export default class GroupList extends React.Component {

   render() {
    const {groups, user, toggleHomeSearchDrawerVisibility, toggleSelectedHomeGroup} = this.props;
    return(
      <div>
      <List className="groups-container">
      { groups.length > 0 && groups.map((group, idx) => 
        <Group group={group} {...this.props} key={idx}/>
        /*<Group group={ group } currentUser={ user } key={ idx } 
        handleClose={toggleHomeSearchDrawerVisibility} toggleSelectedHomeGroup={toggleSelectedHomeGroup} />*/) }
      </List>
      </div>
      );
  }
}

GroupList.PropTypes={
 user: PropTypes.object.isRequired,
 groups: PropTypes.object.isRequired,
 homeGroups: PropTypes.object.isRequired,
 toggleHomeSearchDrawerVisibility: PropTypes.func.isRequired,
 toggleSelectedHomeGroup: PropTypes.func.isRequired,
 toggleHomeTab: PropTypes.func.isRequired,
 homeGroupDetails: PropTypes.object.isRequired
}
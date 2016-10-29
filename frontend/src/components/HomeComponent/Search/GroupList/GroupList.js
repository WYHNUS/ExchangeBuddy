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
      homeGroupDetails, key, index, fetchNewGroup} = this.props;
      const {selected} = this.props.homeGroups;

      const goToGroup = () => { 
        browserHistory.push(`/home/${group.id}`);
        fetchNewGroup(group.id); 
        toggleSelectedHomeGroup(index);
        toggleHomeTab('friends');
        toggleHomeSearchDrawerVisibility(false); 
      };
      return (
        <div className="group-body">
          <h5 className="group-heading">{heading}</h5>  
          <ListItem
          className={parseInt(index)===parseInt(selected)?'selected-group':null}
          primaryText={group.name}
          onTouchTap={goToGroup}
          />
          {/*
          leftAvatar={<Avatar src={ imageUrl } size={ 40 } style={{ objectFit: 'contain', backgroundColor: '#fff'}}/>}*/}
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
          groupType === 0 ? <GroupItem {...this.props} heading={"My Exchange University Group"} />
          : groupType === 1 ? <GroupItem {...this.props} heading={"My Home University Group"}/>
          : groupType === 2 ? <GroupItem {...this.props} heading={"My Home University Alumni Support Group"}/>
          : groupType === 3 ? <GroupItem {...this.props} heading={"My Special Group"}/>
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
    var index =0;
    return(
      <div>
      <List className="groups-container">
      { groups.length > 0 && groups.map((group, idx) => 
        <Group group={group} {...this.props} key={idx} index={index++}/>
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
 homeGroupDetails: PropTypes.object.isRequired,
 fetchNewGroup: PropTypes.func.isRequired
}
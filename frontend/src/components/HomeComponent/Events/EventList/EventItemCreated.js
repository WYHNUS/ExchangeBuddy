import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import truncate from 'truncate';
import cookie from 'react-cookie';

var moment = require('moment');
import GoogleMap from 'google-map-react';
import eventimg from '../../../../res/event-img.jpg';
import * as Icons from '../../../../util/icons';
import { Link, browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {MemberTile} from '../../Friends/MemberList/MemberList'

import request from 'superagent';
import { bearer } from '../../../../util/bearer';
import { ROOT_URL } from '../../../../util/backend';
import { fetchAllUniversities } from '../../../../actions/utilityInfo';
import * as UniversityHelper from '../../../../util/university';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

const styles = {
  customWidth: {
    width: 150,
  },
};

const paperStyle = {
  width: 100,
  textAlign: 'center',
  display: 'inline-block',
};


class EventItemCreated extends React.Component{
  state = {
    open: false,
    value:1,
    peopleList:[],
    peopleListLoaded:false,
    userIsGoing:false,
    isDialogOpen:false
  };

  //fetch and render list of people to display here
  componentWillMount() {
    //console.log('event class mounted', universities);
    const{fetchAllUniversitiesSuccess, groupEvent, fetchAllUniversitiesFailure, universities, showSnackbar}=this.props;
    if(universities.length<2){
      fetchAllUniversities().payload.then((response) => {
        if (!response.error) {
          fetchAllUniversitiesSuccess(response.data);
          var finalArray = UniversityHelper.insertUniversitiesIntoList(groupEvent.going,response.data);
          this.setState({
            peopleList:finalArray,
            peopleListLoaded:true
          });
        } else {
          fetchAllUniversitiesFailure(response.error);
          //showSnackbar(response.error);
          this.setState({
            peopleListLoaded:false
          });
        }
      })
    }else{
      var finalArray = UniversityHelper.insertUniversitiesIntoList(groupEvent.going,universities);
      this.setState({
        peopleListLoaded: true,
        peopleList:finalArray
      });
    }
    this.detectIfUserGoing();
  }

  render() {
    const actions = [
      <FlatButton label="Back" primary keyboardFocused onTouchTap={this.handleClose} />
    ];

    const deleteActions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.closeDeleteDialog} />,
      <FlatButton label="Delete" primary={true} onTouchTap={this.closeDeleteDialogDelete} />,
    ];

    const {
      groupEvent,homeGroupDetails, showSnackbar, user, 
      goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate, universities
    } = this.props;
    
    const cardText = truncate(groupEvent.detail, 300);
    
    return (
      <div className="row center-xs">

      <Dialog actions={deleteActions} modal={false} open={this.state.isDialogOpen} 
        onRequestClose={this.closeDeleteDialog}>
            Are you sure you want to delete your event?
          </Dialog>

      <Dialog
      title={`${groupEvent.going.length} going for ${groupEvent.title}`}
      actions={actions}
      modal={false}
      open={this.state.open}
      onRequestClose={this.handleClose}
      autoScrollBodyContent={true}
      >
      {
        this.state.peopleListLoaded? 
        (this.state.peopleList.map((user, idx) => <MemberTile key={ idx } user={ user } />)):
        (<h2>Error loading list of people going...</h2>)
      }
      </Dialog>

      <Card className="event-item-card col-xs-11 col-md-11" initiallyExpanded={true}>
        <CardTitle
        className="event-item-card-title" 
        title={ groupEvent.title }
        showExpandableButton={true}
        actAsExpander={true}
        subtitle={  <Link id="link-title" to={`/profile/${groupEvent.User.id}`}>
        {`by ${groupEvent.User.name}`}</Link>} />
        <CardText>
          <div className="col-xs-12 event-item-info">
            {Icons.icon('watch_later')}<span>&nbsp; {
            `${moment(groupEvent.startTime).format('D MMM, ddd, hA')} to 
            ${moment(groupEvent.endTime).format('D MMM, ddd, hA')}`}</span>
          </div>
          <div className="col-xs-12 event-item-info">
            {Icons.icon('place')}<span>&nbsp; 
            <a href={`http://maps.google.com/maps?q=loc:${groupEvent.lat},${groupEvent.lng}`}>
              <span style={{marginLeft: 3 ,fontWeight:'bold',color:'darkgrey',textDecoration:'underline'}}>
              {`${groupEvent.location}`}</span>
            </a></span>
          </div>
          <div className="col-xs-12 event-item-info">
            {Icons.icon('group')}<span>&nbsp; <span id="link" onClick={this.handleOpen}>
            {`${groupEvent.going.length} going`}</span></span>
          </div>
        </CardText>
        <CardText className="event-item-card-text" expandable={true}>
          { cardText }
        </CardText>
        <CardActions expandable={true}>
          <div className="row center-xs">
            <div className="col-xs-6 col-md-4">
              <Paper style={paperStyle} zDepth={1}>
                <Checkbox
                className="event-item-card-going-button"
                label="GOING"
                checked={this.state.userIsGoing}
                onTouchTap={()=>this.handleChangeGoing()}
                />
              </Paper>
            </div>
          </div>
          { 
            (parseInt(this.props.user.userObject.id)==parseInt(groupEvent.UserId))?
            (
            <div className="edit-delete-btn">
                {/*<IconButton tooltipPosition="bottom-center" tooltip="Edit" 
                onTouchTap={()=>goToEdit(props)}>
                  {Icons.icon('mode_edit')}
                </IconButton>*/}
                <IconButton tooltipPosition="bottom-center" tooltip="Delete" 
                onTouchTap={()=>this.openDeleteDialog()} >
                  {Icons.icon('delete')}
                </IconButton>
                </div>
                )
                :
                null
          }
        </CardActions>
      </Card>

      </div>
    );
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  closeDeleteDialog = () =>{
    this.setState({isDialogOpen:false});
  };

  openDeleteDialog = () =>{
    this.setState({isDialogOpen:true});
  };

  closeDeleteDialogDelete = () =>{
    this.setState({isDialogOpen:false});
    const {groupEvent, showSnackbar, deleteAnEventSuccessUpdate} = this.props;
    const req = request
      .delete(ROOT_URL + '/event')
      .send({ 
        EventId: groupEvent.id
      })
      .use(bearer)
      .end(function(err,res){
        //console.log(res);
        if (res.status === 401) {
          cookie.remove('authToken');
          this.props.clearUser();
          browserHistory.push('/');
            }
        if (!err && !res.error){
          showSnackbar('Deleted the event!');
          deleteAnEventSuccessUpdate(groupEvent.id);
        } else {
          showSnackbar('Error deleting the event...');
        }
      });
  }

  detectIfUserGoing() {
    const {user, groupEvent} = this.props;
    var isGoing = false;
    for (var i=0; i<groupEvent.going.length; i++) {
      if (groupEvent.going[i].id === user.userObject.id) {
        isGoing=true;
      }
    }
    this.setState({
      userIsGoing:isGoing
    })
  }

  goForAnEvent() {

    const {groupEvent,homeGroupDetails, showSnackbar, 
      goForAnEventSuccessUpdate, universities} = this.props;
    const {userObject} = this.props.user;
    const {peopleList} = this.state;

    const req = request
      .post(ROOT_URL + '/goToEvent')
      .send({ 
        EventId: groupEvent.id,
        UserId:userObject.id
      })
      .use(bearer)
      .end((err,res)=>{
        //console.log(res);
        if (res.status === 401) {
          cookie.remove('authToken');
          this.props.clearUser();
          // need to redirect to a new version of login page
          browserHistory.push('/');
            } 

        if (!err && !res.error && homeGroupDetails.id){
          var newUser = UniversityHelper.insertUniversitiesIntoUser(userObject,universities);
          showSnackbar('Registered for event');
          goForAnEventSuccessUpdate(groupEvent.id, newUser);
          
          var newPeopleList = peopleList.slice();
          newPeopleList.push(newUser);
          this.setState({
            peopleList:newPeopleList,
            userIsGoing:true
          });

        } else {
          showSnackbar('Error registering for event');
        }
      });
  }

  ungoForAnEvent() {

    const {groupEvent,homeGroupDetails, showSnackbar, ungoForAnEventSuccessUpdate} = this.props;
    const {userObject} = this.props.user;
    const {peopleList} = this.state;

    const req = request
      .post(ROOT_URL + '/unattend')
      .send({ 
        EventId: groupEvent.id,
        UserId: userObject.id
      })
      .use(bearer)
      .end((err,res)=>{
        //console.log(res);
        if (res.status === 401) {
          cookie.remove('authToken');
          this.props.clearUser();
          // need to redirect to a new version of login page
          browserHistory.push('/');
            } 

        if (!err && !res.error && homeGroupDetails.id){
          showSnackbar('Unregistered for event');
          ungoForAnEventSuccessUpdate(groupEvent.id, userObject);
          
          var newPeopleList = peopleList.slice();
          
          //remove object from list
          for(var i=0;i<newPeopleList.length;i++){

            if(parseInt(newPeopleList[i].id)===userObject.id){
              newPeopleList.splice(i, 1);
              break;
            }
          }
          this.setState({
            peopleList:newPeopleList,
            userIsGoing:false
          });

        } else {
          showSnackbar('Error unregistering for event');
        }
      });
  }

  handleChangeGoing() {
    if(this.state.userIsGoing){
      this.ungoForAnEvent();
    }
    else{
      this.goForAnEvent();
    }
  }
}

const goToEdit = props => {
  browserHistory.push('/edit/'+props.dropId);
  props.selectedDropSrc('profile');
  props.selectedDropIdx(props.idx);
};


EventItemCreated.propTypes = {
  groupEvent: PropTypes.object.isRequired,
  homeGroupDetails: PropTypes.object.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  goForAnEventSuccessUpdate: PropTypes.func.isRequired,
  ungoForAnEventSuccessUpdate: PropTypes.func.isRequired,
  fetchAllUniversitiesSuccess:PropTypes.func.isRequired,
  fetchAllUniversitiesFailure:PropTypes.func.isRequired,
  universities:PropTypes.array.isRequired
};

export default EventItemCreated;

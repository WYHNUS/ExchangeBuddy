import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';
import { clearUser } from 'actions/authActions';

import { showSnackbar } from 'actions/messageSnackbar';
import { pageVisibility } from 'actions/pageVisibility';
import { toggleHomeTab, fetchEvents, fetchEventsFailure, fetchEventsSuccess } from 'actions/home';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import * as IconsHelper from 'util/icons';
import * as GroupHelper from 'util/group';

import EventList from 'components/HomeComponent/Events/EventList';

import SelectField from 'material-ui/SelectField';

const items = [
  <MenuItem key={1} value={1} primaryText="Most Recent" />,
  <MenuItem key={2} value={2} primaryText="Most Stars" />,
  <MenuItem key={3} value={3} primaryText="Most Comments" />
];

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

	componentWillMount(){
    this.props.toggleHomeTab('events')
		//fetchHomeEvenets(groupId)
    //fetchFbEvents(123,[1231,12341]);
    //fetchMuEvents(university, country);
  }

  componentDidMount(){

    const{homeEvents} = this.props;
    const{loading} = this.props.homeGroupDetails;
    const{id} = this.props.homeGroupDetails.homeGroupDetails;
    
    if((id===null)||loading){
      browserHistory.push(`/home`);
    
    }else{

      if(parseInt(id)!=parseInt(homeEvents.id)){
        this.props.fetchEvents(id);
      }
    }
  }

  render() {

    const { homeGroupDetails } = this.props.homeGroupDetails;
    const {id} = this.props.homeGroupDetails.homeGroupDetails;
    const {user} = this.props;

    var userPartOfGroup = GroupHelper.isUserPartOfGroup(user.id,homeGroupDetails.user);    

    return(

     <div>
     
      {
          (userPartOfGroup)?
          (
            <div>
            <div className="row center-xs">
            <div className="col-xs event-item-button">
            <RaisedButton
            className="event-item-button-add"
            label="New Event"
            onTouchTap={ () => browserHistory.push(`/home/${id}/events/new`)}
            secondary={true}
            icon={IconsHelper.materialIcon('add')}/>
            </div>
            </div>
            <div className="row center-xs">
            <EventList source="Created"/>
            </div>
            </div>
          )
          :
          (
            <div className="row center-xs">
              <h2>Join the group to see and join events!</h2>
            </div>
          )
      }

     </div>

     );
  }

  handleChange = (event, index, value) => this.setState({value});
}

const mapStateToProps = (state )=>{
  return {
    homeGroupDetails: state.home.homeGroupDetails,
    user: state.user.userObject,
    homeEvents: state.home.homeEvents,
  };
}

const mapDispatchToProps = (dispatch) => {
 return {
    actions: bindActionCreators({ showSnackbar }, dispatch),

    toggleHomeTab:(tab)=>dispatch(toggleHomeTab(tab)),

    fetchEvents: (GroupId) => {
        dispatch(fetchEvents(GroupId)).payload.then((response) => {
          //console.log(response);
          if (!response.error) {
            dispatch(fetchEventsSuccess(response.body));
          } else {
            dispatch(fetchEventsFailure(response.error));
          }
        }, (err) => {
          if (err.status === 401) {
            cookie.remove('authToken');
            // dispatch(clearUser());
            // need to redirect to a new version of login page
            browserHistory.push('/');
          } else {
            dispatch(fetchEventsFailure(err.response.error.message));
          }
        });
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Events);
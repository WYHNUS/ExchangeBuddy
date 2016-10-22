import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from '../../actions/messageSnackbar';
import { pageVisibility } from '../../actions/pageVisibility';
import {toggleHomeTab} from '../../actions/home';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import * as IconsHelper from '../../util/icons' 

import EventList from '../../components/HomeComponent/Events/EventList';

import {
  fetchFbEvents, fetchFbEventsSuccess, 
  fetchFbEventsFailure, fetchMuEvents
} from '../../actions/home';

import SelectField from 'material-ui/SelectField';

var date=new Date();

const university = 
{
  lat:1.2966426,
  lng:103.7742052,
  city: 'Singapore',
  country: 'Singapore',
  countryCode: 'SGP'
};

const country = 
{
  capital: "Singapore"
}

const items = [
  <MenuItem key={1} value={1} primaryText="Most Recent" />,
  <MenuItem key={2} value={2} primaryText="Most Stars" />,
  <MenuItem key={3} value={3} primaryText="Most Comments" />
];



class Events extends React.Component{
	componentWillMount(){
    this.props.toggleHomeTab('events')
		//fetchHomeEvenets(groupId)
        //fetchFbEvents(123,[1231,12341]);
        //fetchMuEvents(university, country);
      }

      constructor(props) {
        super(props);
        this.state = {value: 1};
      }

      handleChange = (event, index, value) => this.setState({value});


      render(){
        const {id} = this.props.homeGroupDetails.homeGroupDetails;
        return(
         <div>
           {/*<SelectField
           value={this.state.value}
           onChange={this.handleChange}>
           {items}
         </SelectField>*/}
         <div className='row center-xs'>
         <div className='col-xs event-item-button'>
         <RaisedButton
         className="event-item-button-add"
         label='New Event'
         onTouchTap={ () => browserHistory.push(`/home/${id}/events/new`)}
         secondary={true}
         icon={IconsHelper.materialIcon("add")}/>
         </div>
         </div>

         <div className='row center-xs'>
         <EventList source="Created"/>

         </div>

         </div>
         );
      }
    }

    /*<EventList source="Created" groupId={ id } groupEvents={fbseed} />*/
    /*<EventList event={seed}*/
/*<Row>
           <Col xs={12} md={6}>
           <h3 className="event-title pinline"> <span>Facebook Events</span> </h3>
           {<EventList source="Facebook" groupId={ id } groupEvents={fbseed} />}
           </Col>
           <Col xs={12} md={6}>
           <h3 className="event-title pinline"> <span>Meetup Events</span> </h3>
           {<EventList source="Meetup" groupId={ id } groupEvents={meetupseed}/>}
           </Col>
           </Row>*/

           const mapStateToProps = (state )=>{
             return{
              homeGroupDetails: state.home.homeGroupDetails
            };
          }

          const mapDispatchToProps = (dispatch) => {
           return {
            actions: bindActionCreators({ showSnackbar }, dispatch),

            fetchFbEvents:(countryCode, uniLatLng)=>{
              dispatch(fetchFbEvents(countryCode, uniLatLng)).then((response) => {
                !response.error ? dispatch(fetchFbEventsSuccess(response.payload)) : 
                dispatch(fetchFbEventsFailure(response.payload));
              })},

              fetchMuEvents:(university, country)=>{
                dispatch(fetchMuEvents(university,country))
              },

              toggleHomeTab:(tab)=>dispatch(toggleHomeTab(tab))
            }
          }


          export default connect(mapStateToProps, mapDispatchToProps)(Events);
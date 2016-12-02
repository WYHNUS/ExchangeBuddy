import request from 'superagent';
import {bearer} from '../../util/bearer';
import {ROOT_URL} from '../../util/backend';

import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from 'react-spinkit';

import Link from '../Link';
import * as UserHelper from '../../util/user';
import * as UniversityHelper from '../../util/university';
import { fetchAllUniversities } from '../../actions/utilityInfo';
import{ fetchProfile } from '../../actions/profile';
import * as IconsHelper from '../../util/icons';

const text_header_style = {
  fontSize: '-webkit-xxx-large',
  fontWeight: 300,
};

function urlToUserid(userId) {
  let urlFmt = window.location.pathname.substring(1).toLowerCase();
  let urlArr = urlFmt.split('/');
  //that means user specified a profile id number
  //if not, return the user's default profile id number
  if (urlArr.length > 1) {
    if (urlArr[1] === 'me'){
      return userId;
    } else {
      return urlArr[1];  
    }
  } else {
    return userId;
  }
}

function editUniversities(userId, exchangeUniversityId, homeUniversityId, term, year){
  var profileObj = {
    userId:userId,
    exchangeUniversityId:exchangeUniversityId,
    homeUniversityId:homeUniversityId,
    term:term,
    year:year
  }
  const req = request
  .patch(ROOT_URL + '/updateUni/')
  .send(profileObj)
  .use(bearer);

  return req;
}

export default class ProfilePaper extends React.Component {

  state = {
    exchangeUniList:[],
    exchangeUniListLoaded:false
  };

  componentWillMount(){
    const 
    {
      fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure, universities, 
      showSnackbar, userObject, 
      fetchProfileSuccess, fetchProfileFailure, profile, fetchProfileGroups
    } = this.props;

    fetchProfileGroups(urlToUserid(userObject.id));

    fetchProfile(urlToUserid(userObject.id)).payload.then((userProfileRes)=>{
      //console.log(userProfileRes);

      if (!userProfileRes.error) {
        fetchProfileSuccess(userProfileRes.body);

        if (universities.length < 2) {
          fetchAllUniversities().payload.then((uniRes) => {
            //console.log(uniRes);

            if (!uniRes.error) {
              fetchAllUniversitiesSuccess(uniRes.data);
              var finalArray = UniversityHelper.insertUniversitiesIntoUniversityList(
                userProfileRes.body.Exchanges, uniRes.data
                );
              this.setState({
                exchangeUniList: finalArray,
                exchangeUniListLoaded: true
              });
            } else {
              fetchAllUniversitiesFailure(uniRes.error);
              this.setState({
                exchangeUniListLoaded: false
              });
            }
          });
        } else {
          var finalArray = UniversityHelper.insertUniversitiesIntoUniversityList(
            userProfileRes.body.Exchanges, universities
            );
          this.setState({
            exchangeUniList: finalArray,
            exchangeUniListLoaded: true
          });
        }
      } else {
        fetchProfileFailure(userProfileRes.error);
      }
    }, (err) => {
      if (err.status === 401) {
        cookie.remove('authToken');
        this.props.clearUser();
          // need to redirect to a new version of login page
          browserHistory.push('/');
        } else {
          fetchProfileFailure(err.response.error.message);
        }
      })
  }

  render() {
    const { profile, userObject, profileGroups } = this.props;

    return (
      <div>
      <div id="profile-buffer"></div>
      <div id="profile-paper">

      <div className="row">
      <div className="col-xs-12 profile-pic">
      {UserHelper.getAvatar(profile, 100)}
      </div>
      <div className="col-xs-12">
      <h1 style={ text_header_style }>{ profile.name }</h1>
      </div>
      </div>

      <div className="row center-xs">
      {
        profile.fbUserId?
        (
          <div className="col-xs-12 col-md-6 profile-fb">
          <a target="_window" href={`https://facebook.com/${profile.fbUserId}`}>Message on Facebook</a>
          </div>
          ):
        null
      }
      {
        profile.email?
        (
          <div className="col-xs-12 col-md-6 profile-fb">
          <a target="_blank" href={`mailto:${profile.email}`}>Message through Email</a>
          </div>
          ):
        null
      }
      </div>

      <div className="row center-xs">
      
      <div className="col-xs-12 col-md-6">
      <div className="university-details">
      <div className="university-header">Home University</div>
      { 
        this.props.profile.University?
        (profile.University.name):
        (<Spinner spinnerName="circle" />) 
      }
      </div>
      </div>

      <div className="col-xs-12 col-md-6">
      <div className="university-details">
      <div className="university-header">Exchange University</div>
      {
        this.state.exchangeUniListLoaded? 
        (this.state.exchangeUniList.map((uni, idx) => <div key={idx}>{uni.name}</div>)):
        (<Spinner spinnerName="circle" />)
      }
      </div>
      </div>

      

      <div className="col-xs-12 col-md-6">
      <div className="university-details">
      <div className="university-header">Groups</div>
      {
        (profileGroups.length>0)?
        (
          profileGroups.map((group,idx)=>
          <div id="profilegroup" key={idx} className="col-xs-12">
          {group.name}
          </div>)
        )
        :
        (<Spinner spinnerName="circle" />)
      }
      </div>
      </div>
      </div>

      {
        urlToUserid(userObject.id) === userObject.id
        ? <div className="row center-xs edit-profile-container">
            <div className="col-xs-10 col-md-4">
              <RaisedButton 
                primary 
                className="edit-profile-button"
                label="Edit Profile" 
                onTouchTap={(e)=>{e.preventDefault();browserHistory.push('/profile/me/edit')}}/>
            </div>
            <div className="col-xs-10 col-md-4">
              <RaisedButton 
                primary
                className="edit-profile-button"
                label="Edit Universities" 
                onTouchTap={(e)=>{e.preventDefault();browserHistory.push('/profile/me/editUni')}}/>
            </div>
          </div>
        : null
      }

      </div>
      </div>
      )
  }
}

ProfilePaper.propTypes = {
  fetchProfileSuccess: PropTypes.func.isRequired,
  fetchProfileFailure: PropTypes.func.isRequired,
  fetchAllUniversitiesSuccess: PropTypes.func.isRequired,
  fetchAllUniversitiesFailure: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired,
  universities: PropTypes.array.isRequired
};


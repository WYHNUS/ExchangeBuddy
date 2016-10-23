import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Link from '../Link';

import * as UserHelper from '../../util/user';
import * as UniversityHelper from '../../util/university';
import {fetchAllUniversities} from '../../actions/utilityInfo';
import{fetchProfile} from '../../actions/profile';

const text_header_style = {
  fontSize: "-webkit-xxx-large",
  fontWeight: 300,
};

function urlToUserid(userId) {
  let urlFmt = window.location.pathname.substring(1).toLowerCase();
  let urlArr = urlFmt.split('/');
  //that means user specified a profile id number
  //if not, return the user's default profile id number
  if(urlArr.length>1){
    return urlArr[1];
  }else{
    return userId;
  }
}

export default class ProfilePaper extends React.Component {

  state = {
    exchangeUniList:[],
    exchangeUniListLoaded:false
  };

  componentWillMount(){
    const{
      fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure, universities, 
      showSnackbar, userObject, 
      fetchProfileSuccess, fetchProfileFailure, profile}=this.props;

      fetchProfile(urlToUserid(userObject.id)).payload.then((userProfileRes)=>{
        if(!userProfileRes.error){
          fetchProfileSuccess(userProfileRes.body); 
          if(universities.length<2){
            fetchAllUniversities().payload.then((uniRes) => {
              if (!uniRes.error) {
                fetchAllUniversitiesSuccess(uniRes.data);
                var finalArray = UniversityHelper.insertUniversitiesIntoUniversityList(uniRes.data.Exchanges,response.data);
                this.setState({
                  exchangeUniList:finalArray,
                  exchangeUniListLoaded:true
                });
              } else {
                fetchAllUniversitiesFailure(uniRes.error);
                this.setState({
                  exchangeUniListLoaded:false
                });
              }
            })
          }else{
            var finalArray = UniversityHelper.insertUniversitiesIntoUniversityList(userProfileRes.body.Exchanges,universities);
            this.setState({
              exchangeUniListLoaded: true,
              exchangeUniList:finalArray
            });
          }
        }else{
          fetchProfileFailure(userProfileRes.error);
        }
      })
    }

    render() {
      const { profile } = this.props;

      return (
        <div className='row' id="profile-paper">
        <div className='col-xs-12 col-md-3' id="user-image">
        { UserHelper.getAvatar(profile, 300, { height: "auto", width: "100%" }) }
        </div>

        <div className='col-xs-12 col-md-7' id="user-info">
        <h1 style={ text_header_style }>{ profile.name }</h1>

        <div className="flex-table-container">

        <div className='row'>
        <div className='col-xs-12 col-md-4 table-header'>Home University</div>
        <div className='col-xs-12 col-md-8 table-cell'>
        { this.props.profile.University?
          (profile.University.name):
          (<div>Not loaded university name</div>) }
        </div>
        </div>

        <div className='row'>
        <div className='col-xs-12 col-md-4 table-header'>On exchange to</div>
        <div className='col-xs-12 col-md-8 table-cell'>
        {this.state.exchangeUniListLoaded? 
          (this.state.exchangeUniList.map((uni, idx) => uni.name)):
          (<h2>Error loading list of unis...</h2>)}
        { /*userExchangeUniversities.name*/ }
        </div>
        </div>

        <div className='row'>
        <div className='col-xs-12 col-md-4 table-header'>Facebook</div>
        <div className='col-xs-12 col-md-8 table-cell'>
        <Link to={ `https://facebook.com/${profile.fbUserId}` }>Facebook profile</Link>
        </div>
        </div>

        </div>
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

    /*userProfile: PropTypes.object.isRequired*/
  };


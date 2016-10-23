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
    const{fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure, universities, 
      showSnackbar,userObject, fetchProfileSuccess, fetchProfileFailure, profile}=this.props;
      fetchProfile(urlToUserid(userObject.id)).payload.then((response)=>{
        if(!response.error){
          fetchProfileSuccess(response.data); 
          if(universities.length<2){
            fetchAllUniversities().payload.then((response) => {
              if (!response.error) {
                fetchAllUniversitiesSuccess(response.data);
                var finalArray = UniversityHelper.insertUniversitiesIntoUniversityList(response.data.Exchanges,response.data);
                this.setState({
                  exchangeUniList:finalArray,
                  exchangeUniListLoaded:true
                });
              } else {
                fetchAllUniversitiesFailure(response.error);
                this.setState({
                  exchangeUniListLoaded:false
                });
              }
            })
          }else{
            var finalArray = UniversityHelper.insertUniversitiesIntoUniversityList(response.data.Exchanges,universities);
            this.setState({
              exchangeUniListLoaded: true,
              exchangeUniList:finalArray
            });
          }
        }else{
          fetchProfileFailure(response.error);
        }
      })
    }

    render() {
      const { profile} = this.props;

      return (
        <Grid>
        <Row id="profile-paper">
        <Col xs={12} md={3} id="user-image">
        { UserHelper.getAvatar(profile, 300, { height: "auto", width: "100%" }) }
        </Col>

        <Col xs={12} md={7} id="user-info">
        <h1 style={ text_header_style }>{ profile.name }</h1>

        <div className="flex-table-container">

        <Row>
        <Col xs={12} sm={4} className="table-header">Home University</Col>
        <Col xs={12} sm={8} className="table-cell">
        { this.props.profile.University?
          (profile.University.name):
          (<div>Not loaded university name</div>) }
        </Col>
        </Row>

        <Row>
        <Col xs={12} sm={4} className="table-header">On exchange to</Col>
        <Col xs={12} sm={8} className="table-cell">
        {this.state.exchangeUniListLoaded? 
          (this.state.exchangeUniList.map((uni, idx) => uni.name)):
          (<h2>Error loading list of unis...</h2>)}
        { /*userExchangeUniversities.name*/ }
        </Col>
        </Row>

        <Row>
        <Col xs={12} sm={4} className="table-header">Facebook</Col>
        <Col xs={12} sm={8} className="table-cell">
        <Link to={ `https://facebook.com/${profile.fbUserId}` }>Facebook profile</Link>
        </Col>
        </Row>

        </div>
        </Col>
        </Row>
        </Grid>
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


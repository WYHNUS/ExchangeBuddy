import React, {Component, PropTypes} from 'react';
import NewEventForm from '../../components/HomeComponent/NewEvent/NewEventForm';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NewEvent extends Component {

  componentWillMount(){
    /*if(!this.props.user) {
      this.props.passSnackbarMessage('Log in to add new message')
      browserHistory.push('/login');
    }*/
  }


  render() {
    return (
      <div className="row center-xs">
        <div className="col-xs-12">
          <NewEventForm
            {...this.props}
            />
        </div>
      </div>
    )
  }
}

//groupId={this.props.params.groupId} 

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const mapStateToProps = (state)=>{
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
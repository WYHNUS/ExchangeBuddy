import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility,
toggleTopBarSettingsButtonVisibility, toggleTopBarBackButtonVisibility } from 'actions/pageVisibility';
import ProfilePaper from 'components/ProfilePaper';

class Profile extends React.Component{

  componentDidMount() {
    
    if(!this.isBaseProfilePage()){
      this.props.toggleTopBarSettingsButtonVisibility(false);
      this.props.toggleTopBarBackButtonVisibility(true);
    }else{
      this.props.toggleTopBarSettingsButtonVisibility(true);
      this.props.toggleTopBarBackButtonVisibility(false);
    }

    this.props.toggleBottomBarVisibility(true);
    this.props.toggleTopBarVisibility(true);
    
  }
  componentWillUnmount(){
    this.props.toggleTopBarSettingsButtonVisibility(false);
    this.props.toggleTopBarBackButtonVisibility(false);
  }

  render() {
    return (
      <div>
        <ProfilePaper userId={ this.props.user.userId } />
      </div>
    );
  }

  isBaseProfilePage() {
      let urlFmt = window.location.pathname.substring(1).toLowerCase();
      let urlArr = urlFmt.split('/');
    
    if (urlArr.length > 1) {
      
      if(urlArr[1]==='me'){
        return true;
      }
    }

    else{
      return false;
    }
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
    toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
    toggleTopBarSettingsButtonVisibility: visibility=>dispatch(toggleTopBarSettingsButtonVisibility(visibility)),
    toggleTopBarBackButtonVisibility: visibility=>dispatch(toggleTopBarBackButtonVisibility(visibility))
  };
};

const mapStateToProps = (state )=>{
  return{
    user: state.user.userObject
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
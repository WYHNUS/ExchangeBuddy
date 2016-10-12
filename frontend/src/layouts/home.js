import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, 
  toggleHomeSearchDrawerOpenButtonVisibility,
  toggleTopBarBackButtonVisibility } from '../actions/pageVisibility';
import Header from '../components/Header';
//import SwitchGroupDialog from '../components/SwitchGroupDialog';

class Home extends React.Component{

  componentDidMount() {
    this.props.toggleBottomBarVisibility(true);
    this.props.toggleHomeSearchDrawerOpenButtonVisibility(true);
    this.props.toggleTopBarBackButtonVisibility(true);
    //console.log(this.props.params);
    //console.log(this.props.routes[1]);
  }

  componentWillUnmount(){
    this.props.toggleHomeSearchDrawerOpenButtonVisibility(false);
    this.props.toggleTopBarBackButtonVisibility(false);
  }

  render() {
    return (
      <div>
    {<Header params={ this.props.params } tab={ this.props.routes[2].path } />}
    <div id="group-container">
    { this.props.children }
    </div>

  {/*<SwitchGroupDialog />*/}
  </div>
  );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
    toggleHomeSearchDrawerOpenButtonVisibility:visibility=>dispatch
    (toggleHomeSearchDrawerOpenButtonVisibility(visibility)),
    toggleTopBarBackButtonVisibility:visibility=>dispatch
    (toggleTopBarBackButtonVisibility(visibility))
  };
};

export default connect(null, mapDispatchToProps)(Home);
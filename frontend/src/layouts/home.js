import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility } from '../actions/pageVisibility';
//import Header from '../components/Header';
//import SwitchGroupDialog from '../components/SwitchGroupDialog';
class Home extends React.Component{

  componentDidMount() {
    this.props.toggleBottomBarVisibility(true);
    console.log(this.props.routes);
  }

  render() {
    return (
      <div>
    {/*<Header params={ this.props.params } tab={ this.props.routes[2].path } />*/}
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
    toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility))
  };
};

export default connect(null, mapDispatchToProps)(Home);
import React from 'react';
//import Header from '../components/Header';
//import SwitchGroupDialog from '../components/SwitchGroupDialog';

const Home = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },

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
})

export default Home;
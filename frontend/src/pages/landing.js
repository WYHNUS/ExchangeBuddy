import React from 'react';
import { browserHistory } from 'react-router';

import request from 'superagent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleTopBarVisibility, toggleBottomBarVisibility } from 'actions/pageVisibility';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import * as IconsHelper from 'util/icons';

import landingBackgroundImage from 'res/ExchangeBuddySpread.jpg';
import landingHeaderLogo from 'res/ExchangeBuddySpreadIcon.png';

const landingImgStyle = {
  background: `url(${landingBackgroundImage}) no-repeat`,
  backgroundPosition: 'top center',
  backgroundSize: 'cover',
};

class Landing extends React.Component {
  componentDidMount() {
    this.props.toggleBottomBarVisibility(false);
    this.props.toggleTopBarVisibility(false);
  }

  render() {
    const { user } = this.props;
    return (
      <div id="landing-container">
      
        <div id="welcome-header-container">
          <div id="welcome-header" style={landingImgStyle}>

            <div className="row start-xs">
              <div className="col-xs welcome-icon-container">
                <img id="welcome-icon" src={landingHeaderLogo} alt="Icons" />
              </div>

              <FlatButton
                onClick={ () => browserHistory.push('/settings') }
                icon={ IconsHelper.materialIcon('menu') } />
            </div>

            <div id="welcome-main-container">
              <div id="welcome-header-title">
                <h2 id="app-title">Going for Student Exchange?</h2>
                <div id="app-sub title-container">
                  <p className="app-subtitle">Connect to our network of over 900 universities!</p>
                </div>
              </div>

              <RaisedButton
                primary
                label="Connect"
                onTouchTap={ () => browserHistory.push('/signup') }
                style={{ maxWidth: 250, margin: '0 auto', height: 50 }}
                labelStyle={{ fontSize: '16px', padding: '0 20px' }} />
            </div>
          </div>
        </div>

        <div id="cover-lists">
          <div id="feature-list">
            <div className="row center-xs">
              <h2>Maximize your exchange experience!</h2>
            </div>

            <div className="row feature-row center-xs">
              <div className="icon-container col-xs-12 col-md-4 col-lg-4">{ IconsHelper.materialIcon('group') }
                <p id="icon-title">Know your group</p>
                <p>Find travel buddies within your different groups</p>
              </div>

              <div className="icon-container col-xs-12 col-md-4 col-lg-4">{ IconsHelper.materialIcon('library_books') }
                <p id="icon-title">Read senior's stories</p>
                <p>Learn tips and tricks from stories shared by other exchangers</p>
              </div>

              <div className="icon-container col-xs-12 col-md-4 col-lg-4">{ IconsHelper.materialIcon('event') }
                <p id="icon-title">Attend and organise events</p>
                <p>Know people within your group by participating in new events</p>
              </div>
            </div>
          </div>

          <div id="terms-and-services">
            2016 &copy; ExchangeBuddy.com. All Rights Reserved.
          </div>
        </div>
          
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ toggleBottomBarVisibility, toggleTopBarVisibility }, dispatch)
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userObject
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
import React from 'react';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Icon from 'components/Icon';
import * as Colors from 'material-ui/styles/colors';

import landingBackgroundImage from 'assets/ExchangeBuddySpread.jpg';
import landingHeaderLogo from 'assets/ExchangeBuddySpreadIcon.png';

const landingImgStyle = {
  backgroundImage: `url(${ landingBackgroundImage })`,
  backgroundPositionX: 'center',
  backgroundRepeat: 'no-repeat',
};

const ActionButton = ({ user }) => {
  let buttonLabel, targetUrl;

  if (user && user.id) {
    buttonLabel = 'Enter';
    targetUrl = '/home';
  } else {
    buttonLabel = 'Connect';
    targetUrl = '/signup';
  }

  return (
     <RaisedButton
      secondary
      label={ buttonLabel }
      onTouchTap={ () => browserHistory.push(targetUrl) }
      style={{ maxWidth: 250, margin: '0 auto', height: 40 }}
      labelStyle={{ fontSize: '16px', padding: '0 20px' }} />
  );
};

ActionButton.propTypes = {
  user: React.PropTypes.object,
};

class Landing extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
  };

  render() {
    const { user } = this.props;

    return (
      <div id="landing-container">
      
        <div id="welcome-header-container">
          <div id="welcome-header" style={landingImgStyle}>

            <div className="container">
              <div className="row start-xs middle-xs">
                <div className="col-xs-9">
                  <img id="welcome-icon" src={ landingHeaderLogo } alt="Icons" style={{ margin: 10, width: 250 }} />
                </div>

                <div className="col-xs-3" style={{ textAlign: 'right' }}>
                  <IconButton onClick={ () => browserHistory.push('/settings') } style={{ margin: 10 }}>
                    <Icon name="menu" />
                  </IconButton>
                </div>
              </div>
            </div>

            <div id="welcome-main-container">
              <div id="welcome-header-title">
                <h2 id="app-title">Going for Student Exchange?</h2>
                <div id="app-subtitle-container">
                  <p className="app-subtitle">Connect to our network of over 900 universities!</p>
                </div>
              </div>

              <div className="action-button-container">
                <ActionButton user={ user } />
              </div>
            </div>
          </div>
        </div>

        <div id="cover-lists">
          <div id="feature-list" className="container">
            <div className="row center-xs">
              <h2>Maximize your exchange experience!</h2>
            </div>

            <div className="row feature-row center-xs">
              <div className="icon-container col-xs-12 col-md-4 col-lg-4">
                <Icon name="group" color={ Colors.grey500 } size={ 64 } />
                <p className="icon-title">Know your group</p>
                <p>Find travel buddies within your different groups</p>
              </div>

              <div className="icon-container col-xs-12 col-md-4 col-lg-4">
                <Icon name="library_books" color={ Colors.grey500 } size={ 64 } />
                <p className="icon-title">Read senior's stories</p>
                <p>Learn tips and tricks from stories shared by other exchangers</p>
              </div>

              <div className="icon-container col-xs-12 col-md-4 col-lg-4">
                <Icon name="event" color={ Colors.grey500 } size={ 64 } />
                <p className="icon-title">Attend and organise events</p>
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

const mapStateToProps = (state) => {
  return {
    user: state['User/currentUser'],
  };
};

export default connect(mapStateToProps)(Landing);
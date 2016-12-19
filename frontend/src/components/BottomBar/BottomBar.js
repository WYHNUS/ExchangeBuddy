import React from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import { browserHistory } from 'react-router';
import Icon from 'components/Icon';

function urlToIdx(url) {
  let urlFmt = url.substring(1).toLowerCase();
  let urlArr = urlFmt.split('/');
  const firstLvl = urlArr[0];

  switch (firstLvl) {
    case 'home':
      return 0;
    case 'wiki':
      return 1;
    case 'stories':
      return 2;
    case 'profile':
      return 3;
    case '':
      return 0;
    default:
      return -1;
  }
}

class BottomBar extends React.Component {
  render() {
    const tabIdx = urlToIdx(window.location.pathname);

    return (
      <Paper zDepth={1} className="bottom-navigation">

        <BottomNavigation selectedIndex={tabIdx}>
        <BottomNavigationItem onTouchTap={this.goToURL('/home')} label="Home" icon={ <Icon name="home" /> } />
        <BottomNavigationItem onTouchTap={this.goToURL('/wiki')} label="Wiki" icon={ <Icon name="info" /> } />
        <BottomNavigationItem onTouchTap={this.goToURL('/stories')} label="Stories" icon={ <Icon name="library_books" /> } />
        <BottomNavigationItem onTouchTap={this.goToURL('/profile/me')} label="Profile" icon={ <Icon name="account_circle" /> } />
        </BottomNavigation>

      </Paper>
    )
  }

  goToURL(url) {
    if (url === '/home') {
      return () => {
        browserHistory.push(url);
        this.props.toggleHomeTab('friends');
      };
    } else {
      return () => browserHistory.push(url);
    }
  }
}

BottomBar.propTypes = {
  toggleHomeTab: React.PropTypes.func.isRequired,
};

export default BottomBar;

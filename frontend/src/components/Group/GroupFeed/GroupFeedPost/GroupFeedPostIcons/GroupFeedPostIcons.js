import React from 'react';
import './GroupFeedPostIcons.scss';

import IconButton from 'material-ui/IconButton';
import Icon from 'components/Icon';
import { availableEmojis } from 'util/helper';

const GroupFeedPostIcons = ({ handleToggleComments }) => (
  <div className="row post-icons">

    <div className="middle-xs comments-select">
      <IconButton size = { 30 } onClick={ handleToggleComments } >
        <div className="no-speak"><Icon name={`twa twa-left-speech-bubble`} /></div>
        <div className="speak"><Icon name={`twa twa-speech-balloon`} /></div>
      </IconButton>
    </div>

    <div className="emoji-select">
      <IconButton size = { 30 }>   
        <div className="normal-face"><Icon name={`twa twa-grin`} /></div>
        <div className="shock-face"> <Icon name={`twa twa-open-mouth`} /></div>
      </IconButton>
      <div className="available-emojis">
        <div className="bubble">
          { availableEmojis.map((emoji,idx) => (
            <IconButton style = {{ padding:0, width:20, height:20, margin:5 }} key = { idx }> 
              <Icon size={ 16 } name={`twa twa-${ emoji }`} key={ idx } /> 
            </IconButton>
          )) } 
        </div>
      </div>
    </div>
    
  </div>
)

GroupFeedPostIcons.propTypes = {
  handleToggleComments: React.PropTypes.func.isRequired,
};

export default GroupFeedPostIcons;
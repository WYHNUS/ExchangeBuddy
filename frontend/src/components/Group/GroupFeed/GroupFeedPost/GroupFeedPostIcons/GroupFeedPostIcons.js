import React from 'react';
import './GroupFeedPostIcons.scss';

import IconButton from 'material-ui/IconButton';
import Icon from 'components/Icon';

import { availableEmojis } from 'util/helper';
import { feedPostReactionPropType } from 'util/propTypes';

const GroupFeedPostIcons = ({ handleToggleComments, reactions }) => (
  <div className="row">
    <div className="col-xs-1 middle-xs">
    
      <div className="middle-xs comments-select">
        <IconButton size={ 30 } onClick={ handleToggleComments } >
          <div className="no-speak">
            <Icon name="twa twa-left-speech-bubble" />
          </div>
          <div className="speak">
            <Icon name="twa twa-speech-balloon" />
          </div>
        </IconButton>
      </div>

    </div>

    <div className="col-xs-4 middle-xs">
      <div className="emoji-select">
        <IconButton size={ 30 }>   
          <div className="normal-face">
            <Icon name="twa twa-grin" />
          </div>
          <div className="shock-face">
            <Icon name="twa twa-open-mouth" />
          </div>
        </IconButton>

        <div className="available-emojis">
          <div className="bubble">
            { availableEmojis.map((emoji, idx) => (
              <IconButton style={{ padding: 0, width: 20, height: 20, margin: 5 }} key={ idx }> 
                <Icon size={ 16 } name={`twa twa-${ emoji }`} /> 
              </IconButton>
            )) } 
          </div>
        </div>
      </div>
    </div>


    <div className="col-xs-7 middle-xs emoji-display">

      { reactions.map(({ user, reaction, id }) => (
        <div className= "emoji" key={ id }>
          <Icon size={ 18 } name={`twa twa-${ reaction }`} /> 
        </div>
      )) } 

    </div>
  </div>
)

GroupFeedPostIcons.propTypes={
  handleToggleComments: React.PropTypes.func.isRequired,
  reactions: React.PropTypes.arrayOf(feedPostReactionPropType).isRequired,
};

export default GroupFeedPostIcons;
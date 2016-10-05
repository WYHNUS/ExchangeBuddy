import React from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';

//import * as Icons from '../utils/Icons';

var divStyle = {
  margin: '40px',
};

const NotFoundPage = () => {
	return (
		<div className="row center-xs"
		style={divStyle}>
		<div className="col-xs-8">

		{/*<img src={fallingimg} alt="404" style={{maxWidth:"100%"}}></img>*/}
		<h2>404 - Sorry, page not found</h2>

		<Link id="home-button" to="/">
    {/*<IconButton tooltip="Go home" touch={true} iconStyle={{color: '#808080'}}>
      {Icons.MUI('home')}
    </IconButton>*/}
		</Link>

		</div>
		</div>
		);
};

export default NotFoundPage;
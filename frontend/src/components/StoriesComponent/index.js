import React, {Component, PropTypes} from 'react';

import {Link, browserHistory} from 'react-router';

class StoriesComponent extends Component {

	//setup fetching of stuff
	componentWillMount(){

	}

	render(){
		return(
			<div className="row center-xs">
			<div className="col-xs-12">
			hello from stories component
			</div>
			</div>
			);

	}
}

StoriesComponent.PropTypes={

}

export default StoriesComponent;
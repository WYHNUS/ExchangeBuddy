import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { 
	toggleBottomBarVisibility, toggleTopBarVisibility,
	toggleTopBarSettingsButtonVisibility 
} from '../../actions/pageVisibility';
import { browserHistory } from 'react-router';


class Wiki extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarSettingsButtonVisibility(true);
	}

	componentWillUnmount(){
		this.props.toggleTopBarSettingsButtonVisibility(false);
	}

	getComponent(wikiTitle) {
        console.log(wikiTitle);
        browserHistory.push('/wiki/' + wikiTitle);
    }

	// if user is signedin, display wiki related to his home and exchange Universities
	// as well as the related two Countries as Recommendation
	// otherwise display mostly viewed wiki OR Singapore and NUS as default (for now...)
	// later maybe can use user's location to give suggestions?
	render() {
		return (
			<div>
				<div className="wiki-recommendation-wrapper">
					<div className="recommendation-nav-bar">
						<h2>Recommendation</h2>
					</div>
					<hr className="green-separator" sytle={{ width: "80%"}}></hr>
					<ul className="recommendation-item-list">
						<li className="recommendation-item">
							<div className="recommendation-item-wrapper" onClick={this.getComponent.bind(this, "university title")}>
								<img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSTbaosNAfYYmTOoIblAjvlfYYP63bnMb_J_PmH3R4T4N16A8RqAqOcQs0" />
							    <p>University</p>
							</div>
						</li>
					</ul>
					<hr className="green-separator" sytle={{ width: "80%"}}></hr>
				</div>
				<div className="search">
					
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarSettingsButtonVisibility: visibility=>dispatch(toggleTopBarSettingsButtonVisibility(visibility))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Wiki);
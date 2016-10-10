import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loading from '../../../Loading';
import {AutoCompleteFormField} from '../../../Field';


export default class SearchBar extends React.Component {
	render() {
		return(
			<div>
			SearchBar
			{/*<AutoCompleteFormField/>*/}
			</div>
			);
	}
}

SearchBar.PropTypes={
	toggleHomeGroupUniversitySearchList: PropTypes.func.isRequired
}

{/*name="homeUniName"
			floatingLabelText="Search Universities"
			{...homeUniName}
			openOnFocus={false}
			filter={ filter }
			maxSearchResults={10}
			dataSource={ universities.map((uni) => uni.name ) } */}
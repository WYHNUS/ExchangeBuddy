import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loading from '../../../Loading';
import {AutoCompleteFormField} from '../../../Field';


var owngroups = 
[
{
	name: 'Waseda University exchange students -- Spring 2016',
	id: '1',
	groupType: 0
},
{
	name: 'National Technological University students going abroad -- Spring 2016',
	id: '2',
	groupType: 1
}, 
{
	name: 'National Technological University students in KTH Royal Institute of Technology',
	id: '3',
	groupType: 2
},
{
	name: 'Japan Internship -- Spring 2016',
	id: '4',
	groupType: 3
}

]

export default class SearchBar extends React.Component {
	render() {
		return(
			<div>
			SearchBar
			
			</div>
			);
	}
}
//dataSource={groups.map((group)=>group.name)
/*<AutoCompleteFormField
			name="groupSearch"
			openOnFocus={false}
			/>*/

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
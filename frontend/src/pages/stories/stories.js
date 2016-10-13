import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility } from '../../actions/pageVisibility';

import StoryList from '../../components/StoriesComponent/StoryList';

import story1ImgUrl from '../../res/SEP-Application.png';


var stories =
[
{
	id:1,
	content:
	'<h2 style="text-align: justify;">For NUS Students: Starting the Application Process</h2>\
	<p>Are you interested in applying for the NUS Student Exchange Programme (SEP), but are unsure of the application process?</p>\
	<p style="text-align: justify;">My name is Min Han, and I will be breaking down the NUS SEP application process into 6 simple \
	steps. I will be covering what I went through, as well as the documents I had to prepare as a NUS CHBE \
	student, which I feel should be similar for other courses. If you are from a different faculty, you \
	may want to check with your seniors or course&#8217;s international coordinator!</p>\
	<h4 style="text-align: justify;">Step 0:       Check the application period</h4>\
	<p style="text-align: justify;">Before you begin, you need to know when your SEP application \
	period is. You can easily check this up online or you will receive news from your school&#8217;s email. \
	So <span style="text-decoration: underline;"><strong>CHECK YOUR NUS EMAIL!</strong></span></p>\
	<h4 style="text-align: justify;">Step 1:        Access the SEP Application Portal</h4>\
	<p style="text-align: justify;">During the application period, log in to the portal and submit \
	your application. Remember to do so before the DEADLINE!</p>\
	<p style="text-align: justify;">Portal: https:\/\/myaces.nus.edu.sg/VOPSEP/Login</p>\
	<h4 style="text-align: justify;">Step 2:       Write up about yourself</h4>\
	<p style="text-align: justify;">This is the easy part. Fill in all your personal information: \
	CCAs, awards, academic history and others. You will also need to write a Statement of Purpose \
	(up to 1000 words I believe), including why you feel that you should be allowed to be an \
	ambassador of NUS for SEP or other information which you feel are relevant.</p>\
	<h4 style="text-align: justify;">Step 3:       Fill in your top 5 choices</h4>\
	<p style="text-align: justify;">During this application period, you should receive \
	a list stating the number of vacancies at the different possible partner school choices \
	from NUS International Relations Office (IRO). You are required to fill up your top 5 \
	school choices from this list and the period that you intend to head for exchange Eg Aalto \
	University (Finland), Semester 1. Of these 5 choices, at least 3 must be on different continents. \
	For each of your choices, you then need to list out the modules you plan to take and the corresponding \
	NUS module that you wish to map it to.</p>\
	<p style="text-align: justify;">I would say this is the hardest part of the application as you will spend a \
	lot of time researching about each school and the modules that they offer. I would strongly suggest \
	that you do not procrastinate on this step. Set aside enough time (at least 1 week) to contemplate about\
	your school choices. If you&#8217;re overwhelmed, take things slowly and work your way down the list provided.\
	You can even ask for seniors for recommendations of popular school choices.</p>\
	<p style="text-align: justify;">Thankfully, at this point you do not need to a definite list of\
	all the modules you want to study yet but try your best to find as many mappable modules as possible.</p>\
	<p style="text-align: justify;">Important things to research about your SEP school include:</p>\
	',
	tags: ['application','Chem Eng','NUS','SEP'],
	favorites: 20,
	status: 'published',
	author:{
		diplayName: "Lee Min Han",
		userId:1
	},
	title: 'For NUS Students: Starting the Application Process',
	storyImgUrl: story1ImgUrl,
	createdAt: 'Thu Oct 13 2016 14:45:36 GMT+0800 (SGT)'
},
{
	id:2,
	content:
	'<h2 style="text-align: justify;">For NUS Students: Starting the Application Process</h2>\
	<p>Are you interested in applying for the NUS Student Exchange Programme (SEP), but are unsure of the application process?</p>\
	<p style="text-align: justify;">My name is Min Han, and I will be breaking down the NUS SEP application process into 6 simple \
	steps. I will be covering what I went through, as well as the documents I had to prepare as a NUS CHBE \
	student, which I feel should be similar for other courses. If you are from a different faculty, you \
	may want to check with your seniors or course&#8217;s international coordinator!</p>\
	<h4 style="text-align: justify;">Step 0:       Check the application period</h4>\
	<p style="text-align: justify;">Before you begin, you need to know when your SEP application \
	period is. You can easily check this up online or you will receive news from your school&#8217;s email. \
	So <span style="text-decoration: underline;"><strong>CHECK YOUR NUS EMAIL!</strong></span></p>\
	<h4 style="text-align: justify;">Step 1:        Access the SEP Application Portal</h4>\
	<p style="text-align: justify;">During the application period, log in to the portal and submit \
	your application. Remember to do so before the DEADLINE!</p>\
	<p style="text-align: justify;">Portal: https:\/\/myaces.nus.edu.sg/VOPSEP/Login</p>\
	<h4 style="text-align: justify;">Step 2:       Write up about yourself</h4>\
	<p style="text-align: justify;">This is the easy part. Fill in all your personal information: \
	CCAs, awards, academic history and others. You will also need to write a Statement of Purpose \
	(up to 1000 words I believe), including why you feel that you should be allowed to be an \
	ambassador of NUS for SEP or other information which you feel are relevant.</p>\
	<h4 style="text-align: justify;">Step 3:       Fill in your top 5 choices</h4>\
	<p style="text-align: justify;">During this application period, you should receive \
	a list stating the number of vacancies at the different possible partner school choices \
	from NUS International Relations Office (IRO). You are required to fill up your top 5 \
	school choices from this list and the period that you intend to head for exchange Eg Aalto \
	University (Finland), Semester 1. Of these 5 choices, at least 3 must be on different continents. \
	For each of your choices, you then need to list out the modules you plan to take and the corresponding \
	NUS module that you wish to map it to.</p>\
	<p style="text-align: justify;">I would say this is the hardest part of the application as you will spend a \
	lot of time researching about each school and the modules that they offer. I would strongly suggest \
	that you do not procrastinate on this step. Set aside enough time (at least 1 week) to contemplate about\
	your school choices. If you&#8217;re overwhelmed, take things slowly and work your way down the list provided.\
	You can even ask for seniors for recommendations of popular school choices.</p>\
	<p style="text-align: justify;">Thankfully, at this point you do not need to a definite list of\
	all the modules you want to study yet but try your best to find as many mappable modules as possible.</p>\
	<p style="text-align: justify;">Important things to research about your SEP school include:</p>\
	',
	tags: ['exchange','guide','Singapore','SEP'],
	favorites: 40,
	status: 'published',
	author:{
		diplayName: "Lee Kai Yi",
		userId:2
	},
	title: 'Exchange in Singapore - All you need to know',
	storyImgUrl: story1ImgUrl,
	createdAt: 'Thu Oct 13 2016 14:45:36 GMT+0800 (SGT)'
}

];

class Stories extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
	}

	render() {
		return (
			<div>
			<StoryList stories={this.props.stories}/>
			</div>
			);
	}

}

const mapStateToProps = (state )=>{
	return{
		stories: stories
	};
}


const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
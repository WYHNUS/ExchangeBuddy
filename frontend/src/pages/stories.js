import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility } from '../actions/pageVisibility';

import StoryList from '../components/StoriesComponent/StoryList';

var stories =
[
{
	id:1,
/*	content:
{{<h2 style="text-align: justify;">For NUS Students: Starting the Application Process</h2>
<p>Are you interested in applying for the NUS Student Exchange Programme (SEP), but are unsure of the application process?</p>
<p style="text-align: justify;">My name is Min Han, and I will be breaking down the NUS SEP application process into 6 simple steps. I will be covering what I went through, as well as the documents I had to prepare as a NUS CHBE student, which I feel should be similar for other courses. If you are from a different faculty, you may want to check with your seniors or course&#8217;s international coordinator!</p>
<h4 style="text-align: justify;">Step 0:       Check the application period</h4>
<p style="text-align: justify;">Before you begin, you need to know when your SEP application period is. You can easily check this up online or you will receive news from your school&#8217;s email. So <span style="text-decoration: underline;"><strong>CHECK YOUR NUS EMAIL!</strong></span></p>
<h4 style="text-align: justify;">Step 1:        Access the SEP Application Portal</h4>
<p style="text-align: justify;">During the application period, log in to the portal and submit your application. Remember to do so before the DEADLINE!</p>
<p style="text-align: justify;">Portal: https:\/\/myaces.nus.edu.sg/VOPSEP/Login</p>
<h4 style="text-align: justify;">Step 2:       Write up about yourself</h4>
<p style="text-align: justify;">This is the easy part. Fill in all your personal information: CCAs, awards, academic history and others. You will also need to write a Statement of Purpose (up to 1000 words I believe), including why you feel that you should be allowed to be an ambassador of NUS for SEP or other information which you feel are relevant.</p>
<h4 style="text-align: justify;">Step 3:       Fill in your top 5 choices</h4>
<p style="text-align: justify;">During this application period, you should receive a list stating the number of vacancies at the different possible partner school choices from NUS International Relations Office (IRO). You are required to fill up your top 5 school choices from this list and the period that you intend to head for exchange Eg Aalto University (Finland), Semester 1. Of these 5 choices, at least 3 must be on different continents. For each of your choices, you then need to list out the modules you plan to take and the corresponding NUS module that you wish to map it to.</p>
<p style="text-align: justify;">I would say this is the hardest part of the application as you will spend a lot of time researching about each school and the modules that they offer. I would strongly suggest that you do not procrastinate on this step. Set aside enough time (at least 1 week) to contemplate about your school choices. If you&#8217;re overwhelmed, take things slowly and work your way down the list provided. You can even ask for seniors for recommendations of popular school choices.</p>
<p style="text-align: justify;">Thankfully, at this point you do not need to a definite list of all the modules you want to study yet but try your best to find as many mappable modules as possible.</p>
<p style="text-align: justify;">Important things to research about your SEP school include:</p>
<ul>
<li style="text-align: justify;">The school&#8217;s ranking for your course</li>
<li style="text-align: justify;">Possible modules for mapping. Make sure these modules are available during the intended semester of exchange. Just because the school offers that modules does not mean that it is offered for the entire year.</li>
<li style="text-align: justify;">The situation and status of the city and country of your school.</li>
</ul>
<p style="text-align: justify;">Though every choice is important, try to spend more time contemplating and planning for your first and second choices. These are the ones that you must be most well-versed in to talk about when you head for your SEP interview (if any).</p>
<h4 style="text-align: justify;">Step 4:       Prepare your documents</h4>
<p style="text-align: justify;">There are 3 documents that NUS CHBE students are required to submit before heading for SEP. These are our study plan, mappable module description list and module road map. The first one is to be submitted when you head for your SEP interview while the rest can be submitted afterwards. If you have the time, try to prepare them all during the planning stages as it will help you in deciding your school choice.</p>
<ol style="text-align: justify;">
<li>Study Plan
<ul>
<li>This first document is the tentative list of modules (both NUS and partner school) that you plan to map. Modules listed here can still be changed any time, even while you are already in SEP.</li>
<li>When preparing this, I highly recommend that you find at least find 5 mappable modules (maybe 7 or so) for your chosen schools and within the period of exchange. This gives you some backup options as well. If your intended partner school only has 4 mappable modules or less, you may wish to reconsider it.</li>
</ul>
<p>&nbsp;</li>
<li>Mappable Module Description
<ul>
<li>This document can be done later after the results are out and you have been assigned an SEP partner school.</li>
<li>It is a full list of all modules (both intended and backup options) that you potentially could take while on exchange in your partner university. It includes full descriptions about the NUS modules and the corresponding mapped partner university modules that you can find from both universities&#8217; websites such as number of hours, module content etc to show that the modules are similar enough. You are then required to submit this list to your department to request for mapping approval.</li>
<li>Ultimately when you go for SEP, you are only allowed to choose modules which are within this list. If the information found is insufficient or the modules too dissimilar, it may be rejected and you may need to email to request for more information or seek other modules.</li>
<li><strong>I strongly advise you to find as many modules as possible</strong>. The information that you find will likely be outdated as you are probably preparing this one year in advance. It is possible that a module that you wanted to take becomes unavailable when you head for your own SEP. This could be due to discontinuation of module, insufficient students or other reasons.</li>
<li>If you find a new module that you want to map while on exchange which is not in this list, you have to request for approval again.</li>
<li>Note that when seeking approval, you may need to approach other departments if those modules are not within the control of your department. This may be a long lengthy procedure, so best to start it early.</li>
</ul>
<p>&nbsp;</li>
<li>Road Map
<ul>
<li>This document can be done later after the results are out and you have been assigned an SEP partner school.</li>
<li>It is an excel sheet which summarises all the modules which you have taken or will be taking every semester throughout your education curriculum. It helps you to plan and ensure that you fulfill all important modules and prerequisites as well as graduation requirements.</li>
<li>Please read up on your course&#8217;s recommended schedule so that you don&#8217;t miss out on anything needed for graduation!</li>
</ul>
</li>
</ol>
<h4 style="text-align: justify;">Step 5:       Head for your SEP interview (if any)</h4>
<p style="text-align: justify;">Some faculties like NUS School of business do not have this segment. However NUS CHBE does!</p>
<p style="text-align: justify;">It is a small group interview of up to 3 interviewees and 3 interviewers, and lasts for 10-15 minutes. Within this interview, they will ask 3-5 questions for the group to answer. These questions have a wide range of topics, such as describing about yourself and past experiences, about your educational curriculum or about your SEP choices. You can find a list of sample SEP interview questions <a href="https:\/\/whyamiinchemeng.wordpress.com/2016/07/18/sep-interview/" onclick="__gaTracker('send', 'event', 'outbound-article', 'https:\/\/whyamiinchemeng.wordpress.com/2016/07/18/sep-interview/', 'here');">here</a>.</p>
<h4 style="text-align: justify;">Step 6:       Pray</h4>
<p style="text-align: justify;">And you&#8217;re done! That is all there is to it and hopefully you will get your top choice! (:. If you don&#8217;t, fret not. There is always round 2 (and maybe round 3), but only with the remaining vacancies that have yet to be taken.</p>
<p style="text-align: justify;">SEP really is a wonderful experience, so I hope that this simple guide has been helpful to whoever needs it (:.</p>}
}},*/
tags: ['application','Chem Eng','NUS','SEP'],
published: '16/10/2016',
favorites: 20,
status: 'published',
author:{

}
},
{
	id:2,
	content:'hdlhsskhlshakajdhladjshlfkadsj'
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
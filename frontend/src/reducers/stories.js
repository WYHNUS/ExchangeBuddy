import {
	SAVE_STORY_CONTENT, 
	CLICKED_UPLOAD, UPLOAD_CONTENT_SUCCESS, UPLOAD_CONTENT_FAIL,
	CLICKED_FETCH, FETCH_STORIES_SUCCESS, FETCH_STORIES_FAIL
} from '../actions/stories';

import story1ImgUrl from '../res/SEP-Application.png';
import story2ImgUrl from '../res/Exchange-In-Singapore.jpg';

var story1 =
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
		displayName: "Lee Min Han",
		userId:1
	},
	title: 'For NUS Students: Starting the Application Process',
	storyImgUrl: story1ImgUrl,
	createdAt: 'Thu Oct 13 2016 14:45:36 GMT+0800 (SGT)'
};
var story2=
{
	id:2,
	content:
	'<p>Singapore’s a hot (literally), destination for students to go on exchange. There’s absolutely no need \
	to worry about communication, food, transportation, entertainment and more.</p>\
	<h3><strong>#1 Take The Public Transport ALL THE TIME </strong></h3>\
	<p>Singaporeans might complain about the breakdowns or delays once in a while, but when \
	you compare it to the transport systems in other countries, it’s pretty damn reliable and fast.\
	Also, it’s priced by distance so you’re only paying as much as you travel. You can also get a \
	concession pass, it will save you a lot if you’re using the public transport every day.</p>\
	<p>Considering that you can usually get from one point to another in Singapore in less than \
	an hour, there is almost no need to cab. With a huge luggage, the MRT (our subway/train system)\
	is still convenient as long as you avoid the morning and evening crowd. It’ll be harder to \
	travel on a bus with luggage though.</p>\
	<p>Cabs in Singapore are the more expensive option, although still cheaper than cabs in other \
	countries. More and more Singaporeans nowadays are choosing Uber or Grab over traditional cabs \
	nowadays with both these companies offering better prices/deals/promos.</p>\
	<p>Don’t worry, you’ll probably figure out the transport system in a day. If you’re having \
	problems, just ask any Singaporean near you or the MRT attendants.</p>\
	<h3><strong>#2 Choose To Eat At Hawker Centers/Food Courts</strong></h3>\
	<p>Singapore’s well known for its delicious and diverse range of food. Thai, Viet, Japanese, \
	Korean, American, Mexican, Indonesian cuisines, you name it, we have it. The best food in Singapore \
	is very often found in small hawker centers and food courts rather than restaurants. It’s also the \
	smartest way to not burn a hole in your wallet.</p>\
	<p>Millennials in Singapore also have a culture of going café-hopping. We go to new, hipster-looking \
	cafes for good coffee and good brunch food. Singaporeans love our eggs benedict and truffle fries, \
	especially if it makes a good Instagram-able photo.</p>\
	<p>Here are just a few of our favorite cafes: Pacamara, Kith Cafe, Builders, Toby&#8217;s Estate</p>\
	<h3><strong>#3 Be A Responsible Group Member</strong></h3>\
	',
	tags: ['exchange','guide','Singapore','SEP'],
	favorites: 40,
	status: 'published',
	author:{
		displayName: "ExchangeBuddy",
		userId:2
	},
	title: 'Exchange in Singapore - All you need to know',
	storyImgUrl: story2ImgUrl,
	createdAt: 'Thu Oct 13 2016 14:45:36 GMT+0800 (SGT)'
};

var storyList = 
[
{
	id:1,
	title: 'For NUS Students: Starting the Application Process',
	tags: ['application','Chem Eng','NUS','SEP'],
	favorites: 20,
	status: 'published',
	author:{
		displayName: "Lee Min Han",
		userId:1
	},
	storyImgUrl: story1ImgUrl,
	createdAt: 'Thu Oct 13 2016 14:45:36 GMT+0800 (SGT)',
	replies: 10

},
{
	id:2,
	title: 'Exchange in Singapore - All you need to know',
	tags: ['exchange','guide','Singapore','SEP'],
	favorites: 40,
	status: 'published',
	author:{
		displayName: "ExchangeBuddy",
		userId:2
	},
	storyImgUrl: story2ImgUrl,
	createdAt: 'Thu Oct 13 2016 14:45:36 GMT+0800 (SGT)',
	replies: 3

}
]

const initialState=
{
	error: null,
	fetching: false,
	storyDetails: story1,
	storyList: storyList,
	editingStory: {
		title: null,
		content: "<p>Share your life events here! :D </p>",
		error: null, 
		uploading: false,
		published: false
	}
}

export function stories(state=initialState, action) 
{
	switch (action.type) 
	{
		case CLICKED_FETCH: 
			return Object.assign({}, state, {
				fetching: true
		    });

		case FETCH_STORIES_SUCCESS:
			return Object.assign({}, state, {
		        storyList:{
					storyList: action.stories
				},
				error: null,
				fetching: false
		    });

		case FETCH_STORIES_FAIL:
			return Object.assign({}, state, {
				error: action.error,
				fetching: false
		    });


		case SAVE_STORY_CONTENT:
			return Object.assign({}, state, {
		        editingStory: {
					title: action.title,
					content: action.content,
					error: null, 
					uploading: false,
					published: false
		        }
		    });

		case CLICKED_UPLOAD:
			return Object.assign({}, state, {
		        editingStory: {
					title: state.editingStory.title,
					content: state.editingStory.content,
					error: null, 
					uploading: true,
					published: false
		        }
			});

		case UPLOAD_CONTENT_SUCCESS:
			return Object.assign({}, state, {
				editingStory: {
					title: state.editingStory.title,
					content: state.editingStory.content,
					error: null, 
					uploading: false,
					published: true
		        }
			});

		case UPLOAD_CONTENT_FAIL:
			return Object.assign({}, state, {
				editingStory: {
					title: state.editingStory.title,
					content: state.editingStory.content,
					error: action.error, 
					uploading: false,
					published: false
		        }
			});

		default:
		return state
	}
}
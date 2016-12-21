import { connect } from 'react-redux';
import ChildComponent from './GroupFeed';

const _tempFeedPosts = [
  {
    id: 1,
    content: 'On the first day of Christmas my true love sent to me: A Partridge in a Pear Tree. On the second day of Christmas my true love sent to me: Two Turtle Doves and a Partridge in a Pear Tree',
    author:     
    {
      id: 3,
      name: 'Margeret Pearson',
      profilePictureUrl: 'http://lorempixel.com/80/80/people/2',
      university: {
        id: 3,
        name: 'Stanford University',
        city: 'Palo Alto',
        logoImageUrl: 'https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-university-public-image/stanford-university.jpg',
        country: {
          alpha2Code: 'US',
          name: 'United States of America (USA)',
        },
      },
    },
  },

  {
    id: 2,
    content: 'At first I was afraid, I was petrified Kept thinking I could never live without you by my side But then I spent so many nights thinking how you did me wrong And I grew strong And I learned how to get along And so youre back From outer space I just walked in to find you here with that sad look upon your face',
    author: 
    { 
      id: 1, 
      name: 'Irvin Lim Wei Quan', 
      fbUserId: '10155216317967575',
      university: { 
        id: 1, 
        name: 'National University of Singapore', 
        city: 'Singapore', 
        logoImageUrl: 'https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-university-public-image/national-university-of-singapore-nus.jpg',
        country: {
          alpha2Code: 'SG',
          name: 'Singapore',
        },
      },
    },
  },

  {
    id: 3, 
    content: 'Hey Jude, dont make it bad Take a sad song and make it better Remember to let her into your heart Then you can start to make it better',
    author: 
    {
      id: 2,
      name: 'Nancy Parker',
      profilePictureUrl: 'http://lorempixel.com/80/80/people',
      university: {
        id: 2,
        name: 'Fudan University',
        city: 'Shanghai',
        logoImageUrl: 'https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-university-public-image/fudan-university.jpg',
        country: {
          alpha2Code: 'CN',
          name: 'China',
        },
      },
    },
  },
];

const mapStateToProps = (state) => ({
  user: state['User/currentUser'],
  feedPosts: _tempFeedPosts,
});

export default connect(mapStateToProps)(ChildComponent);
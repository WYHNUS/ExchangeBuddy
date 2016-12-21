import { connect } from 'react-redux';
import moment from 'moment';
import ChildComponent from './GroupFeedPostComments';

const _tempCommentReplies = [
  {
    id: 1,
    content: 'lmao yeah',
    createdAt: moment().subtract(2, 'd').toDate(),
    feedPostCommentId: 1,
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

  {
    id: 2,
    content: 'hahahahahahaha',
    createdAt: moment().subtract(2, 'd').toDate(),
    feedPostCommentId: 1,
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
    id: 3, 
    content: 'hello long time no see',
    createdAt: moment().subtract(2, 'd').toDate(),
    feedPostCommentId: 1,
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
];

const _tempFeedComments = [
  {
    id: 1,
    createdAt: moment().subtract(2, 'd').toDate(),
    feedPostId: 1,
    content: 'Wow! Amazing insight! Thank you :)',
    replies: _tempCommentReplies,
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
    id: 2,
    createdAt: moment().subtract(2, 'd').toDate(),
    feedPostId: 1,
    content: 'You\'re pretty awesome huh.',
    replies: _tempCommentReplies,
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

  {
    id: 3, 
    createdAt: moment().subtract(2, 'd').toDate(),
    feedPostId: 1,
    content: 'What??? You serious?',
    replies: _tempCommentReplies,
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
];

const mapStateToProps = (state) => ({
  user: state['User/currentUser'],
  feedComments: _tempFeedComments,
});

export default connect(mapStateToProps)(ChildComponent);
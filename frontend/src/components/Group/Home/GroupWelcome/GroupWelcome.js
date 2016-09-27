import React from 'react';

import { icon } from '../../../../../util/icons';

const LoggedIn = ({ group }) => (
  <div className="group-welcome">
    <p>Welcome to your ExchangeBuddy group! This group is exclusively for students going on exchange to <strong>{ group.university.name }</strong> in <strong>{ group.term } { group.year }</strong>.</p>
    <p>{ icon('chat') } Introduce yourself in the group chat!</p>
    <p>{ icon('info') } Get up to date and informed with the information in the wiki. You can even contribute by editing it!</p>
    <p>{ icon('event') } Find out what events are happening in the vicinity of your exchange university!</p>
  </div>
);

const NotLoggedIn = ({ group }) => (
  <div className="group-welcome">
    <h1>Welcome to ExchangeBuddy!</h1>
    <p>This group is exclusively for students going on exchange to <strong>{ group.university.name }</strong> in <strong>{ group.term } { group.year }</strong>.</p>
    <h3>Log in or sign up today, to enjoy the following:</h3>
    <p>{ icon('chat') } Get to know others going for the same exchange in the group chat!</p>
    <p>{ icon('info') } Get up to date and informed with the information in the wiki. You can even contribute by editing it!</p>
    <p>{ icon('event') } Find out what events are happening in the vicinity of your exchange university!</p>
  </div>
);

const GroupWelcome = ({ group }) => {
  if (Meteor.user())
    return <LoggedIn group={group} />;
  else
    return <NotLoggedIn group={group} />;
};

export default GroupWelcome;

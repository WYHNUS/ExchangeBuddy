import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { reduxForm } from 'redux-form';
import validator from 'validator';
import { browserHistory } from 'react-router';

import AspiringExchangerForm from './AspiringExchangerForm';
import CompleteExchangeForm from './CompleteExchangeForm';


export default class IdentifyUniForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded1: false,
      expanded2: false,
      expanded3: false,
    };
  }

  componentWillMount() {
    this.props.fetchAllUniversities();
  }

  handleExpandChange1 = (expanded) => {
    this.setState({expanded1: expanded});
  };
  handleExpandChange2 = (expanded) => {
    this.setState({expanded2: expanded});
  };
  handleExpandChange3 = (expanded) => {
    this.setState({expanded3: expanded});
  };

  render() {
    // Year of exchange
    const year = new Date().getFullYear();
    const goingYears = [];
    const doneYears = [];
    for (var i=year-1; i<year+5; i++) {
      goingYears.push(i);
    }
    for (var i=year-5; i<year; i++) {
      doneYears.push(i);
    }

    return (
      <div className="exchange-uni-selection-wrapper">
        <Card className="exchange-uni-selection" expanded={this.state.expanded1} onExpandChange={this.handleExpandChange1}>
          <CardHeader
            title="Aspiring Exchanger"
            subtitle="You are considering going for exchange, but have not yet confirmed a place."
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions expandable={true}>
            <AspiringExchangerForm />
          </CardActions>
        </Card>

        <Card className="exchange-uni-selection" expanded={this.state.expanded2} onExpandChange={this.handleExpandChange2}>
          <CardHeader
            title="The Exchanger"
            subtitle="You are going to exchange OR currently involved in exchange."
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions expandable={true}>
            <CompleteExchangeForm 
              years={ goingYears }
            />
          </CardActions>
        </Card>

        <Card className="exchange-uni-selection" expanded={this.state.expanded3} onExpandChange={this.handleExpandChange3}>
          <CardHeader
            title="Senior Exchanger"
            subtitle="You have done this before!"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions expandable={true}>
            <CompleteExchangeForm
              years={ doneYears }
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}
import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class ExchangeRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: null,
    }
  }

  componentDidMount() {
    // TODO: Query daily xe api
    $.getJSON("http://api.fixer.io/latest?base=SGD",
    result => this.setState({ rates: result.rates.USD }))
    // this.setState({ rates: 0.2 })
  }

  render() {
   return (
    <Card>
      <CardHeader
        title="Currency Exchange Rate"
        subtitle={this.state.rates}
        actAsExpander={true}
        showExpandableButton={false} />

      <CardText expandable={true}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
    </Card>
    );
  }
}

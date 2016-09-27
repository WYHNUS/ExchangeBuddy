import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Loading from '../Loading';
import FlatButton from 'material-ui/FlatButton';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: null,
    }
  }

  componentDidMount() {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=Singapore&mode=json&units=metric&cnt=6&appid=" +
      Meteor.settings.public.OpenWeatherMap.apiKey,
      result => this.setState({ forecast: {
          name: result.city.name,
          morning: result.list[1],
          noon: result.list[3],
          evening: result.list[5]
        }})
    );
  }

  render() {
   return (
    <Card>
      { this.state.forecast ?
      <div>
        <CardHeader
          title={this.state.forecast.name}
          actAsExpander={true}
          showExpandableButton={false} />
        <CardText expandable={true}>
          Morning: {this.state.forecast.morning.weather[0].main},
          Noon: {this.state.forecast.noon.weather[0].main},
          Evening: {this.state.forecast.evening.weather[0].main}
        </CardText>
      </div>
      :
      <Loading />
      }
    </Card>
    );
  }
}

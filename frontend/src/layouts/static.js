import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';

const Static = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },

  render() {
    return (
      <div className="page" style={{ backgroundImage: `linear-gradient(to top, rgba(25, 25, 25, 0.21) 0%,rgb(0, 0, 0) 215%), url('${ImagesHelper.getUrlScale(Meteor.settings.public.landingImageId, 1000)}')` }}>
        <NavigationBar />

        <div style={{ paddingTop: "50px", paddingBottom: "30px" }}>
          <Grid>
            <Row>
              <Col xs={12}>
                <Paper style={{ padding: "1% 5% 5% 5%" }}>

                  { this.props.children }

                </Paper>
              </Col>
            </Row>
          </Grid>
        </div>

      </div>
    );
  }
})

export default Static;

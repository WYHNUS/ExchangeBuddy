import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import WikiSection from '../WikiSection';
import WikiForm from '../WikiForm';

export default class WikiDetail extends React.Component {
  static propTypes = {
    wiki: React.PropTypes.object.isRequired,
    sections: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isAddingSection: false,
    };
  }

  render() {
    const { wiki, sections } = this.props;
    const { isAddingSection } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs wiki-detail-wrapper">
            <h1>{ wiki.title }</h1>
            <h4>All information is contributed by people like you!</h4>
            
            { sections.length > 0 && sections.map((section, idx) => 
              <WikiSection wiki={ wiki } section={ section } key={ idx } />
            ) }

            { isAddingSection
              ? <WikiForm
                  section={ null }
                  wikiName={ wiki.title }
                  closeEditForm={ () => this.setState({ isAddingSection: false }) } />
              : <div className="row center-md center-xs" style={{ margin: '30px 0' }}>
                  <div>
                    <RaisedButton className="raised-btn" label="Add a new Section" primary onClick={ () => this.setState({ isAddingSection: true }) } />
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
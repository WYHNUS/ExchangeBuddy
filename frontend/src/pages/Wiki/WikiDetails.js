import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

// import actions
import {
  fetchWikiPage
} from 'actions/wiki';

import WikiDetail from 'components/WikiComponent/WikiDetail';

class WikiDetails extends React.Component{
  componentWillMount() {
    // check if already in reducer
    if (this.props.wikiTitle !== this.props.currentWikiTitle
      || this.props.needReload)
      this.props.fetchWikiPage(this.props.wikiTitle);
  }

  render() {
    const { error, fetching } = this.props;

    return (
      <div>
        {
          fetching ?
            <p> fetching resource ... </p>
          :
            error ?
              error.message ?
                <p> { error.message } </p>
              : <p>{ error }</p>
            :
              <WikiDetail />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    wikiTitle: state.routing.locationBeforeTransitions.pathname.split('/')[2],
    currentWikiTitle: state.wiki.wiki.title,
    needReload: state.wiki.needReload,
    error: state.wiki.error,
    fetching: state.wiki.fetching
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWikiPage: (title) => dispatch(fetchWikiPage(title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiDetails);
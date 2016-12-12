import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeReq, post, patch } from 'util/api';
import { showSnackbar } from 'actions/messageSnackbar';

import AdminUniversityPanel from './AdminUniversityPanel';

const mapStateToProps = (state, props) => {
  const { countryCode, university } = props;
  const { name, city, website, logoImageUrl } = university;

  return {
    initialValues: {
      countryCode, city, website,
      universityName: name,
      logoImage: [{ preview: logoImageUrl }],
    },
    submitUpdateUniversity: makeReq(patch, `/updateUniInfo/${ props.university.id }`, { userToken: true }),
    submitUpdateUniversityLogo: makeReq(post, `/updateUniLogo/${ props.university.id }`, { userToken: true }),
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ showSnackbar }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUniversityPanel);

/*
refactor into using util/api and test makeReq
 */
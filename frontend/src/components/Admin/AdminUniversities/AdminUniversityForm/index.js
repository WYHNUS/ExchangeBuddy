import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeReq, post, patch, put } from 'util/api';
import { showSnackbar } from 'actions/messageSnackbar';

import AdminUniversityForm from './AdminUniversityForm';

const mapStateToProps = (state, props) => {
  const { countryCode, university } = props;

  if (!university) {
    return {
      submitCreateUniversity: makeReq(put, '/university', { userToken: true }),
    };
  }

  const { name, city, website, logoImageUrl } = university;

  return {
    initialValues: {
      countryCode, city, website,
      universityName: name,
      logoImage: [{ preview: logoImageUrl }],
    },
    submitUpdateUniversity: makeReq(patch, `/updateUniInfo/${ props.university.id }`, { userToken: true }),
    submitUpdateUniversityLogo: makeReq(post, `/updateUniLogo`, { userToken: true, contentType: null }),
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ showSnackbar }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUniversityForm);
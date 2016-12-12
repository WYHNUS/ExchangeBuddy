import AdminUniversityPanel from './AdminUniversityPanel';

// Refetch
import { connect as refetchConnect } from 'react-refetch';
import { ROOT_URL } from 'util/backend';
import { getToken } from 'util/bearer';

const refetch = props => ({
  submitUpdateUniversity: values => ({
    updateUniInfoResponse: {
      url: `${ ROOT_URL }/updateUniInfo/${ props.university.id }`,
      method: 'PATCH',
      body: JSON.stringify(values),
      headers: { Authorization: `Bearer ${ getToken() }` },
    },
  }),
});

const RefetchedComponent = refetchConnect(refetch)(AdminUniversityPanel);

// Redux
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  const { countryCode, university } = props;
  const { name, city, website, logoImageUrl } = university;

  return {
    initialValues: {
      countryCode, city, website,
      universityName: name,
      logoImageUrl: [{ preview: logoImageUrl }],
    },
  };
};

export default connect(mapStateToProps)(RefetchedComponent);
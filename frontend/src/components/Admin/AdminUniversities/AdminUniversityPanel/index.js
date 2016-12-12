import AdminUniversityPanel from './AdminUniversityPanel';

// Refetch
import { connect as refetchConnect } from 'react-refetch';

const refetch = props => ({
  updateUniversity: uni => ({
    updateUniversityResponse: {
      url: `/updateUniversity/${props.uni.id}`,
      method: 'POST',
      body: JSON.stringify({ uni }),
    }
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
      countryCode, city, website, logoImageUrl,
      universityName: name,
    },
  };
};

export default connect(mapStateToProps)(RefetchedComponent);
import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loading from '../../../Loading';

const GroupItem = ({ name, heading }) => {
  return (
    <div className="group-body">
      <h5 className="group-heading">{heading}</h5>
      <p className="group-name">
        { name }
      </p>
    </div>
  );
};

const Group = ({ group, currentUser }) => {
  const { name, groupType, id } = group;

  return (
    <div>
      <div className="group-row">
        <div className="group-avatar">{ /*UserHelper.getAvatar(user, 40)*/ }</div>
        {
          groupType === 0 ? <GroupItem name={name} heading={"Your Exchange University Group"} />
        : groupType === 1 ? <GroupItem name={name} heading={"Your Home University Group"}/>
        : groupType === 2 ? <GroupItem name={name} heading={"Your Home University Alumni Support Group"}/>
        : groupType === 3 ? <GroupItem name={name} heading={"Your Special Group"}/>
        : null
        }
      </div>
    </div>
  )
};


export default class GroupList extends React.Component {

	render() {
		const {groups, user} = this.props;
		return(
			<div className="groups-container">
			{ groups.length > 0 && groups.map((group, idx) => <Group group={ group } currentUser={ user } key={ idx } />) }
			</div>
			);
	}
}

GroupList.PropTypes={
	user: PropTypes.object.isRequired,
	groups: PropTypes.object.isRequired
}
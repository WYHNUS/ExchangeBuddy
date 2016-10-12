import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import * as IconsHelper from '../../../util/icons';

export default class SettingsList extends React.Component {
	render() {

		return (
			<div>
			<List>
			<ListItem primaryText="Inbox" leftIcon={IconsHelper.icon("person")} />
			<ListItem primaryText="Starred" leftIcon={IconsHelper.icon("person")} />
			<ListItem primaryText="Sent mail" leftIcon={IconsHelper.icon("person")} />
			<ListItem primaryText="Drafts" leftIcon={IconsHelper.icon("person")} />
			<ListItem primaryText="Inbox" leftIcon={IconsHelper.icon("person")} />
			</List>
			</div>
			)
	}
}

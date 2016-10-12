import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import * as IconsHelper from '../../../util/icons';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class SettingsList extends React.Component {
	render() {

		return (
			<div>

			<div className='row center-xs'>
			<Card className="settings-item-card col-xs" style={{maxWidth: "512px"}}>
			<CardHeader title={ "About" } 
			actAsExpander={ true } 
			showExpandableButton={ true } />
			<CardText expandable={true}>
			<div className="settings-info">
			<h1>About Exchange Buddy</h1>
			<p>We are a group of passionate students who have always wished that we could find friends and information for our <strong>Overseas Exchange Programme</strong>. That is why we decided to <strong>group</strong> you with your friends and create <strong>ExchangeBuddy</strong>!</p>
			<p><strong>Exchange Buddy</strong> provides a platform for exchange students to find friends, information and events at the exchange university easily and quickly even before you travel.</p>
			<h1>About The Team</h1>
			<p>The first iteration of this application is developed by four students, <strong>Irvin Lim, Leon Mak, Eugene Ng and Lam Chi Thanh</strong></p>
			<p>The current iteration of this application is developed by four students, <strong>Yan Hao, Hanming, Eugene Ng and Kai Yi</strong></p>
			</div>
			</CardText>
			</Card>
			</div>

			<div className='row center-xs'>
			<Card className="settings-item-card col-xs" style={{maxWidth: "512px"}}>
			<CardHeader title={ "Privacy Policy" } 
			actAsExpander={ true } 
			showExpandableButton={ true } />
			<CardText expandable={true}>
			<div className="settings-info">
			<h1>Privacy Policy</h1>

			<h2>Information Collection</h2>
			<p>Browsing our websites does not require your identities to be revealed. However, under the following circumstances, you are not anonymous to us.</p>

			<h2>User</h2>
			<p>We will ask for your personal information. The personal information collected includes but not restricting to the following:<br/>
			1. Private information such as name and birthdate<br/>
			2. Contact information such as email address, mobile number and physical address<br/>
			3. Additional information which we may ask for if we believe the site policies are violated<br/>
			Once you log into the account, your identity will be revealed to us.</p>

			<h2>Information Usage</h2>
			<p>The primary purpose in collecting personal information is to provide the users with a smooth and customized experience.
			We will use the information collected for the following purposes<br/>
			1. To provide its intended services<br/>
			2. To resolve disputes, and troubleshoot problems and errors<br/>
			3. To assist in law enforcement purposes and prevent/restrict the occurrences of potentially illegal or prohibited activities</p>

			<h2>Disclosure of information</h2>
			<p>We may share information with governmental agencies or other companies assisting us in fraud prevention or investigation. We may do so when:<br/>
			1. Permitted or required by law; or,<br/>
			2. Trying to protect against or prevent actual or potential fraud or unauthorized transactions; or,<br/>
			3. Investigating fraud which has already taken place.<br/>
			The information is not provided to these companies for marketing purposes.</p>

			<h2>Usage of Cookies</h2>
			<p>Cookies are small files placed in your computer hard drives. We use it to analyse our site traffic. We have also used cookies to maintain your signed in status when you login to our websites.</p>

			<h2>Commitment to Data Security</h2>
			<p>Your personally identifiable information is kept secure. Only authorized employees, agents and contractors (who have agreed to keep information secure and confidential) have access to this information. All emails and newsletters from this site allow you to opt out of further mailings.</p>

			<h2>Changes to the Policies</h2>
			<p>We reserved the rights to amend this Privacy Policy at any time. Upon posting of new policies, it will take immediate effect. We may notify you should there be any major changes to the policies.</p>
			</div>
			</CardText>
			</Card>
			</div>

			{/*<List>
			<ListItem primaryText="About" leftIcon={IconsHelper.icon("person")} />
			<ListItem primaryText="Privacy Policy" leftIcon={IconsHelper.icon("person")} />
		</List>*/}
		</div>
		)
}
}

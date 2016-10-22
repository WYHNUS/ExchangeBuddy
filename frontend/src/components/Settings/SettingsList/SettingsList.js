import React, {PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import * as IconsHelper from '../../../util/icons';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'react-flexbox-grid';
import {browserHistory} from 'react-router';

import ChiThanh from '../../../res/about/ChiThanh.jpg';
import EugeneNg from '../../../res/about/EugeneNg.jpg';
import IrvinLim from '../../../res/about/IrvinLim.jpg';
import KaiYiLee from '../../../res/about/KaiYiLee.jpg';
import KiatHan from '../../../res/about/KiatHan.jpg';
import LeonMak from '../../../res/about/LeonMak.jpg';
import SueMae from '../../../res/about/SueMae.jpg';
import WangYanHao from '../../../res/about/WangYanHao.jpg';
import ZhangHanMing from '../../../res/about/ZhangHanMing.jpg';

export default class SettingsList extends React.Component {

	logout(){
		//this.props.attemptLogout();
		this.props.clearUser();
		browserHistory.push('/');
	}

	render() {

		return (
			<div>

			<div className='row center-xs'>
			<Card className="settings-item-card col-xs" style={{maxWidth: "512px"}}>
			<CardHeader 
			className="settings-title"
			title={ "About" } 
			actAsExpander={ true } 
			showExpandableButton={ true } />
			<CardText expandable={true}>
			<div className="settings-info">

			<h1>About</h1>
			<p id='about-info'>ExchangeBuddy is for students, by students. We are here to provide you with a better exchange experience by providing you with information and a network for you to interact and know other students on exchange! Believe at ExchangeBuddy, we know that exchange is a once in a lifetime experience and we want you to get the BEST out of it!</p>

			<h2>The Team</h2>
			<div className="single-profile">
			<div className="crop row center-xs">
			<img src={EugeneNg} alt="Eugene Ng" />
			</div>
			<div className="row center-xs">
			<h1>Eugene Ng</h1>
			</div>
			<div className="row center-xs">
			<h2>[Lead Guide]</h2>
			</div>
			<div className="row center-xs">
			<p>"Dream big, do big, make it happen"</p>
			</div>
			</div>

			<div className="single-profile">
			<div className="crop row center-xs">
			<img src={WangYanHao} alt="WangYanHao" />
			</div>
			<div className="row center-xs">
			<h1>Wang Yan Hao</h1>
			</div>
			<div className="row center-xs">
			<h2>[Full Stack Guru]</h2>
			</div>
			<div className="row center-xs">
			<p>"I love to party, but coding needs me more"</p>
			</div>
			</div>

			<div className="single-profile">
			<div className="crop row center-xs">
			<img src={KaiYiLee} alt="KaiYiLee" />
			</div>
			<div className="row center-xs">
			<h1>Lee Kai Yi</h1>
			</div>
			<div className="row center-xs">
			<h2>[What you see if what i build]</h2>
			</div>
			<div className="row center-xs">
			<p>"Throw me something to do, and that will be my life"</p>
			</div>
			</div>

			<div className="single-profile">
			<div className="crop row center-xs">
			<img src={ZhangHanMing} alt="ZhangHanMing" />
			</div>
			<div className="row center-xs">
			<h1>Zhang Han Ming</h1>
			</div>
			<div className="row center-xs">
			<h2>[Backend magician]</h2>
			</div>
			<div className="row center-xs">
			<p>"Logic don't create wonders, magic does"</p>
			</div>
			</div>
			
			<div className="single-profile">
			<div className="crop row center-xs">
			<img src={SueMae} alt="SueMae" />
			</div>
			<div className="row center-xs">
			<h1>Sue Mae</h1>
			</div>
			<div className="row center-xs">
			<h2>[Market lady]</h2>
			</div>
			<div className="row center-xs">
			<p>"I get people talking in the market"</p>
			</div>
			</div>

			<div className="single-profile">
			<div className="crop row center-xs">
			<img src={KiatHan} alt="KiatHan" />
			</div>
			<div className="row center-xs">
			<h1>KiatHan</h1>
			</div>
			<div className="row center-xs">
			<h2>[Weight lifter]</h2>
			</div>
			<div className="row center-xs">
			<p>"I support the team in areas they need help in"</p>
			</div>
			</div>

			<div className="single-profile">
			<div className="row center-xs">
			<div className="crop">
			<img src={IrvinLim} alt="IrvinLim" />
			</div>
			<div className="crop">
			<img src={LeonMak} alt="LeonMak" />
			</div>
			<div className="crop">
			<img src={ChiThanh} alt="ChiThanh" />
			</div>
			</div>
			<div className="row center-xs">
			<h1>Irvin, Leon, and Thanh</h1>
			</div>
			<div className="row center-xs">
			<h2>[3 musketeers]</h2>
			</div>
			<div className="row center-xs">
			<p>"We set the foundation for the rest to build"</p>
			</div>
			</div>

			</div>
			</CardText>
			</Card>
			</div>

			<div className='row center-xs'>
			<Card className="settings-item-card col-xs" style={{maxWidth: "512px"}}>
			<CardHeader 
			className="settings-title"
			title={ "Privacy Policy" } 
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

			<div className='row center-xs'>
			<RaisedButton 
			className="settings-item-card-button" 
			label="Logout" 
			primary={false} 
			type="cancel" 
			onTouchTap={()=>this.logout()}/>
			</div>
			</div>
			)
}
}


SettingsList.propTypes = {
  attemptLogout: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired
};


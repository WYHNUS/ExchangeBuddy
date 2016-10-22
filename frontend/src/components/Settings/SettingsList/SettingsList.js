import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import * as IconsHelper from '../../../util/icons';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'react-flexbox-grid';

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
			<CardHeader 
			className="settings-title"
			title={ "Privacy Policy" } 
			actAsExpander={ true } 
			showExpandableButton={ true } />
			<CardText expandable={true}>
			<div className="settings-info">

			<div className="row center-md center-xs">
			<Col xs={11} md={3} className="">
			<img src={EugeneNg} alt="Eugene Ng" style={{width:"304px",height:"228px"}}/>
			</Col>
			<Col xs={11} md={9} className="">
			<h1>Eugene Ng</h1>
			<p>"Dream big, do big, make it happen"</p>

			</Col>
			</div>

			</div>
			</CardText>
			</Card>
			</div>

			<div className='row center-xs'>
			<RaisedButton 
			className="settings-item-card" 
			label="Logout" 
			primary={false} 
			type="cancel" 
			style={{ margin: 6 }}
			onTouchTap={()=>this.logout()}/>
			</div>

			{/*<List>
			<ListItem primaryText="About" leftIcon={IconsHelper.icon("person")} />
			<ListItem primaryText="Privacy Policy" leftIcon={IconsHelper.icon("person")} />
		</List>*/}
		</div>
		)
	}
}

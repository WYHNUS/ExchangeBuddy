import {ROOT_URL} from './backend';
import url from 'url';

// Will be deprecated soon? Fix later.
const socketUrl = `${ url.parse(ROOT_URL).protocol }//${ url.parse(ROOT_URL).host }`;
const socketPath = url.parse(ROOT_URL).pathname === '/' ? '' : url.parse(ROOT_URL).pathname;
var socket = io.connect(socketUrl, { path: `${ socketPath }/socket.io` }); // eslint-disable-line no-undef

export default class Socket{

	constructor(){
		this.isFirstTimeUse = false;
		this.currentRoom = null;
	}

	setup(groupName, groupId, userName, userId, handler){

		this.isFirstTimeUse = true;
		this.currentRoom=parseInt(groupId);

		this.handler = handler;
		var emittedobj = 
		{
			group:
			{
				name: groupName,
				id: parseInt(groupId)
			},
			user:
			{
				id:parseInt(userId),
				name: userName
			}
		}
		// console.log('add user is called', emittedobj);
		socket.emit('adduser',emittedobj);
		socket.on('updatechat', this._eventHandler.bind(this));
	}

	updateRoom(groupName, groupId){
		//this.handler = handler;
		// console.log('update room is called', groupName);
		var emittedobj = 
		{
			name: groupName,
			id: parseInt(groupId)
		}
		this.currentRoom=parseInt(groupId);
		socket.emit('switchroom',emittedobj);
		//socket.on('updatechat', this._eventHandler.bind(this));
	}

	uninstall() {
		// console.log('socket uninstall');
		socket.emit('disconnect');
	}

	send(message){
		// console.log('sent msg', message)
		socket.emit('sendchat',message);
	}

	_eventHandler(packet) {
		//console.log('_eventHandler is called');
		this.handler(packet);
	}
}
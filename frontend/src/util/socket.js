import {ROOT_URL} from './backend';

var socket = io.connect(ROOT_URL);

export default class Socket{

	constructor(){
		this.isFirstTimeUse = false;
	}

	setup(groupName, groupId, userName, userId, handler){

		this.isFirstTimeUse = true;

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
		console.log('setup is called', emittedobj);
		socket.emit('adduser',emittedobj);
		socket.on('updatechat', this._eventHandler.bind(this));
	}

	updateRoom(groupName){
		console.log('update room is called', groupName);
		var emittedobj = 
		{
			name: groupName
		}
		socket.emit('switchroom',emittedobj);
	}

	uninstall() {
		console.log('socket uninstall');
		socket.emit('disconnect');
	}

	send(message){
		socket.emit('sendchat',message);
	}

	_eventHandler(packet) {
		this.handler(packet);
	}
}
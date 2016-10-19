import {ROOT_URL} from './backend';

var socket = io.connect(ROOT_URL);

export default class Socket{

	setup(groupName, groupId, userName, userId, handler){

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
		socket.emit('adduser',emittedobj);
		socket.on('updatechat', this._eventHandler.bind(this));
	}

	uninstall() {
		socket.emit('disconnect');
	}

	send(message){
		socket.emit('sendchat',message);
	}

	_eventHandler(packet) {
		this.handler(packet);
	}
}
import {connect} from "socket.io-client";
import * as Notifications from 'expo-notifications';

import * as Actions from "./actions/data";
import secureStore from "./secureStore";

export default {
	isConnected: false,
	socket: null,
	interval: null,
	connect(SERVER_ENDPOINT, store) {
		if (this.socket) {
			this.socket.destroy();
			delete this.socket;
			this.socket = null;
		}

		this.socket = connect(SERVER_ENDPOINT, {
			'reconnection': true,
            'reconnectionDelay': 5000,
            'reconnectionAttempts': Infinity,
		});

		this.socket.on('connect', async () => {
			this.isConnected = true;

            const user = JSON.parse(await secureStore.get('user'));
            store.dispatch(Actions.sendData("authentication", {user, source: 'mobile'}));
			// this.socket.on('authenticated', function() {});

			const channels = [
				{
					channel: "question",
					notification: {
						title: "(LOCAL) A question needs your attention!",
						body: "Tab to answer."
					}
				}
			]

            channels.forEach(({channel, notification}) => {
                this.socket.on(channel, async (data) => {
                  store.dispatch(Actions.gotData(data, channel));
				  const { appState: { state } } = store.getState();
				  console.log("APP STATE: ", state);
				  if (state === "background") {
					console.log("Sending local notification...");
					await Notifications.scheduleNotificationAsync({
						content: {...notification, data},
						trigger: { seconds: 2 },
					});
				  }
                });
            });
            
		});

		this.socket.on('disconnect', () => {
            console.log("Socket disconnected");
			this.isConnected = false;
			// this.interval = setInterval(() => {
			// 	if (this.isConnected) {
            //         console.log("Connected back to the server.");
			// 		clearInterval(this.interval);
			// 		this.interval = null;
			// 		return;
			// 	}
			// 	this.connect();
			// }, 5000);
		});

		return this.socket;
	}
}
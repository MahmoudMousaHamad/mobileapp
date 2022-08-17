import io from "socket.io-client";
import * as Notifications from 'expo-notifications';

import * as Actions from "./actions/data";
import config from "./config";

export default {
	isConnected: false,
	socket: null,
	interval: null,
	connect(SERVER_ENDPOINT=config.SERVER_ENDPOINT, store) {
		if (this.socket) {
			this.socket.destroy();
			delete this.socket;
			this.socket = null;
		}

		this.socket = io(SERVER_ENDPOINT, {
			autoConnect: false,
			reconnection: true,
			reconnectionDelay: 5000,
			reconnectionAttempts: Infinity,
		});

		this.socket.auth = {
			user: store.getState().auth.user,
			source: "mobile",
		};

		this.socket.connect();

		this.socket.onAny((event, ...args) => {
			console.log(event, args);
		});
	
		this.socket.on("connect_error", (err) => {
			console.log("Connection to server failed", err);
		});

		this.socket.on('connect', async () => {
			this.isConnected = true;

			const channels = [
				{
					channel: "question",
					notification: {
						title: "A question needs your attention",
						body: "Tab to answer."
					}
				}, 
				{
					channel: "questions",
					notification: {
						title: "An application needs your attention",
						body: "Tab to answer."
					}
				},
				{
					channel: "bot-status-change",
					notification: null,
				}, 
				{
					channel: "application-counts",
					notification: null,
				},
				{
					channel: "desktop",
					notification: null,
				}
			];

            channels.forEach(({ channel, notification }) => {
                this.socket.on(channel, async (data) => {
                  store.dispatch(Actions.gotData(data, channel));
				  console.log(
						"Got data from server on channel:",
						channel,
						", and data:",
						data
					);
				  if (notification) {
					const { appState: { state } } = store.getState();
					console.log("APP STATE: ", state);
					if (state === "background") {
						console.log("Sending local notification...");
						await Notifications.scheduleNotificationAsync({
							content: {...notification, data},
							trigger: { seconds: 1 },
						});
					}
				  }
                });
            });
            
		});

		this.socket.on('disconnect', () => {
            console.log("Socket disconnected");
			this.isConnected = false;
		});

		return this.socket;
	},
	disconnect() {
		this.socket?.disconnect();
	},
}

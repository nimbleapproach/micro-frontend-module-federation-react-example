import fetchRemote from './fetchRemote';

const loadRemoteComponent = () => async () => {
        const scriptID = 'remote-app-script';
        const scope = 'default';
        const remoteAppName = 'remoteApp';

		try {
            // Check if this remote has not been loaded
			if (!(remoteAppName in window)) {
				// Initialize the shared dependencies to be passed to remote apps 
				await __webpack_init_sharing__(scope);

				// Fetch the remote app
				// The URL is determined by which domain we host the remote app on
				// The filename matches to the Module Federation Plugins filename value - remoteEntry.js
				const fetchedRemote = await fetchRemote(
					'http://localhost:3131/remoteEntry.js',
					remoteAppName,
					scriptID
				);
				
				// Initialize the remote app
				await fetchedRemote.init(__webpack_share_scopes__[scope]);
			}

			const remoteApp = window[remoteAppName];

			// The filename passed here matches the "exposes" item in our remote app exactly
			const factory = await remoteApp.get(`./remoteApp`);

			// RemoteAppComponent is the React Component that our remote app's "exposes" configuration references
			const RemoteAppComponent = factory();
			
			return RemoteAppComponent;
		} catch (error) {
			return error;
		}
	};

export default loadRemoteComponent;

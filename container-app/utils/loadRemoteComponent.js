import React from 'react';
import fetchRemote from './fetchRemote';

const loadRemoteComponent = () => async () => {
        const scriptID = 'remote-app-script';
        const scope = 'default';
        const moduleName = 'remoteApp';
        const remoteName = 'remoteApp';

		try {
            // Check if this remote has already been loaded
			if (!(remoteName in window)) {
				// Initializes the shared scope. Fills it with known provided modules from this build and all remotes
				// eslint-disable-next-line no-undef
				await __webpack_init_sharing__(scope);

				// Fetch the remote app. We assume our remote app is exposing a `remoteEntry.js` file.
				const fetchedContainer = await fetchRemote(
					`http://localhost:3131/remoteEntry.js`,
					remoteName,
					scriptID
				);
			
				
				// Initialize the remote app
				await fetchedContainer.init(__webpack_share_scopes__[scope]);
			}
			// 'container' is the remote app
			const container = window[remoteName];

			// The module pass to get() must match the "exposes" item in our remote app exactly
			const factory = await container.get(`./${moduleName}`);

			// 'Module' is the React Component from our remote app's "exposes" configuration
			const Module = factory();

			
			return Module;
		} catch (error) {
			return error;
		}
	};

export default loadRemoteComponent;

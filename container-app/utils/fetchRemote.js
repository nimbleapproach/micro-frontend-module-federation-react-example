const fetchRemote = (url, remoteName, scriptID) =>
	new Promise((resolve, reject) => {
		// We define a script tag to use the browser for fetching the remoteEntry.js file
		const script = document.createElement('script');
		script.src = url;
		script.id = scriptID;

		const deleteScript = () => {
			const remoteEntryScript = document.getElementById(scriptID);
			remoteEntryScript.parentNode.removeChild(remoteEntryScript);
		};

		script.onerror = () => {
			deleteScript();
			reject(new Error(`Failed to fetch remote: ${remoteName}`));
		};

		// When the script is loaded we need to resolve the promise back to Module Federation
		script.onload = () => {
			// The script is now loaded on window using the name defined within the remote
			const proxy = {
				get: (request) => window[remoteName].get(request),
				init: (arg) => {
					try {
						return window[remoteName].init(arg);
					} catch (e) {
						// eslint-disable-next-line no-console
						console.error(
							`Failed to initialize remote: ${remoteName}`
						);
						
						deleteScript();
					}
				},
			};

			resolve(proxy);
		};

		// Lastly we inject the script tag into the document's head to trigger the script load
		document.head.appendChild(script);
	});

export default fetchRemote;

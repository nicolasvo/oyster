<script context="module">   export const ssr = false </script>
<script>
	const start = async () => {
	  // Initializes the client with the API key and the Translate API.
	  // @ts-ignore
	  gapi.client.init({
		'apiKey': 'YOUR_API_KEY',
		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
	  }).then(function() {
		// Executes an API request, and returns a Promise.
		// The method name `language.translations.list` comes from the API discovery.
		return gapi.client.language.translations.list({
		  q: 'hello world',
		  source: 'en',
		  target: 'de',
		});
	  }).then(function(response) {
		console.log(response.result.data.translations[0].translatedText);
	  }, function(reason) {
		console.log('Error: ' + reason.result.error.message);
	  });
	};
  
	const initializeGapi = async () => {
	  gapi.load('client', start);
	}

	function boi() {
		const CLIENT_ID =
			"582485760308-aim00v0sor96v66bn2h4rgerqo1f1g74.apps.googleusercontent.com";
		const API_KEY = "AIzaSyBUANl-jEVX7FlqOIGr3hVYrH3WUwvLFtU";
		const DISCOVERY_DOCS = [
			"https://sheets.googleapis.com/$discovery/rest?version=v4",
			"https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
		];
		const SCOPES =
			"https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata";
		gapi.client
			.init({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES,
			})
			.then(function () {
				const isSignedIn = gapi.auth2
					.getAuthInstance()
					.isSignedIn.get();
				if (isSignedIn) {
					console.log("User already signed in!");
				} else {
					console.log("User not signed in :/");
				}
			});
	}

	gapi.load("client", boi);
  </script>
  
  <svelte:head>
	<script src="https://apis.google.com/js/api.js" on:load={initializeGapi}></script>
  </svelte:head>
  
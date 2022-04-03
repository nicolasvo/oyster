<script>
	function start() {
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

	gapi.load("client", start);
</script>

<!-- <script>
	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style> -->

<svelte:head>
	<script src="https://apis.google.com/js/api.js"></script>
</svelte:head>

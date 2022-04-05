<script>
	import { onMount } from "svelte";

	const CLIENT_ID =
		"582485760308-aim00v0sor96v66bn2h4rgerqo1f1g74.apps.googleusercontent.com";
	const API_KEY = "AIzaSyBUANl-jEVX7FlqOIGr3hVYrH3WUwvLFtU";
	const DISCOVERY_DOCS = [
		"https://sheets.googleapis.com/$discovery/rest?version=v4",
		"https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
	];
	const SCOPES =
		"https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata";
	const start = async () => {
		gapi.client
			.init({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES,
			})
			.then(() => {
				const isSignedIn = gapi.auth2
					.getAuthInstance()
					.isSignedIn.get();
				if (isSignedIn) {
					console.log("User already signed in!");
				} else {
					console.log("User not signed in :/");
				}
			});
	};

	const initializeGapi = async () => {
		gapi.load("client:auth2", start);
	};

	const signIn = async () => {
		gapi.auth2.getAuthInstance().signIn();
	};

	const getConfig = async () => {
		test = "boi"
		gapi.client.drive.files
			.list({
				spaces: "appDataFolder",
				fields: "nextPageToken, files(id, name)",
				pageSize: 100,
			})
			.then((res) => {
				if (res) {
					console.log(res.result.files[0].id);
				}
				test = "end."
			});
	};

	onMount(initializeGapi);
	let test = "hee";
</script>

<svelte:head>
	<script
		src="https://apis.google.com/js/api.js"></script>
</svelte:head>

<h1 class="text-lime-600">this</h1>
<p>{test}</p>
<button on:click={signIn}>Sign in</button>
<button on:click={getConfig}>Get config</button>
